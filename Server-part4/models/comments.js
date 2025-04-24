const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    photo: {
        type: Object,
        required: true
    },
    videoId: {
        type: String,
        required: true
    },
    text:{
        type:String,
        required: true
    },
});  
module.exports = mongoose.model('comments', CommentSchema);