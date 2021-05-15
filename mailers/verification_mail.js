const nodemailer = require('../config/nodemailer');

// another way of exporting method 
exports.formValidation = (form) => {
    console.log('inside new form mailer',form);
    // pass data as object 
    let htmlString = nodemailer.renderTemplate({form :  form}, '/formvalidation.ejs');
    nodemailer.transporter.sendMail({
        from: 'student4898@gmail.com',
        to: form.email,
        subject: 'Registration Form Status',
        html: htmlString
    }, (err, info)=>{
        if (err) { console.log('error in sending mail', err); return }
        console.log('message sent!!', info);
        return;
    });
}


exports.newForm = (form) => {
    let htmlString = nodemailer.renderTemplate({form :  form}, '/newform.ejs');
    nodemailer.transporter.sendMail({
        from: 'student4898@gmail.com',
        to: form.email,
        subject: 'Successfully Submitted Registration Form !!',
        html: htmlString
    }, (err, info)=>{
        if (err) { console.log('error in sending mail', err); return }
        console.log('message sent!!', info);
        return;
    });
}