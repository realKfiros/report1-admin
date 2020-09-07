const { mongoose } = require('../config');

const replySchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    reply: {
        type: Number,
        required: true
    }
});

const Reply = (date) => mongoose.model('reply', replySchema, date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear());

module.exports = {
    Reply
};