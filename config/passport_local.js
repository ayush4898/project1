const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');


passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function (email, password, done) {                //TO DO type of user 

        User.findOne({ email: email }, (err, user) => {
            if (err) { console.log('error in finding user -->passport'); return done(err); }
            return done(err, user);
        });
    }
));

// to encode 
//sets the user into session cookie
passport.serializeUser((user,done) => {
    done(null, user.id);
});

// to decode
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        if (err) {
            console.log('error-->passport', err);
            return done(err);
        }
        return done(null, user);
    });
});

//hand-made function
// to authenticate

passport.checkAuthentication = (req, res, next)=> {
    if (req.isAuthenticated()|| User.findById(req.params.id))
    {
        //return true if user is signined
        // console.log('user checked!!');
       return next();
    }

    //if user is not sign-in then redirect to sign-in page 
    return res.json({
        message: "Unautorized attempt"
    });
}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated())
    {
        // when passport is called it stores the info of current signed-in user into the variable user 
        // see the above funcitons (done part)
        // res.locals.user send the info to views
        res.locals.user = req.user;
    }
    next();
} 

// to restrictaccess of logged in user to several pages 
passport.restrictAccess = function (req, res, next) {
    if (!req.isAuthenticated()) {
        // if user is not authenticated then call neext
        return next();
    }
   
    return res.json({
        message: "Unautorized attempt"
    });
}
module.exports = passport;