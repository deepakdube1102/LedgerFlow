const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Generic logging middleware
app.use((req, res, next) => {
    console.log(`[API REQUEST] ${req.method} ${req.originalUrl}`);
    next();
});

// Routes mapping
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const customerRoutes = require('./routes/customers');
const billingRoutes = require('./routes/billing');
const incomeRoutes = require('./routes/income');
const expensesRoutes = require('./routes/expenses');

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/expenses', expensesRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
