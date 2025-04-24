const Video = require('../models/videos');
const userService = require('./users');

const createVideo = async (title, author, path, photo) => {
    try{const user = await userService.getUserByUsername(author);
    const authorDisplayName = user.displayName;
    const video = new Video({
        title: title,
        author: author,
        authorDisplayName: authorDisplayName,
        photo: photo,
        path: path
    }
    );
    return await video.save();
    }catch(error){
        console.error(error.stack);
    }
};
const getVideoById = async (id) => { return await Video.findById(id); };

const updateVideo = async (id, views, likedBy, dislikedBy) => {
    const update = {
        views: views,
        likedBy: likedBy,
        dislikedBy: dislikedBy
    };
    const options = { new: true };
    const video = await Video.findOneAndUpdate({ _id: id }, update, options);
    return video;
};
const updateVideoTitle = async (id, title) => {
    const update = {
        title: title
    };
    const options = { new: true };
    const video = await Video.findOneAndUpdate({ _id: id }, update, options);
    return video;
};
const updateVideoDisplayName = async (username, displayName) => {
    try {
        const videos = await Video.find({ author: username });
        for (let video of videos) {
            video.authorDisplayName = displayName;
            await video.save();
        }
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
}
const remFromVideoLikesDislikes = async (username) => {
    try {
        const likedVideos = await Video.find({ likedBy: username });
        for (let video of likedVideos) {
            video.likedBy = video.likedBy.filter(user => user !== username);
            await video.save();
        }
        const dislikedVideos = await Video.find({ dislikedBy: username });
        for (let video of dislikedVideos) {
            video.dislikedBy = video.dislikedBy.filter(user => user !== username);
            await video.save();
        }
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
}

const deleteVideo = async (id) => {
    const result = await Video.findByIdAndDelete(id);
    if (!result) return null;
    return true;
};
const deleteUsersVideos = async (username) => {
    const videos = await Video.find({ author: username });
    for (let video of videos) {
        await video.remove();
    }
};

const getVideosByPrefix = async (prefix) => {
    const videos = await Video.find({ title: { $regex: `^${prefix}`, $options: 'i' } });
    return getTopAndRandomVideos(videos);
};
const getVideosByAuthor = async (username) => {
    return await Video.find({ author: username });
}


const getTopVideos = async () => {
    const videos = await Video.find({});
    return getTopAndRandomVideos(videos);
};

const getTcpVideos = async (userId) => {
    const videos = await Video.find({}); // Fetch all videos from the database
    return getTcpAndRandomVideos(userId); // Pass userId to get recommendations
};


const getTopAndRandomVideos = (videosArray) => {
    // Sort videos by views in descending order and take the top 10
    const top10Videos = videosArray
        .sort((a, b) => b.views - a.views)
        .slice(0, 10);

    // Get the remaining videos after removing the top 10
    const remainingVideos = videosArray.filter(video => !top10Videos.includes(video));

    // Shuffle the remaining videos to select 10 random ones
    const shuffledVideos = remainingVideos.sort(() => 0.5 - Math.random());

    // Take the first 10 random videos
    const random10Videos = shuffledVideos.slice(0, 10);

    // Combine top 10 and random 10
    return [...top10Videos, ...random10Videos];
};
const net = require('net');

// Function to get video recommendations for a user
const getRecommendationsFromTCP = (userId) => {
    return new Promise((resolve, reject) => {
        const client = new net.Socket();

        const tcpServerAddress = '127.0.0.1';
        const tcpServerPort = 5551;

        // Connect to the TCP server
        client.connect(tcpServerPort, tcpServerAddress, () => {
            console.log('Connected to TCP server');
            
            // Send the "recommend {user_id}" command
            const message = `recommend ${userId}`;
            client.write(message);
        });

        client.on('data', (data) => {
            console.log('Received from server:', data.toString());
            const recommendations = data.toString().match(/Recommended videos: (.+)/);
            if (recommendations) {
                resolve(recommendations[1].trim().split(' ')); // Split by space for individual video IDs
            } else {
                resolve([]); // No recommendations found
            }
            client.destroy(); // Close the connection
        });

        client.on('error', (error) => {
            console.error('TCP Error:', error);
            reject(error);
        });

        client.on('close', () => {
            console.log('Connection closed');
        });
    });
};


const getTcpAndRandomVideos = async (userId) => {
    try {
        // Fetch all videos from the database
        const videosArray = await Video.find({});

        // Fetch top video IDs from the TCP server
        const tcpVideoIds = await getRecommendationsFromTCP(userId);

        // Fetch recommended videos from the database based on tcpVideoIds
        const tcpVideos = await Video.find({ _id: { $in: tcpVideoIds } });

        // Filter out the recommended videos from the full list
        const remainingVideos = videosArray.filter(video => !tcpVideoIds.includes(video._id.toString()));

        // Shuffle the remaining videos to select 10 random ones
        const shuffledVideos = remainingVideos.sort(() => 0.5 - Math.random());

        // Take the first 10 random videos
        const random10Videos = shuffledVideos.slice(0, 10);

        // Combine top recommended videos and random 10
        return [...tcpVideos, ...random10Videos];
    } catch (error) {
        console.error('Error fetching combined videos:', error);
        return []; // Return an empty array or handle the error as needed
    }
};




const notifyTcpServer = async (userId, videoId) => {
    // Your existing TCP client logic to notify the server
    const client = new net.Socket();
    const tcpServerAddress = '127.0.0.1'; 
    const tcpServerPort = 5551;

    return new Promise((resolve, reject) => {
        client.connect(tcpServerPort, tcpServerAddress, () => {
            console.log('Connected to TCP server');
            client.write(`user ${userId} watched ${videoId}`);
        });

        client.on('data', (data) => {
            console.log('Received from TCP server:', data.toString());
            resolve();
            client.destroy();
        });

        client.on('error', (error) => {
            console.error('Error connecting to TCP server:', error);
            reject(error);
        });
    });
};




module.exports = { notifyTcpServer, updateVideoTitle,remFromVideoLikesDislikes, updateVideoDisplayName, createVideo, getVideosByAuthor, getVideoById, getTopVideos,getTcpVideos, updateVideo, deleteVideo, getVideosByPrefix, deleteUsersVideos }