const mongoose = require('mongoose');

const SubjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    quarter: {
        type: Number,
        required: true
    },
    subjects: {
        type: [{}],
        required: false
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    },
    planId: {
        type: String,
        requered: true
    },


});

module.exports = mongoose.model('Subject', SubjectSchema);