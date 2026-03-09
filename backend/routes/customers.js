const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const { protect } = require('../middleware/authMiddleware');

// Get all customers
router.get('/', protect, async (req, res) => {
    try {
        const customers = await Customer.find({ user: req.user.id });
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new customer
router.post('/', protect, async (req, res) => {
    const customer = new Customer({ ...req.body, user: req.user.id });
    try {
        const newCustomer = await customer.save();
        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Update a customer
router.put('/:id', protect, async (req, res) => {
    try {
        const customer = await Customer.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        res.json(customer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a customer
router.delete('/:id', protect, async (req, res) => {
    try {
        const customer = await Customer.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        res.json({ message: 'Customer deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
