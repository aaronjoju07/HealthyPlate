const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const User = require('./model/userTable');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { Restaurant } = require('./model/RestaurantModel');
const HealthTracker = require('./model/healthTrackerSchema');
const Food = require('./model/Food');
const Order = require('./model/Order');


dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const mongoUrl = process.env.MONGO_URL;
const strpie_secret_key = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(strpie_secret_key);

mongoose.connect(mongoUrl).then(() => {
    console.log("MongoDB Connected");
}).catch((e) => {
    console.log(e);
})

app.use(express.json())
app.use(cookieParser());
// Example route to set a cookie
app.get('/set-cookie', (req, res) => {
    // Set a cookie with the name 'username' and value 'user123'
    res.cookie('username', 'user123', { maxAge: 900000, httpOnly: true });
    res.send('Cookie set successfully!');
});

// Example route to retrieve a cookie
app.get('/get-cookie', (req, res) => {
    // Retrieve the value of the 'username' cookie
    const username = req.cookies.username || 'Guest';
    res.send(`Hello, ${username}!`);
});
// Routes

app.get('/', (req, res) => {
    res.send({ status: "Started" })
})

// Registration

app.post('/register', async (req, res) => {
    const { username, email, phnum, password } = req.body;

    const oldUserEmail = await User.findOne({ email: email })
    const oldUserPhnum = await User.findOne({ phnum: phnum })
    if (oldUserEmail || oldUserPhnum) {
        return res.send({ data: "User already exists" })
    }

    const encryptPassword = await bcrypt.hash(password, 10)

    try {
        await User.create({
            username: username,
            email: email,
            phnum: phnum,
            password: encryptPassword
        })
        res.send({ status: "ok", data: "User Created" })
    } catch (error) {
        res.send({ status: "error", data: error })
    }
})

// Login

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const oldUser = await User.findOne({ email: email });

    if (!oldUser) {
        return res.send({ data: "User doesn't exist!!" });
    }

    try {
        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, oldUser.password);

        if (passwordMatch) {
            // Passwords match, generate JWT token
            const token = jwt.sign({ email: oldUser.email }, JWT_SECRET);
            return res.status(201).send({ status: "ok", data: token });
        } else {
            // Passwords do not match
            return res.send({ error: "Invalid password" });
        }
    } catch (error) {
        console.error('Error comparing passwords:', error);
        return res.status(500).send({ error: "Internal server error" });
    }
});


// Test: Add a new user entire details

