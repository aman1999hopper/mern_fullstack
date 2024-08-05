const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, requireed: true},
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false}
});


// jason web token 

userSchema.methods.generateToken =  async function(){

    try {

        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '10d' }  // token will expire in 10 day
    )
        
    } catch (error) {
        console.error(error); 
    }

}



// Define the model or collection name for the collection model

const User = new mongoose.model('User', userSchema);

module.exports = User;