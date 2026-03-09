const mongoose = require('mongoose');

const kpiSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    value: { type: String, required: true },
    change: { type: String, required: true },
    positive: { type: Boolean, required: true },
    iconName: { type: String, required: true },
    gradient: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('KPI', kpiSchema);
