const Photo = require('../models/Photo');
const {streamUpload, deleteFromCloudinary} = require('../util/cloudinary');

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


//function to update image 
const updatePhoto=async (req, res)=>
{
    try
    {
        const {title, description}=req.body;

        const photo= await Photo.findById(req.params.photoId);

        if(!photo){
            return res.status(400).json({
                error:'photo not found'
            });
        }

        const isOwner =photo.owner.toString()===req.user.id.toString();
        const isAdmin =req.user.role ==='admin';

        if(!isOwner && !isAdmin)
        {
            return res.status(403).json({
                error: 'updating photo not allowed for this user'
            })
        }

        if(title){
            photo.title=title;
        }

        if(description !== undefined){
            photo.description=description;
        }

        if(req.file)
        {
            const oldPublicId = photo.cloudinaryPublicId;
            const uploadResult=await streamUpload(req.file.buffer);

            photo.imageUrl = uploadResult.secure_url;
            photo.cloudinaryPublicId = uploadResult.public_id;

            await photo.save();
            await deleteFromCloudinary(oldPublicId);

            return res.status(200).json({
                message: 'Photo updated ',
                photo
            });
        }

        await photo.save();
        return res.status(200).json({
            message:"Photo updated",
            photo
        });
    }
    catch(error)
    {
        return res.status(200).json({
            error: 'unable to update photo'
        });
    }
};


//function to delete photos
const deletePhoto= async (req,res)=>
{
    try
    {
        const photo = await Photo.findById(req.params.photoId);

        if(!photo){
            return res.status(404).json({
                error: 'Photo not found'
            });
        }

        const isOwner =photo.owner.toString()===req.user.id.toString();
        const isAdmin =req.user.role ==='admin';

        if(!isOwner && !isAdmin)
        {
            return res.status(403).json({
                error: 'deletion of photo not allowed for this user'
            })
        }

        await deleteFromCloudinary(photo.cloudinaryPublicId);

        await photo.deleteOne();

        return res.status(200).json({
            message:'Photo deleted successfully'
        });

    }
    catch(error)
    {
        return res.status(500).json({
            error: 'Unable to delete photo'
        });
    }
};

module.exports=
{
    getPhotos,
    getAllPhotos,
    uploadPhoto,
    updatePhoto,
    deletePhoto
};

