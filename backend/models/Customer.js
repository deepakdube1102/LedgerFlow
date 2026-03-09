const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    plan: { type: String, required: true },
    mrr: { type: String, required: true }, // Keeping as string to match UI format e.g., "$299"
    status: { type: String, required: true },
    joined: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
