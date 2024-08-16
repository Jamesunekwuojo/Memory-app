const express = require('express');
const mongoose = require('mongoose');
const dotenv  = require('dotenv');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes')
const {requireAuth, checkUser} = require('./middleware/authMiddleware.js')


dotenv.config()


const app = express();

// middleware
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());


//view engine
app.set('view engine', 'ejs');

// database connection

mongoose.connect(process.env.dbURL )
.then((response) =>{

    app.listen(3000);
    console.log('Server is running on port  3000');
    console.log("DB connected successfully")

}
    
)
.catch((error) => 
console.log('Error connecting to databse',error) )


//routes
app.get('*', checkUser)
app.get('/',   (req, res) =>
    res.render('home')
);

app.get('/memories', requireAuth,   (req, res) =>
    res.render('memories')
)

app.use(authRoutes)

// Cookies examples
//app.get('/set-cookies', (req, res)=>{
    // res.setHeader('Set-cookie', 'newUser=true');
    //res.cookie('newUser', false,);
    // res.cookie('isEmployer', true, {maxAge: 1000 * 60 *60 *24, httpOnly:true}) 
    //res.send('You got the Cookies ')
//})


// app.get('/read-cookies', (req, res)=>{

//     const cookies = req.cookies;

//     console.log(cookies); 
//     res.json(cookies)

  
// })

// Note: To every request made by the browser to the server,  cookies are being sent to the server