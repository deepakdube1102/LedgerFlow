const mongoose = require('mongoose');

const subscriptionPlanSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    features: [{ type: String }],
    popular: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);