app.post('/addUserDetails', async (req, res) => {
    try {
        const { name, email, phoneNumber, password, favorites, tracking } = req.body;

        // Create a new user instance
        const newUser = new User({
            username: name,
            email,
            phnum: phoneNumber,
            password,
            favorites,
            tracking,
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/resturant-details', async (req, res) => {
    try {
        const { restaurantName,
            address,
            overallRating,
            imageAddress,
            about,
            open,
            openingTime,
            closingTime,
            reviews,
            menu } = req.body;

        // Create a new user instance
        const newResturant = new Restaurant({
            restaurantName,
            address,
            overallRating,
            imageAddress,
            about,
            open,
            openingTime,
            closingTime,
            reviews,
            menu
        });

        // Save the user to the database
        const savedResturant = await newResturant.save();

        res.status(201).json(savedResturant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Logined User Details

app.post('/logined-in-user', (req, res) => {
    const { token } = req.body
    try {
        const user = jwt.verify(token, JWT_SECRET)
        const userEmail = user.email

        User.findOne({ email: userEmail }).then((data) => {
            res.send({ status: "ok", data: data })
        })

    } catch (error) {
        res.send({ status: "error", data: error })
    }
})

// Get All Resturants 

app.get('/getAllRestaurants', async (req, res) => {
    try {
        const restos = await Restaurant.find({}).then((data) => {
            res.send({ status: "OK", count: data.length, data: data })
        })
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/getRestaurantReviews/:restaurantId', async (req, res) => {
    try {
        const restaurantId = req.params.restaurantId;

        const restaurant = await Restaurant.findById(restaurantId);

        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        const reviews = restaurant.reviews;

        res.send({ status: 'OK', count: reviews.length, data: reviews });
    } catch (error) {
        console.error('Error fetching restaurant reviews:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/restaurants/:restaurantId/reviews', async (req, res) => {
    const { restaurantId } = req.params;
    const { comment, ratings } = req.body;

    try {
        // Find the restaurant by ID
        const restaurant = await Restaurant.findById(restaurantId);

        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        // Create a new review
        const newReview = { comment, rating: ratings };

        // Add the review to the restaurant's reviews array
        restaurant.reviews.push(newReview);

        // Save the updated restaurant with the new review
        await restaurant.save();

        // Respond with the updated restaurant object
        res.status(201).json(restaurant);
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint for handling health tracker data
app.post('/healthtracker', (req, res) => {
    const healthTrackerData = req.body;

    // Create a new HealthTracker document
    const healthTracker = new HealthTracker(healthTrackerData);

    healthTracker.save()
        .then(savedData => {
            res.status(201).json(savedData);
        })
        .catch(error => {
            res.status(500).json({ error: 'Internal Server Error' });
        });
});


// Endpoint for checking if HealthTracker exists for a user
app.get('/healthtracker/:userId', (req, res) => {
    const userId = req.params.userId;

    // Check if HealthTracker document exists for the given user ID
    HealthTracker.findOne({ user_id: userId })
        .then(healthTracker => {
            res.json(healthTracker); // Returns the found HealthTracker document or null if not found
        })
        .catch(error => {
            res.status(500).json({ error: 'Internal Server Error' });
        });
});


// Stripe Payment Intent endpoint
// Card No : 4000003560000008
app.post('/payment/intent', async (req, res) => {
    try {
        const amountInPaise = Math.round(req.body.amount * 100); // Convert to paise
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInPaise,
            currency: 'inr',
            description: 'some description',
            shipping: {
                name: 'Jenny Rosen',
                address: {
                    line1: '510 Townsend St',
                    postal_code: '98140',
                    city: 'San Francisco',
                    state: 'CA',
                    country: 'US',
                },
            },
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.json({ paymentIntent: paymentIntent.client_secret });
    } catch (e) {
        console.error('Error creating payment intent:', e);
        res.status(400).json({
            error: e.message,
        });
    }

});


// Add this route to your existing Express app
app.post('/updateWeight', async (req, res) => {
    const { user_id, updated_weight } = req.body;

    try {
        const healthTracker = await HealthTracker.findOne({ user_id });

        if (!healthTracker) {
            return res.status(404).json({ error: 'HealthTracker not found for the user' });
        }

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];

        healthTracker.weight_history.push({
            date: formattedDate,
            weight: updated_weight,
        });

        await healthTracker.save();

        res.status(200).json({ status: 'OK', message: 'Weight updated successfully' });
    } catch (error) {
        console.error('Error updating weight:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// get weight history for a user
app.get('/healthtracker/:userId/weighthistory', async (req, res) => {
    const userId = req.params.userId;

    try {
        const healthTracker = await HealthTracker.findOne({ user_id: userId });

        if (!healthTracker) {
            return res.status(404).json({ error: 'HealthTracker not found for the user' });
        }

        const weightHistory = healthTracker.weight_history;

        res.status(200).json({ status: 'OK', data: weightHistory });
    } catch (error) {
        console.error('Error fetching weight history:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// grt overall progression for a user
app.get('/healthtracker/:userId/overallprogression', async (req, res) => {
    const userId = req.params.userId;

    try {
        const healthTracker = await HealthTracker.findOne({ user_id: userId });

        if (!healthTracker) {
            return res.status(404).json({ error: 'HealthTracker not found for the user' });
        }

        const overallProgression = healthTracker.overall_progression;

        res.status(200).json({ status: 'OK', data: overallProgression });
    } catch (error) {
        console.error('Error fetching overall progression:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// getting daily progression data
app.get('/healthtracker/:userId/dailyprogression', (req, res) => {
    const userId = req.params.userId;

    // Check if HealthTracker document exists for the given user ID
    HealthTracker.findOne({ user_id: userId })
        .then(healthTracker => {
            if (healthTracker && healthTracker.daily_progression) {
                const dailyProgression = healthTracker.daily_progression;
                res.json({ status: 'OK', count: dailyProgression.length, data: dailyProgression });
            } else {
                res.status(404).json({ error: 'Daily progression data not found for the user' });
            }
        })
        .catch(error => {
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

// Create Food List
app.post('/food-create', async (req, res) => {
    try {
        const { userId, breakfast, lunch, dinner } = req.body;
        
        // Check if a record exists for the user and the current day
        let existingFood = await Food.findOne({ userId, date: { $eq: new Date().toISOString().slice(0, 10) } });
        if (existingFood) {
            // Update existing record
            existingFood.breakfast = breakfast;
            existingFood.lunch = lunch;
            existingFood.dinner = dinner;
            await existingFood.save();
            res.status(200).json({ status: 'Success', data: existingFood });
        } else {
            // Create a new record
            const newFood = new Food({ userId, date: new Date().toISOString().slice(0, 10), breakfast, lunch, dinner });
            await newFood.save();
            res.status(201).json({ status: 'Success', data: newFood });
        }
    } catch (error) {
        console.error('Error saving food details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Update-user-food
app.put('/food/:userId', (req, res) => {
    const userId = req.params.userId;
    const { breakfast, lunch, dinner } = req.body;
    Food.findOneAndUpdate({ userId }, { breakfast, lunch, dinner }, { new: true })
        .then(updatedFood => {
            if (updatedFood) {
                res.json({ status: 'Success', data: updatedFood });
            } else {
                res.status(404).json({ error: 'Food data not found for the user' });
            }
        })
        .catch(error => {
            res.status(500).json({ error: 'Internal Server Error' });
        });
});
// Read-user-food
app.get('/food/:userId', async (req, res) => {
    const userId = req.params.userId;
    const currentDate = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format

    try {
        const foundFood = await Food.findOne({ userId, date: currentDate });
        if (foundFood) {
            // console.log(foundFood);
            res.json({ status: 'Success', data: foundFood });
        } else {
            res.status(404).json({ error: 'Food data not found for the user on the current day' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Food Read All
app.get('/food-get-all', (req, res) => {
    Food.find()
        .then(allFood => {
            res.json({ status: 'Success', data: allFood });
        })
        .catch(error => {
            res.status(500).json({ error: 'Internal Server Error' });
        });
});


// Create an order
app.post('/orders', async (req, res) => {
    try {
        const orderData = req.body;
        const createdOrder = await Order.create(orderData);
        res.status(201).json({ status: 'Success', data: createdOrder });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        console.log(error);
    }
});

// Get all orders
app.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json({ status: 'Success', data: orders });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Get all orders by user ID
app.get('/orders/:customerEmail', async (req, res) => {
    const customerEmail = req.params.customerEmail;

    try {
        const userOrders = await Order.find({ customerEmail });
        if (userOrders.length > 0) {
            res.json({ status: 'Success', data: userOrders });
        } else {
            res.status(404).json({ error: 'No orders found for the user' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get an order by ID
app.get('/orders-by-id/:orderId', async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const order = await Order.findById(orderId);
        if (order) {
            res.json({ status: 'Success', data: order });
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update an order
app.put('/orders/:orderId', async (req, res) => {
    const orderId = req.params.orderId;
    const updateData = req.body;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, { new: true });
        if (updatedOrder) {
            res.json({ status: 'Success', data: updatedOrder });
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Port Initilization

app.listen(5001, () => {
    console.log("Node Js App Is Running")
})
