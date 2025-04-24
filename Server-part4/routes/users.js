const express = require('express');
const userController = require('../controllers/users');
const multer = require('multer');
const path = require('path');

var router = express.Router();

// Multer configuration for video uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/videos'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the original filename
    }
});

const upload = multer({
    limits: {
        fieldSize: 7* 1024 * 1024 // 1 MB (adjust the size as needed)
    },
    storage: storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /mp4|avi|mkv/; // Add more video formats if needed
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        console.log(extname);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Videos Only!');
        }
    }
});


/*
    * createUser: username, password, displayName, profilePicture
*/
router.route('/')
    .post(userController.createUser); // Create a new user and return the user object

/*
    * getUserById: id (params)
    * updateUser: id (params), displayName
    * deleteUser: id (params), username
*/
router.route('/:id')
    .get(userController.getUserById) // Get a specific user
    .patch(userController.updateUser) // Update a specific user and return the updated user object
    .delete(userController.deleteUser);  // Delete a specific user
/*
    * getUserByUsername: username as id (params)
*/
router.route('/:id/username')
    .get(userController.getUserByUsername); // Get a specific user by username
/*
    * getUserVideos: id (params)
    * createUserVideo: title, author, photo, video (as a file)
*/
router.route('/:id/videos')
    .get(userController.getUserVideos) // Get all videos of a user
    .post(upload.single('video'), userController.createUserVideo); // Create a new video for a user returns the new video

/*
    * getUserVideo: pid of video (params)
    * updateUserVideo: id of user (params), pid of video (params), title
    * deleteUserVideo: id of user (params), pid of video (params)
*/
router.route('/:id/videos/:pid')
    .get(userController.getUserVideo) // Get a specific video of a user
    .patch(userController.updateUserVideo)// Update a specific video title of a user returns the updated video
    .delete(userController.deleteUserVideo); // Delete a specific video of a user returns all of his videos

module.exports = router;

