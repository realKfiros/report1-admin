const { mongoose } = require('../config');

const groupSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    users: {
        type: [String],
        default: []
    }
});

const Group = mongoose.model('group', groupSchema);

module.exports = {
    Group
};