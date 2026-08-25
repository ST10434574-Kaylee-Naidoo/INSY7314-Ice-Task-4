const bcrypt = require('bcrypt'); //hashes passwords before storing them
const jwt = require('jsonwebtoken'); //creates token after signup or login
const User = require('../models/User'); //imports user model

//helper function for generating JWTs
const createToken = (user) => { 
  return jwt.sign( 
    { 
      id: user._id, 
      role: user.role 
    }, 
    process.env.JWT_SECRET, 
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' } 
  ); 
};


//signup function

const signup = async (req, res, next) => { 
  try { 
    const { username, email, password } = req.body; 
  
    if (!username || !email || !password) 
    { 
      return res.status(400).json({ error: 'Username, email, and password are required' }); 
    }

    const existingUser = await User.findOne({email});

    if(existingUser)
    {
        return res.status(400).json({error: 'An account with this email already exists'});
    }

    const passwordHash = await bcrypt.hash(password,10);

    const user = await User.create({
        username,
        email,
        passwordHash
    });

    const token = createToken(user);

    res.status(201).json({
        message: 'User registered successfully',
        token,
        user:
        {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    });

    }
    catch
    {
        res.status(500).json({error: 'Unable to register user'});
    }
};


//login function
const login = async (req, res, next) => { 
  try { 
    const { email, password } = req.body; 
  
    if (!email || !password) 
    { 
      return res.status(400).json({ error: 'Email and password are required' }); 
    }

 const user = await User.findOne({email}).select('+passwordHash'); 
  
    if (!user) 
    { 
      return res.status(401).json({ error: 'Invalid credentials' }); 
    } 
  
    const passwordMatches = await bcrypt.compare
    (
        password, 
        user.passwordHash
    ); 
  
    if (!passwordMatches) 
    { 
      return res.status(401).json({ error: 'Invalid credentials' }); 
    } 
  
    const token = createToken(user); 
  
    res.status(200).json({ 
      message: 'Login successful', 
      token, 
      user: { 
        id: user._id, 
        username: user.username, 
        email: user.email, 
        role: user.role 
      } 
    }); 

  }  
  catch (error) 
  {
    return res.status(500).json({
        error:'Unable to login'
    });
  }
  
}; 





module.exports=
{
    signup,
    login
};
