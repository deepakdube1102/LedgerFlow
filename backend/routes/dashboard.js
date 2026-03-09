const express = require('express');
const router = express.Router();
const KPI = require('../models/KPI');
const { protect } = require('../middleware/authMiddleware');

// Get all KPI metrics for the top cards
router.get('/kpis', protect, async (req, res) => {
    try {
        const kpis = await KPI.find({ user: req.user.id });
        res.json(kpis);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get MAU (Monthly Active Users) data
router.get('/mau', protect, async (req, res) => {
    try {
        // For now we'll return hardcoded structured data that mirrors the frontend 
        // to prove functionality before full DB seeding of every single graph
        const data = [
            { month: "Jan", users: 1200 },
            { month: "Feb", users: 1400 },
            { month: "Mar", users: 1350 },
            { month: "Apr", users: 1800 },
            { month: "May", users: 2100 },
            { month: "Jun", users: 1950 },
            { month: "Jul", users: 2300 },
            { month: "Aug", users: 2500 },
            { month: "Sep", users: 2400 },
            { month: "Oct", users: 2700 },
            { month: "Nov", users: 2650 },
            { month: "Dec", users: 2847 },
        ];
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
