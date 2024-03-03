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

app.post('/payment/intent', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({ paymentIntent: paymentIntent.client_secret });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});

// Port Initilization

app.listen(5001, () => {
    console.log("Node Js App Is Running")
})
