const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [2, 'Name must be at least 2 characters'],
    },
    years: {
        type: Number,
        required: [true, 'Years are required'],
        min: [1, 'Years must be between 1 and 3 characters'],
        max: [100, 'Years must be between 1 and 3 characters'],
    },
    kind: {
        type: String,
        required: [true, 'Kind is required'],
        minLength: [3, 'Name must be at least 3 characters'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
        match: [/^https?:\/\//, 'Invalid URL'],
    },
    need: {
        type: String,
        required: [true, 'Need is required'],
        minLength: [2, 'Need must be between 3 and 20 characters'],
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        minLength: [5, 'Location must be between 5 and 15 characters'],
        maxLength: [15, 'Location must be between 5 and 15 characters'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: [5, 'Description must be between 5 and 50 characters'],
        maxLength: [50, 'Description must be between 5 and 50 characters'],
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    donations: [
        {
            user: {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: 'User',
            },
        },
    ],
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
