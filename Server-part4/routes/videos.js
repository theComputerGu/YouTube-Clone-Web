const express = require('express');
const videosController = require('../controllers/videos');

var router = express.Router();

router.route('/top-videos') // Endpoint for getting top viewed videos and 10 random videos
    .get(videosController.getTopVideos); // Get top viewed videos

router.route('/tcp-videos') // Endpoint for getting recommended videos from TCP and 10 random videos
    .get(videosController.getTcpVideos); // Get recommended videos from TCP

// Route for getting, updating, and deleting a specific video by its ID
router.route('/:id')
    .patch(videosController.updateVideo) // Update a specific video

// Separate route for guests
router.get('/guest/:id', videosController.guestWatchVideo);

// Separate route for authenticated users with authentication middleware
router.post('/user/:id', videosController.userWatchVideo);


// Route for getting all videos that start with a specific prefix
router.route('/prefix/:prefix')
    .get(videosController.getVideosByPrefix); // Get all videos that start with a specific prefix

    
module.exports = router;

