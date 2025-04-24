const express = require('express');
const commentController = require('../controllers/comments');

var router = express.Router();

router.route('/videos/:id')
    .get(commentController.getComments) // Get all comments of a video
    .post(commentController.createComment) // Create a new comment for a video
    .delete(commentController.deleteComments); // Delete all comments
    
router.route('/:id/videos/:pid')
    .patch(commentController.updateComment) // Update comment
    .delete(commentController.deleteComment); // Delete comment
module.exports = router;

