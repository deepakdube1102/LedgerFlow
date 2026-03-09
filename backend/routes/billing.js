const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
const SubscriptionPlan = require('../models/SubscriptionPlan');
const Revenue = require('../models/Revenue');
const { protect } = require('../middleware/authMiddleware');

// Get all recent invoices
router.get('/invoices', protect, async (req, res) => {
    try {
        const invoices = await Invoice.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new invoice
router.post('/invoices', protect, async (req, res) => {
    try {
        const invoice = new Invoice({ ...req.body, user: req.user.id });
        const newInvoice = await invoice.save();
        res.status(201).json(newInvoice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update an invoice
router.put('/invoices/:internalId', protect, async (req, res) => {
    try {
        const invoice = await Invoice.findOneAndUpdate(
            { _id: req.params.internalId, user: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
        res.json(invoice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an invoice
router.delete('/invoices/:internalId', protect, async (req, res) => {
    try {
        const invoice = await Invoice.findOneAndDelete({ _id: req.params.internalId, user: req.user.id });
        if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
        res.json({ message: 'Invoice deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get subscription plans
router.get('/plans', protect, async (req, res) => {
    try {
        const plans = await SubscriptionPlan.find({ user: req.user.id });
        res.json(plans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get revenue trend data
router.get('/revenue', protect, async (req, res) => {
    try {
        const revenue = await Revenue.find({ user: req.user.id });
        res.json(revenue);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
