const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// handle Errors
const handleErrors =(err)=>{
    console.log(err.message, err.code);
    let errors = {email: '', password: ''};



    // for login post
    if(err.message === 'incorrect email'){
        errors.email = 'That email is not registered';
    }

    if(err.message === 'incorrect password'){
        errors.password = 'That password is incorrect';
    }

    // Errors Handler for signup post

    //Duplicate error code
    if (err.code === 11000){
        errors.email = 'Email already exists';
        return errors;
    }
   

    //validate errors
    if(err.message.includes('user validation failed')){
        
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message 
        })
    }

    return errors


}


const maxAge = 3 * 24 * 60 * 60;
const jwtSecret = process.env.SECRET_KEY;
//create jwt tokens
const createToken = (id) =>{
    return jwt.sign({id}, jwtSecret, {expiresIn: maxAge}) // expects time in seconds
}


module.exports.signupGet =(req, res) => {
    res.render('signup');
}

module.exports.loginGet =(req, res) => {
    res.render('login')
}

module.exports.signupPost = async(req, res) => {
    
    const {email, password} = req.body;
    console.log('Email nd password received by server')

    try{ 

        const user= await User.create({email, password});

        const token = createToken(user._id)

        res.cookie('jwt', token, {httpOnly:true, maxAge: maxAge* 1000 })

        res.status(201).json({user:user._id})
        console.log("User created successfully", user);
 
    } catch (err) {
        const errors = handleErrors(err);
        console.log(err);
        res.status(400).json({errors});

    }
}


module.exports.loginPost = async (req, res) => {

    const {email, password} = req.body;
    console.log(email, password);

    try{
        const user = await User.login(email, password);

        const token = createToken(user._id)

        res.cookie('jwt', token, {httpOnly:true, maxAge: maxAge* 1000 })

        res.status(200).json({user: user._id})

    } catch(err) {
        const errors = handleErrors(err);
        console.log(errors);
        res.status(400).json({errors});

    }

}