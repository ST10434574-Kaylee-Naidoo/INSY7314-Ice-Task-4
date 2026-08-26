const multer= require ('multer');

const storage = multer.memoryStorage(); //tells multer not the save the uploaded image permanently

const upload = multer({
    storage:storage
});

module.exports=upload;