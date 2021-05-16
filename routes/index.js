const express = require('express');
const passport = require('passport');
const Reg_Form = require('../models/registration_form');
const User = require('../models/User');
const router = express.Router();
const {OAuth2Client} =require('google-auth-library');

const client= new OAuth2Client(process.env.G_AUTH);

router.use('/create-student', require('./createStudents'));

router.use('/student', require('./student'));

router.route('/').get((req, res) => {
    return res.render('reg.ejs');
});

router.route('/allReg').get(async (req, res) => {
    try {
        let reg = await Reg_Form.find({}).populate('userId');
        return res.json({
            message: `User's data fetched successfully!!`,
            reg
        });
    } catch (error) {
        return req.json({
            message: 'error in fetching users data',
            error
        });
    }
});
// get all users data
router.route('/users').get(async (req, res) => {
    try {
        let user = await User.find({}).populate('forms');
        return res.json({
            message: `User's data fetched successfully!!`,
            user
        });
    } catch (error) {
        return req.json({
            message: 'error in fetching users data',
            error
        });
    }
});
router.post('/googleLogin',(req,res)=>{
    const {tokenId}=req.body;
     client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.G_AUTH
    }).then(async (response) => {
        console.log(response.payload);
        const { email_verified, name, email } = response.payload;
        try {
            if (!email_verified)
            {
                return res.status(401).json({
                    message: 'user not authorized!!',
                    valid: false,
                    id: null,
                    type: null
                });
            }
            let user = await User.findOne({ email });
            console.log(user);

            return res.json({
                message: 'login success',
                valid:true,
                id: user._id,
                type: user.type
            });
        } catch (error) {
            return res.json({
                message: 'user not authorized!!',
                valid: false,
                id: null,
                type: null
            });
        }
    })
});

//login
router.post('/', function (req, res, next) {
    // call passport authentication passing the "local" strategy name and a callback function
    passport.authenticate('local', function (error, user) {
      // this will execute in any case, even if a passport strategy will find an error
      if (error || req.body.type != user.type || req.body.password != user.password) {
          return res.json({
              message: 'Invalid Username/Password!!',
              valid: false,
              id: null
          });
        }
        req.user = user;
        next();
    })(req, res);
  },

  // function to call once successfully authenticated
    function (req, res) {
        // console.log(req.user);
    return res.json({
        message: 'login success',
        valid:true,
        id:req.user._id
    });
    });

    // returns user details based on id
router.get('/user/:id', passport.checkAuthentication, async (req, res) => {
    try {
    
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.json({
                message: 'user not found'
            });
        }
        return res.json({
            message: 'user found!!',
            user
        });
    } catch (error) {
        return res.status(200).json({
            message: 'ERROR!!'
        });
    }

});

    // change password 
router.post('/changePassword/:id', passport.checkAuthentication, async(req, res) => {
 
    try {
        let user = await User.findById(req.params.id);
        // console.log(req.body);
        if (user.password !== req.body.currentPassword)
        {
            return res.json({
                messsage: "Please enter correct password!!"
            });
        }
        user.password =  req.body.newPassword;
        user.save();
        // console.log(user);
        return res.json({
            message: 'password updated successfully!!'
        })
    } catch (error) {
        return res.json({
            message: 'Error in Reseting password!!'
        })
    }
})

router.route('/download/:path').get(async (req, res) => {
    return res.sendFile(req.params.path);
});



module.exports = router;