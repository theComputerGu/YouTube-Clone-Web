const commentService = require('../services/comments');


const getComments = async (req, res) => {
    try {
        res.status(200).json(await commentService.getComments(req.params.id));
    }
    catch (err) {
        console.error(err);
        res.status(404).send('comments not found');
    }
}


const createComment = async (req, res) => {
    try {
        res.status(200).json(await commentService.createComment(
            req.body.videoId,
            req.body.username,
            req.body.text
        ));
    }
    catch (err) {
        console.error(err);
        res.status(404).send('comment not created');
    }
}

const deleteComment = async (req, res) => {
    try{
        res.status(200).json(await commentService.deleteComment(req.params.id, req.params.pid));
    } catch (err) {
        console.error(err);
        res.status(404).send('comment not deleted');
    }
}
const deleteComments = async (req, res) => {
    try{
        res.status(200).json(await commentService.deleteComments(req.params.id));
    } catch (err) {
        console.error(err);
        res.status(404).send('comments not deleted');
    }
}
const updateComment = async (req, res) => {
    try{
        res.status(200).json(await commentService.updateComment(req.params.id, req.params.pid, req.body.text));
    } catch (err) {
        console.error(err);
        res.status(404).send('comment not updated');
    }
}


module.exports = { getComments, updateComment, createComment, deleteComment, deleteComments };