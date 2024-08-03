import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

// User Registration
export const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create a new user
        const newUser = new User({ email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', user: { email: newUser.email, uuid: newUser.uuid } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// User Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Check if password matches
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        const token = generateToken(user);
        res.status(200).json({ message: 'Login successful', user: { email: user.email, uuid: user.uuid, token } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
