const { Router } = require('express');
const { Group } = require('../models/group');
const { User } = require('../models/user');
const { Reply } = require('../models/reply');
const { v4 } = require('uuid');
const router = Router();

router.get('/exists', async (req, res) => {
    try {
        let group = await Group.findOne({ key: req.query.key });
        res.send(!!group);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.get('/members', async (req, res) => {
    try {
        let group = await Group.findOne({ key: req.query.key }).exec();
        let members = await User.find({}).where('key').in(group.users).exec();
        let replies = await Reply(new Date()).find({}).where('user').in(group.users).exec();
        let _members = [];
        for (let member of members) {
            const reply = replies.find((r) => {
                return member._doc.key === r.user
            });
            _members.push({
                ...member._doc,
                replyToday: reply ? reply.reply : 'לא בוצע'
            });
        }
        console.log(_members);
        res.send(_members);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

router.post('', async (req, res) => {
    try {
        let key = v4();
        await Group.create({
            key
        });
        res.send(key);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.get('/member', async (req, res) => {
    try {
        let key = v4();
        await User.create({
            name: req.query.name,
            key: key,
            phoneNumber: req.query.phoneNumber && req.query.phoneNumber !== '' ? req.query.phoneNumber : undefined
        });
        let group = await Group.findOne({ key: req.query.group }).exec();
        await group.update({
            users: [...group.users, key]
        });
        res.send(key);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.get('/member/remove', async (req, res) => {
    try {
        await User.deleteOne({ key: req.query.key }).exec();
        let group = await Group.findOne({ key: req.query.group }).exec();
        await group.update({
            users: group.users.filter(user => user !== req.query.key)
        });
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

module.exports = router;