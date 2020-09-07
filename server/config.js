const mongoose = require('mongoose');

const mongoUrl = 'mongodb+srv://report1:F1uZ5yzsF4NMKwcO@cluster0.la4zn.gcp.mongodb.net/report1?retryWrites=true&w=majority';
mongoose.connect(mongoUrl, {useNewUrlParser: true});

module.exports = {
    mongoose
};