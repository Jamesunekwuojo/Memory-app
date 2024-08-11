const User = require('../models/User')
// handle Errors
const handleErrors =(err)=>{
    console.log(err.message, err.code);
    let errors = {email: '', password: ''};

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
        res.status(201).json(user)
        console.log("User created successfully", user);

    } catch (err) {
        const errors = handleErrors(err);
        console.log(err);
        res.status(400).json({errors});

    }
}


module.exports.loginPost =(req, res) => {
    res.send('user login')
}