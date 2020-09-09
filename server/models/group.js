const { mongoose } = require('../config');
const { ReplyType } = require('./replyType');
const { v4 } = require('uuid');

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

groupSchema.pre('save', async function (next) {
    if (this.isNew) {
        await ReplyType.create([{
            reply: 'בסיס',
            key: v4(),
            group: this.get('key')
        }, {
            reply: 'חופש',
            key: v4(),
            group: this.get('key'),
            allowFutureReply: true
        }, {
            reply: 'ג',
            key: v4(),
            group: this.get('key')
        }, {
            reply: 'ד',
            key: v4(),
            group: this.get('key')
        }, {
            reply: 'תפקיד חוץ',
            key: v4(),
            group: this.get('key')
        }, {
            reply: 'שמירה',
            key: v4(),
            group: this.get('key')
        }])
    }
});

const Group = mongoose.model('group', groupSchema);

module.exports = {
    Group
};