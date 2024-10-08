const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt')

const  userSchema = new mongoose.Schema({
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




//fire function before the document is being save, using bcrypt to hash the password nd adding a 'salt' to the plane password text before it is being hashed
userSchema.pre('save', async function(next) {

  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt)



    next();

});

// creating Static method to login user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email});

    if(user){

        //compare passwords
        const auth = await bcrypt.compare(password, user.password)

        if(auth){
            return user;
        }
        throw Error('incorrect password');

    }
    throw Error('incorrect email')
}

const User = mongoose.model('user', userSchema);

module.exports = User;