const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const Reg_Form = require('../models/registration_form');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const FILE_PATH = path.join(__dirname, '..', '/uploads/reg');
const verificationMailer = require('../mailers/verification_mail');

router.route('/status').post(async (req, res) => {
    try {
        let form = await Reg_Form.findById(req.query.id);
        console.log(form); 
        form.isVerified = req.query.value;
        form.save();
        verificationMailer.formValidation(form); 
        return res.json({
            message: `form status succcessfully updated to : ${req.query.value} !!`
        });
    } catch (error) {
        return res.json({
            message: `error in updating status!!`
        });
    }
    
})

// registration form via firebase
router.route('/uploadForm/:id').post(async (req, res) => {

    try {
        let form = {
            name: req.body.name,
            email: req.body.email,
            department: req.body.department,
            semester: req.body.semester,
            userId: req.params.id,
            file: req.body.fileUrl,
            isVerified : 'pending' 
        }
        console.log(form);
        let newForm = await Reg_Form.create(form);
        console.log('newform', newForm);
        // updating reg form in user
        let user = await User.findById(req.params.id);
        user.forms.push(newForm.id);
        user.save();
        console.log('user', user);
        verificationMailer.newForm(newForm);
        return res.json({
            message: 'Form submitted Successfully!!',
            isSubmit: true,
            newForm
        });

    } catch (error) {
        console.log(error);
        return res.json({
            message: 'error in uploading file !!',
            isSubmit: false,
            error
        });
    }
    
})


// registration form 
router.post('/form/:id', async (req, res) => {
    try {
        if (req.files === null)
        {
            return res.status(400).json({
                message: "file not uploaded"
            });
        }
        console.log(req.files);
        let file = req.files.file;
        console.log(req.body.email);
        let dir = path.join(FILE_PATH,req.body.email,req.body.semester);
        if (!fs.existsSync(dir))
        {
            fs.mkdirSync(dir, { recursive: true })
        }
        file.mv(path.join(dir,file.name), async (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
        
            // create registration form
            let form = {
                name: req.body.name,
                email: req.body.email,
                department: req.body.department,
                semester: req.body.semester,
                userId: req.params.id,
                file: path.join(dir, file.name),
                isVerified : 'pending' 
            }
            console.log(form);
            let newForm = await Reg_Form.create(form);
            console.log('newform', newForm);
            // updating reg form in user
            let user = await User.findById(req.params.id);
            user.forms.push(newForm.id);
            user.save();
            console.log('user', user);
            return res.json({
                message: 'File uploaded!!',
                newForm
            });
        });
    } catch (error) {
        console.log(error);
        return res.json({
            message: 'error in uploading file !!'
        })
    }
});


// registration form get req
router.route('/form/:id').get(async (req, res) => {
   try {
       
    let user = await User.findById(req.params.id).populate('forms')
       if (!user)
       {
           return res.json({
               message: 'error in finding User!!'
           });
       }
       console.log("user",user);
       let forms = user.forms;
       return res.json({
           forms
       });
       
   } catch (error) {
    console.log(error);
    return res.json({
        message: 'error in fetching Forms!!'
    })
   } 
});


module.exports = router;