const mongoose = require('mongoose');
const {isEmail} = require('validator');


const  userschema = new mongoose.Schema({
    email:{
        type:String,
        required:[true, 'Please enter an email'], //second part is custom error message
        unique:true,
        lowercase:true,
        validate:[isEmail, 'please enter a valid email']



    }, 
    password:{

        type:String,
        required:[true, 'Please enter a password'],
        minlength:[6, 'Minimum password lenght is 6 characters']
    } 
})

const User = mongoose.model('user', userschema);

module.exports = User;