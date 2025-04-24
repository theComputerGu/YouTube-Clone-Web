const Comment = require('../models/comments');

const userService = require('../services/users');
const mongoose = require('mongoose');

const getComments = async (videoId) => {
    const comments = await Comment.find({ videoId: videoId }).exec();
    if (!comments) return null;
    return comments;
}
const createComment = async (videoId, username, text) => {
    const user = await userService.getUserByUsername(username);
    const comment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        username: user.username,
        displayName: user.displayName,
        photo: user.profilePicture,
        videoId: videoId,
        text: text
    });
    return await comment.save();
}
const deleteComment = async (commentId, videoId) => {
    const result = await Comment.findByIdAndDelete(commentId);
    if (!result) return null;

    return await getComments(videoId);
}
const deleteComments = async (videoId) => {
    const comments = await Comment.find({ idVideo: videoId });
    for (let comment of comments) {
        await comment.remove();
    }
}
const updateComment = async (commentId, videoId, text) => {
    const result = await Comment.findByIdAndUpdate(commentId, { text: text }, { new: true });
    if (!result) return null;
    return await getComments(videoId);


}
const updateCommentDisplayName = async (username, displayName) => {
    try {
        const comments = await Comment.find({ username: username });
        for (let comment of comments) {
            comment.displayName = displayName;
            await comment.save();
        }
        return true;
    }
    catch (error) {
        console.error(error.stack);
        return false;
    }
}

const deleteUserComments = async (username) => {

    try {
        const comments = await Comment.find({ username: username });
        for (let comment of comments) {
            await comment.remove();
        }
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
}
const deleteVideoComments = async (videoId) => {
    const comments = await Comment.find({ videoId: videoId });
    for (let comment of comments) {
        await comment.remove();
    }
}

module.exports = {deleteVideoComments, updateCommentDisplayName, getComments, updateComment, createComment, deleteComment, deleteComments, deleteUserComments };