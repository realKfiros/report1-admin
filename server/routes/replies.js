const { Router } = require('express');
const { Reply } = require('../models/reply');
const router = Router();

router.get('/today', async (req, res) => {
    try {
        let replies = await Reply(new Date()).find({}).exec();
        res.send(replies);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

module.exports = router;