const mongoose = require('mongoose');
const {isEmail} = require('validator');


const  userschema = new mongoose.Schema({
    email:{
        type:String,
        required:[true, 'Please enter an email'], //second part is custom error message
        unique:true,
        lowercase:true,
        validate:[isEmail, 'please enter a valid email'] // 1st part is a function to check if email is valid. But the validator package is used here to simplify the process



    }, 
    password:{

        type:String,
        required:[true, 'Please enter a password'],
        minlength:[6, 'Minimum password lenght is 6 characters']
    } 
})


// Fire function after user has being savd to DB, using mongoose hook

userschema.post('save', function (doc, next) {

    console.log("New user was created", doc);
;

    next()  //To get to the next middleware

} ); //Note the first argument in the 'post()' method is the event, and the second one is the function that I want it to fire

//fire function before
userschema.pre('save', function(next) {

    console.log("Before user is saved", this)

    next()

});

const User = mongoose.model('user', userschema);

module.exports = User;