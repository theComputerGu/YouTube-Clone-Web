const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Video = new Schema({
   
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    authorDisplayName: {
        type: String,
        required: true
    },
    timeAgo: {
        type: Date,
        default: Date.now
    },
    views: {
        type: Number,
        default: 0
    },
    photo: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    
    likedBy: [{
        type: String,
    }],
    
    dislikedBy: [{
        type: String,
    }]
    
});
module.exports = mongoose.model('Video', Video);