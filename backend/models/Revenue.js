const mongoose = require('mongoose');

const revenueSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    month: { type: String, required: true },
    revenue: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Revenue', revenueSchema);
