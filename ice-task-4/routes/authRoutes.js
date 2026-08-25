const express = require('express'); //imports express
const { signup, login} =require('../controllers/authController');//imports function

const router = express.Router(); //creates router 

router.post('/signup',signup);
router.post('/login',login);
 
module.exports = router; 