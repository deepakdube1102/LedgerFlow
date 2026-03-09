const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    source: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true },
    notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Income', incomeSchema);
