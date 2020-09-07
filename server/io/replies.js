const { Reply } = require('../models/reply');

module.exports = (io) => {
    io.sockets.on('connection', socket => {
        socket.on('reply', () => reply(io));
    });
}

async function reply(io) {
    let replies = await Reply(new Date()).find({}).exec();
    io.emit('refresh', replies);
}
