const userService = require('../services/users');
const videoService = require('../services/videos');
const commentService = require('../services/comments');
const jwt = require('jsonwebtoken');


const createUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const displayName = req.body.displayName;
  const profilePicture = req.body.profilePicture;
  let user = await userService.checkUserExists(username);
  if (!user) {
    res.status(200).json(await userService.createUser(username, password, displayName, profilePicture));
  } else {
    res.status(404).send('Username already exists');
  }
}


const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  let user = await userService.getUser(username, password);
  if (user) {
    const profilePicture = user.profilePicture;
    const userId = user._id; // get user id
    const token = jwt.sign({ id: userId }, "key");
    res.status(200).json({ profilePicture, userId, token });
  } else {
    res.status(404).send("Username or password is incorrect");
  }
};

const getUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  user = await userService.getUser(username, password);
  if (user) {
    res
      .status(200)
      .json(req.body.username, req.body.displayName, req.body.photo);
  } else {
    res.status(404).send("Username not found");
  }
};

const getUserByUsername = async (req, res) => {
  const username = req.params.id;
  user = await userService.getUserByUsername(username);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send("User not found");
  }
};


const getUserById = async (req, res) => {
  const id = req.params.id;
  user = await userService.getUserById(id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send("User not found");
  }
};

const getUserByIdWithPassword = async (req, res) => {
  const id = req.params.id;
  user = await userService.getUserByIdWithPassword(id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send("User not found");
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;

  const displayName = req.body.displayName;
  const token = req.headers.authorization;
  const decoded = tokendecode(token);
  if (decoded.id !== id) {
    res.status(403).send("Invalid token");
    return;
  }
  user = await userService.updateUser(id, displayName);
  
  if (user !== null) {
    await videoService.updateVideoDisplayName(user.username, displayName);
    await commentService.updateCommentDisplayName(user.username, displayName);
    res.status(200).json(user);
  } else {
    res.status(404).send('User not found / Username already exists');
  }
}

const deleteUser = async (req, res) => {

  try{const id = req.params.id;
  const username = req.body.username;
  const token = req.headers.authorization;
  const decoded = tokendecode(token);
  if (decoded.id !== id) {
    res.status(403).send("Invalid token");
    return;
  }
  // delete user's videos
  const res1 = await videoService.deleteUsersVideos(username);
  const res2 = await commentService.deleteUserComments(username);
  const res3 = await videoService.remFromVideoLikesDislikes(username);
  if (!res1 || !res2 || !res3) {
    res.status(500).send('error removing user videos/comments/likes/dislikes');
    return;
  }
  // delete user
  const isDeleted = await userService.deleteUser(username);

  if (isDeleted) {
    res.status(200).send('User deleted successfully');
  } else {
    res.status(404).send('User not found');
  }
  }catch(error){
    console.error(error.stack);
    res.status(404).send('error deleting user');
  }
}
const getUserVideo = async (req, res) => {
  const pid = req.params.pid;
  try {
    const video = await videoService.getVideoById(pid);
    if (!video) {
      res.status(404).send('Video not found');
      return;
    }
    res.status(200).json(video);
  } catch (error) {

    console.log(error);
    res.status(404).send('error getting user video');
  }

}

const getUserVideos = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userService.getUserById(id);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    const videos = await videoService.getVideosByAuthor(user.username);
    res.status(200).json(videos);
  } catch (error) {
    res.status(404).send('error getting user videos');
    console.log(error);
  }

}
const createUserVideo = async (req, res) => {
  const id = req.params.id;
  const token = req.headers.authorization;
  const decoded = tokendecode(token);
  if (decoded.id !== id) {
    res.status(403).send("Invalid token");
    return;
  }
  const { title, author, photo } = req.body;
  let path = req.file ? req.file.path : null;
  if (!path) {
    return res.status(400).send('No video uploaded');
  }
  path = '\\videos' + path.split('videos')[1];

  try {
    const video = await videoService.createVideo(title, author, path, photo);
    if (!video) {
      res.status(404).send('Video not created');
      return;
    }
    res.status(200).json(video);
  } catch (error) {
    console.error(error.stack);
    res.status(500).send('Server error');
  }
};


const updateUserVideo = async (req, res) => {
  const pid = req.params.pid;
  const id = req.params.id;
  const title = req.body.title;
  try {
    const video = await videoService.updateVideoTitle(pid, title);
    const token = req.headers.authorization;
    const decoded = tokendecode(token);
    if (decoded.id !== id) {
      res.status(403).send("Invalid token");
      return;
    }
    if (!video) {
      res.status(404).send('Video not found');
      return;
    }
    res.status(200).json(video);
  } catch (error) {
    console.log(error);
    res.status(404).send('error updating user video');
  }
}
const deleteUserVideo = async (req, res) => {
  const pid = req.params.pid;
  const id = req.params.id;
  const token = req.headers.authorization;
  const decoded = tokendecode(token);
  if (decoded.id !== id) {
    res.status(403).send("Invalid token");
    return;
  }
  try {
    const result = await videoService.deleteVideo(pid);

    if (!result) {
      res.status(404).send('Video not found');
      return;
    }
    await commentService.deleteVideoComments(pid);
    const videos = await videoService.getVideosByAuthor(id);
    res.status(200).json(videos);
  } catch (error) {
    console.log(error);
    res.status(404).send('error deleting user video');
  }
}








function tokendecode(token) {
  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }
  return jwt.verify(token, "key");
}


module.exports = {
  createUser,
  login,
  getUserByUsername,
  getUser,
  getUserById,
  getUserByIdWithPassword,
  updateUser,
  deleteUser,
  getUserVideo,
  getUserVideos,
  createUserVideo,
  updateUserVideo,
  deleteUserVideo
};