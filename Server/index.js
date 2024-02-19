const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const User = require('./model/userTable');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');


dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl).then(() => {
    console.log("MongoDB Connected");
}).catch((e) => {
    console.log(e);
})

app.use(express.json())

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

// Port Initilization

app.listen(5001, () => {
    console.log("Node Js App Is Running")
})
