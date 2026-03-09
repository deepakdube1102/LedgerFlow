const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'ledgerflow_super_secret_key';

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                jobTitle: user.jobTitle,
                company: user.company,
                phone: user.phone,
                location: user.location,
                bio: user.bio,
                avatarUrl: user.avatarUrl,
                coverUrl: user.coverUrl,
                token: jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' })
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                jobTitle: user.jobTitle,
                company: user.company,
                phone: user.phone,
                location: user.location,
                bio: user.bio,
                avatarUrl: user.avatarUrl,
                coverUrl: user.coverUrl,
                token: jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' })
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update user profile
router.put('/profile', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (user) {
            user.name = req.body.name || user.name;
            user.jobTitle = req.body.jobTitle !== undefined ? req.body.jobTitle : user.jobTitle;
            user.company = req.body.company !== undefined ? req.body.company : user.company;
            user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;
            user.location = req.body.location !== undefined ? req.body.location : user.location;
            user.bio = req.body.bio !== undefined ? req.body.bio : user.bio;
            user.avatarUrl = req.body.avatarUrl !== undefined ? req.body.avatarUrl : user.avatarUrl;
            user.coverUrl = req.body.coverUrl !== undefined ? req.body.coverUrl : user.coverUrl;

            // Only update email if they are trying to change it AND it isn't taken
            if (req.body.email && req.body.email !== user.email) {
                const emailExists = await User.findOne({ email: req.body.email });
                if (emailExists) {
                    return res.status(400).json({ message: 'Email already in use' });
                }
                user.email = req.body.email;
            }

            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(req.body.password, salt);
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                jobTitle: updatedUser.jobTitle,
                company: updatedUser.company,
                phone: updatedUser.phone,
                location: updatedUser.location,
                bio: updatedUser.bio,
                avatarUrl: updatedUser.avatarUrl,
                coverUrl: updatedUser.coverUrl,
                token: jwt.sign({ id: updatedUser._id }, JWT_SECRET, { expiresIn: '30d' })
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
