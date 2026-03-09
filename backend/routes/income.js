const express = require('express');
const router = express.Router();
const Income = require('../models/Income');
const { protect } = require('../middleware/authMiddleware');

// Get all income records for user
router.get('/', protect, async (req, res) => {
    try {
        const incomeRecords = await Income.find({ user: req.user.id }).sort({ date: -1 });
        res.json(incomeRecords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new income record
router.post('/', protect, async (req, res) => {
    try {
        const income = new Income({ ...req.body, user: req.user.id });
        const newIncome = await income.save();
        res.status(201).json(newIncome);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update an income record
router.put('/:id', protect, async (req, res) => {
    try {
        const income = await Income.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!income) return res.status(404).json({ message: 'Income record not found' });
        res.json(income);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an income record
router.delete('/:id', protect, async (req, res) => {
    try {
        const income = await Income.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!income) return res.status(404).json({ message: 'Income record not found' });
        res.json({ message: 'Income record deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
