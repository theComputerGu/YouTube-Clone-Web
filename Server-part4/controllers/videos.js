// Import the video service module
const videoService = require('../services/videos');


// Get all videos
const getTopVideos = async (req, res) => {
    try {
        res.status(200).json(await videoService.getTopVideos());

    } catch (err) {
        res.status(500).json({ errors: ['Videos not found'] });
    }
};
// Controller to handle the route and pass userId
const getTcpVideos = async (req, res) => {
    try {
        const userId = req.query.userId; // Extract userId from query parameters

        if (!userId) {
            return res.status(400).json({ errors: ['User ID is required'] });
        }

        // Pass the userId to the service to fetch recommendations
        const videos = await videoService.getTcpVideos(userId);

        res.status(200).json(videos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ errors: ['Videos not found'] });
    }
};


const userWatchVideo = async (req, res) => {
    const video = await videoService.getVideoById(req.params.id);
    const userId = req.body.userId; // Get userId from the request body

    if (!video) {
        return res.status(404).json({ errors: ['Video not found'] });
    }

    video.views += 1; // Increment views count for authenticated user
    await video.save(); // Save video after incrementing views

    if (userId) { // Check if user ID is provided
        try {
            await videoService.notifyTcpServer(userId, video.id); // Notify TCP server
            console.log('Notification sent to TCP server');
        } catch (error) {
            console.error('Error notifying TCP server:', error);
        }
    }

    res.status(200).json(video);
};





const guestWatchVideo = async (req, res) => {
    const video = await videoService.getVideoById(req.params.id);

    if (!video) {
        return res.status(404).json({ errors: ['Video not found'] });
    }
    await video.save(); // Save video after incrementing views

    res.status(200).json(video);
};


// Update a video by ID
const updateVideo = async (req, res) => {
    const video = await videoService.updateVideo(req.params.id,  req.body.views, req.body.likedBy,  req.body.dislikedBy);
    if (!video) {
        return res.status(404).json({ errors: ['Video not found'] });
    }
    res.json(video); //not sure if this is correct
};

// Get all videos that start with a specific prefix
const getVideosByPrefix = async (req, res) => {
    res.status(200).json(await videoService.getVideosByPrefix(req.params.prefix));
}

module.exports = {updateVideo, getTopVideos, getTcpVideos, userWatchVideo, guestWatchVideo, getVideosByPrefix };