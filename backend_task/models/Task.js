const mongoose = require('mongoose');

// Define the task schema
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Ensure you're referring to the User model correctly
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],  // Limiting to 'pending' or 'completed'
        default: 'pending',  // Default status is 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create a task model using the schema
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
