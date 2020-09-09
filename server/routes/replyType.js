const { Router } = require('express');
const { ReplyType } = require('../models/replyType');
const { v4 } = require('uuid');

const router = Router();

router.get('', async (req, res) => {
    try {
        if (req.query.group) {
            let replyTypes = await ReplyType.find({ group: req.query.group }).exec();
            res.send(replyTypes);
        } else if (req.query.key) {
            let replyType = await ReplyType.findOne({ key: req.query.key }).exec();
            res.send(replyType);
        } else {
            res.sendStatus(400)
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.get('/update', async (req, res) => {
    try {
        let reply = await ReplyType.findOne({ key: req.query.key }).exec();
        await reply.updateOne({
            reply: req.query.reply,
            allowFutureReply: req.query.future === 'true'
        }).exec();
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.get('/add', async (req, res) => {
    try {
        let key = v4();
        await ReplyType.create({
            key,
            group: req.query.group,
            reply: req.query.reply,
            allowFutureReply: req.query.future === 'true'
        });
        res.send(key);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.get('/delete', async (req, res) => {
    try {
        await ReplyType.deleteOne({
            key: req.query.key
        }).exec();
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = router;