const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    id: String,
    description: String,
    priority: { type: String, enum: ['High', 'Low'] },
    creationDate: Date,
    completed: Boolean
});

module.exports = mongoose.model('Todo', todoSchema);