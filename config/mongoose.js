const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost/UserDashboard', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind('console', 'connection error:'));
db.once('open', function() {
  // we're connected!
    console.log('mongo connected succesfully');
});

