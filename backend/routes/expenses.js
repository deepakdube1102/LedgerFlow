const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const { protect } = require('../middleware/authMiddleware');

// Get all expense records for user
router.get('/', protect, async (req, res) => {
    try {
        const expenseRecords = await Expense.find({ user: req.user.id }).sort({ date: -1 });
        res.json(expenseRecords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new expense record
router.post('/', protect, async (req, res) => {
    try {
        console.log("RECEIVED EXPENSE POST REQUEST:", req.body);
        const expense = new Expense({ ...req.body, user: req.user.id });
        const newExpense = await expense.save();
        console.log("SAVED NEW EXPENSE:", newExpense);
        res.status(201).json(newExpense);
    } catch (error) {
        console.error("ERROR SAVING EXPENSE:", error);
        res.status(400).json({ message: error.message });
    }
});

// Update an expense record
router.put('/:id', protect, async (req, res) => {
    try {
        const expense = await Expense.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!expense) return res.status(404).json({ message: 'Expense record not found' });
        res.json(expense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an expense record
router.delete('/:id', protect, async (req, res) => {
    try {
        console.log("RECEIVED EXPENSE DELETE REQUEST FOR ID:", req.params.id);
        const expense = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!expense) return res.status(404).json({ message: 'Expense record not found' });
        console.log("DELETED EXPENSE:", expense);
        res.json({ message: 'Expense record deleted' });
    } catch (error) {
        console.error("ERROR DELETING EXPENSE:", error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
