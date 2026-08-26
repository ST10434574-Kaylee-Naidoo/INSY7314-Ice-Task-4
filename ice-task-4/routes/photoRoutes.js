const express = require('express');

const
{
    getPhotos,
    getAllPhotos,
    uploadPhoto
} = require('../controllers/photoController');

const
{
    protect,
    authorizeRoles
} = require ('../middleware/authMiddleware');

const upload = require ('../middleware/uploadMiddleware')

const router = express.Router();

router.get('/', protect, getPhotos);
router.get('/all', protect, authorizeRoles('admin'), getAllPhotos);
router.post('/', protect, upload.single('image'), uploadPhoto);

module.exports=router;