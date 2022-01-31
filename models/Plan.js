const mongoose = require('mongoose');
const Subject = require('./Subject');

const PlanSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    totalYears: {
        type: Number,
        required: true
    },
    years: {
        type: [{
            year: Number, items: []
        }],
        required: true
    }
});

module.exports = mongoose.model('Plan', PlanSchema);