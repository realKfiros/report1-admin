const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// const publicPath = path.join(__dirname, '..', 'public');

const replies = require('./server/routes/replies');

app.use(cors());
// app.use(express.static(publicPath));

app.use('/api/replies', replies);

const dev = app.get('env') !== 'production';

if (!dev) {
    app.disable('x-powered-by');
    app.use(express.static(path.resolve(__dirname, 'build')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
}

require('./server/io/replies')(io);

http.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`)
});