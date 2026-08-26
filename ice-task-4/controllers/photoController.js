const Photo = require('../models/Photo');
const {streamUpload} = require('../util/cloudinary');

//function to get photos
const getPhotos= async(req,res)=>
{
    try
    {
        const photos = await Photos.find()
        .populate('owner', 'username email');

        return res.status(200).json({
            count: photos.length,
            photos
        });
    }
    catch(error)
    {
        return res.status(500).json({
            error: 'Unable to get photos '
        })
    }
};

//function to get all photos 
const getAllPhotos= async(req,res)=>
{
    try
    {
        const photos = await Photos.find()
        .populate('owner', 'username email role');

        return res.status(200).json({
            count: photos.length,
            photos
        });
    }
    catch(error)
    {
        return res.status(500).json({
            error: 'Unable to get all photos '
        })
    }
};

//function to upload photo
const uploadPhoto= async (req, res)=>
{
    try
    {
        const {title, description}= req.body;

        if(!title){
            return res.status(400).json({
                error:'photo title is required'
            });
        }

        if(!req.file){
            return res.status(400).json({
                error: 'Image file is required'
            });
        }

        const uploadResult = await streamUpload(req.file.buffer);

        const photo = await Photo.create({
            title,
            description,
            imageUrl: uploadResult.secure_url,
            cloudinaryPublicId: uploadResult.public_id,
            owner: req.user.id
        });
    }
    catch
    {
        return res.status(500).json({
            error:'unable to upload photo'
        });
    }
};

module.exports=
{
    getPhotos,
    getAllPhotos,
    uploadPhoto
};

