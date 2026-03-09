const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    id: { type: String, required: true }, // e.g., "INV-0042"
    customer: { type: String, required: true },
    amount: { type: String, required: true },
    status: { type: String, required: true }, // e.g., "Paid", "Pending"
    date: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Invoice', invoiceSchema);
