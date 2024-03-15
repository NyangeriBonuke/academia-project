const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    universityName: {
        type: String,
        trim: true
    },
    course: {
        type: String,
        trim: true
    },
    yearOfStudy: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('User', UserSchema);
