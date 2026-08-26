const User = require('../models/User');

const getMyProfile =async (req, res)=>{
    try
    {
        const user= await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        return res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    }
    catch
    {
        return res.status(500).json({
            error: 'Unable to retrieve profile'
        });
    }
};


const updateMyProfile = async (req, res) => {
    try
    {
        const { username, email } = req.body;

        if (!username && !email) {
            return res.status(400).json({
                error: 'Username or email is required'
            });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(400).json({
                    error: 'An account with this email already exists'
                });
            }

            user.email = email;
        }

        if (username) {
            user.username = username;
        }

        await user.save();

        return res.status(200).json({
            message: 'Profile updated successfully',
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    }
    catch(error)
    {
        return res.status(500).json({
            error: 'Unable to update profile'
        });
    }
}
module.exports=
{
    getMyProfile,
    updateMyProfile
}; 