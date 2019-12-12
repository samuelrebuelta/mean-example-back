const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
    id: String,
    brandName: { type: String, required: true },
    models: [{
        modelDescription: { type: String,  default: '' },
        hp: Number
    }]
});

module.exports = mongoose.model('Brand', brandSchema);