const path = require('path')
const mongoose = require('mongoose');

const reg_form_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    semester: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    file: {
        type: String,
        required: true
    },
    isVerified : {
        type : String,
        required: true
    }
}, {
    timestamps: true
});

reg_form_schema.index({ email: 1, semester: 1 }, { unique: true });


const Reg_Form = mongoose.model('Reg_Form', reg_form_schema);
module.exports = Reg_Form;