const { mongoose } = require('../config');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String
    }
});

const User = mongoose.model('user', userSchema);

module.exports = {
    User
};