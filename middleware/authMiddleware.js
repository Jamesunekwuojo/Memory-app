const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const User = require('../models/User.js') 


const jwtSecret = process.env.SECRET_KEY;

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

   

    // check if token exists and is verified
    if(token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decodedToken)

                next();
            }
        } )

    } else {
        res.redirect('/login')
    }
}


// check currrent user exists
const checkUser =async (req, res, next) =>{
    const token = req.cookies.jwt;

    if(token) {

        jwt.verify(token, jwtSecret, async(err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null
                
            } else {
                console.log(decodedToken)
                let user = await User.findById(decodedToken.id);
                res.locals.user = user

                next();
            }
        } )

    } else {
        res.locals.user =null;
        next()
    }

}

module.exports = {requireAuth, checkUser }