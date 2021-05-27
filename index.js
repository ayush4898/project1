const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const passportLocal = require('./config/passport_local');
const port = process.env.PORT || 8000;
const db = require('./config/mongoose.js');  // using mongoose to connect to mongo db

const app = express();


const whitelist = ['http://localhost:3000', 'http://localhost:8000','http://localhost:8000/', 'https://stark-everglades-73789.herokuapp.com']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.json());
    app.use(cookieParser()); // to fetch the cookie in req
    
    app.use(express.static('public'));
app.use(fileUpload());

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));


    app.use(session({
        name: 'userRegistration',
        secret: process.env.SESSION_SECRET, //TODO to generalize
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: (1000 * 60 * 100) // 100minutes
        },
        // store cookie in mongodb
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost/UserDashboard',
            autoRemove: 'disabled' ,
        }, function (err) {
            console.log(err || `connected to session cookie via mongo`);
        })
    }
    ));

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(passport.setAuthenticatedUser);

app.use('/api/', require('./routes'));
    
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

    app.listen(port, (err) => {
        if (err) { console.log('error in runnning server :', err); return; }
        console.log('server running fine on port :', port);
});