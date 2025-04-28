const { generate: uniqueId } = require('shortid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../../models/coreModels/User'); // Adjust the path as needed
const UserPassword = require('../../../models/coreModels/UserPassword'); // Adjust the path as needed

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists.....' });
        }

        // Hash the password using salt
        const newUserPassword = new UserPassword();
        const salt = uniqueId();
        const hashedPassword = newUserPassword.generateHash(salt, password);

        // Create and save the new user
        const newUser = new User({ name, email });
        await newUser.save();

        const token = jwt.sign(
            {
              id:newUser._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: req.body.remember ? 365 * 24 + 'h' : '24h' }
          );

        // Save the hashed password in the UserPassword model
        const userPassword = new UserPassword({ user: newUser._id, salt: salt, password: hashedPassword, loggedSessions: token });
        await userPassword.save();

        res.status(201).json({ 
            success: true,
            result: {
              _id: newUser._id  ,
              name: newUser.name,
              email: newUser.email,
              token: token,
            },
            message: 'User registered successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = signup;
