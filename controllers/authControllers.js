const User = require('../models/User')

module.exports.signupGet =(req, res) => {
    res.render('signup');
}

module.exports.loginGet =(req, res) => {
    res.render('login')
}

module.exports.signupPost = async(req, res) => {
    
    const {email, password} = req.body

    try{

        const user= await User.create({email, password});
        res.status(201).json(user)
        console.log("User created successfully", user);

    } catch (error) {
        console.log(error);
        res.status(400).send('error, user not created ')

    }
}

module.exports.loginPost =(req, res) => {
    res.send('user login')
}