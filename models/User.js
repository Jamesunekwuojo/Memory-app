const mongoose = require('mongoose');


const  userschema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true


    },
    password:{

    } 
})

const User = mongoose.model('user', userschema);

module.exports = User;