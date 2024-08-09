const express = require('express');
const mongoose = require('mongoose');
const dotenv  = require('dotenv');

const authRoutes = require('./routes/authRoutes')

dotenv.config()


const app = express();

// middleware
app.use(express.static('public'));


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
app.get('/', (req, res) =>{
    res.render('home')

}
    
);

app.get('/memories', (req, res) =>{
    res.render('memories');
})

app.use(authRoutes)