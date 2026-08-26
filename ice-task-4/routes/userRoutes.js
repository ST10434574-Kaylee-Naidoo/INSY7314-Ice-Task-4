const express = require('express');

const 
{ 
    getMyProfile, 
    updateMyProfile,
    getAllUsers,
    promoteUser,
    demoteUser,
    deleteUser 
} 
= require('../controllers/userController');

const { protect, authorizeRoles} = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/me', protect, getMyProfile);
router.put('/me', protect, updateMyProfile);
router.get('/', protect, authorizeRoles('admin'),getAllUsers);
router.delete('/:userId', protect, authorizeRoles('admin'),deleteUser);
router.put('/:userId/promote', protect, authorizeRoles('admin'),promoteUser);
router.put('/:userId/demote', protect, authorizeRoles('admin'),demoteUser);


module.exports = router;