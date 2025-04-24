const User = require('../models/users');




const createUser = async (username, password, displayName, profilePicture) => {
    
    const newUser = new User({ 
        username: username,
        password: password, 
        displayName: displayName, 
        profilePicture: profilePicture 
    });
    
    try{
        return await newUser.save();
    }catch(error){
        console.error(error.stack);
    }
    
};
const getUser = async (username, password) => {
    try {
        return await User.findOne({ username, password }).exec();
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getUserByUsername = async (username) => {
    try {
        return await User.findOne({ username}).select('-password').exec();
    } catch (error) {
        console.error(error);
        return null;
    }
};

const getUserById = async (id) => {
    try {
        return await User.findById(id).select('-password').exec();
    } catch (error) {
        console.error(error);
        return null;
    }
};
const checkUserExists = async (username) => {
    try {
        const user = await User.findOne({ username: username }).exec();
        return user !== null;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

// delete user
const deleteUser = async (username) => {
    try {
        const user = await User.find({username: username}).exec();
        if (!user) return null;
        
        await user.remove();
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
const updateUser = async (id, displayName) => {
    try {
        const user = await User.findOneAndUpdate({ _id: id }, { displayName: displayName }, { new: true });
        
        return user;
    }
    catch (error) {
        console.error(error.stack);
        return null;
    }
}

module.exports = {updateUser, createUser, getUser, getUserByUsername, getUserById, checkUserExists, deleteUser};