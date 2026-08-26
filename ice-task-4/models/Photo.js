const mongoose = require('mongoose'); //imports mongoose
  
const userSchema = new mongoose.Schema(  //sets rules for how a user should be stored in MongoDB
  { 
    title: 
    { 
      type: String, 
      required: [true, 'photo title is required'], 
      trim: true, 
    }, 

    description: 
    { 
      type: String, 
      required: [true, 'Email is required'], 
      trim: true, 
    }, 

    imageUrl: 
    { 
      type: String, 
      required: [true, 'Image URL is required'], 
    }, 

    cloudinaryPublicId: 
    { 
      type: String, 
      required:[true, 'Cloudinary public ID is required'] 
    },

    owner:
    {
        type:mongoose.Schema.Types.ObjectId, //creates a relationship between a photo and the user who uploaded it 
        ref:'User',
        required: true
    }


  }, 

  { timestamps: true } 

);

module.exports=mongoose.model('Photo', photoSchema);