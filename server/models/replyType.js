const { mongoose } = require('../config');

const replyTypeSchema = new mongoose.Schema({
    reply: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    allowFutureReply: {
        type: Boolean,
        default: false
    }
});

const ReplyType = mongoose.model('replyType', replyTypeSchema);

module.exports = {
    ReplyType
};