const { Router } = require('express');
const { User } = require('../models/user');

const router = Router();

router.get('', async (req, res) => {
    try {
        let user = await User.findOne({ key: req.query.key }).exec();
        res.send(user);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.get('/update', async (req, res) => {
    try {
        let user = await User.findOne({ key: req.query.key }).exec();
        await user.update({
            name: req.query.name,
            phoneNumber: req.query.phoneNumber
        }).exec();
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = router;