const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const dev = app.get('env') !== 'production';

if (!dev) {
  app.disable('x-powered-by');
  app.use(express.static(path.resolve(__dirname, 'build')));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

if (dev) {
  require('dotenv').config();
}

const replies = require('./server/routes/replies');
const group = require('./server/routes/group');
const user = require('./server/routes/user');
const replyType = require('./server/routes/replyType');

app.use(cors());

app.use('/api/replies', replies);
app.use('/api/group', group);
app.use('/api/user', user);
app.use('/api/replyType', replyType);

require('./server/io/replies')(io);

http.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`)
});