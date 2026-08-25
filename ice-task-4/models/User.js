const mongoose = require('mongoose'); //imports mongoose
  
const userSchema = new mongoose.Schema(  //sets rules for how a user should be stored in MongoDB
  { 
    username: 
    { 
      type: String, 
      required: [true, 'Ussername name is required'], 
      trim: true, 
    }, 

    email: 
    { 
      type: String, 
      required: [true, 'Email is required'], 
      unique: true, 
      lowercase: true, 
      trim: true, 
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'] 
    }, 

    passwordHash: 
    { 
      type: String, 
      required: [true, 'Password hash is required'], 
      select: false 
    }, 

    role: 
    { 
      type: String, 
      enum: ['user', 'admin'],  //only two roles are allowed, user and admin
      default: 'user' //every account starts as a user 
    } 

  }, 

  { timestamps: true } 

);

module.exports=mongoose.model('User', userSchema);