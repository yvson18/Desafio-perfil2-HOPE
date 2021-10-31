const User = require("../models/Users");

exports.readUser = async () =>{
    return await User.find({});
}

exports.readUserById = async (id) =>{
    return await User.findById(id);
}

exports.createUser = async (input) =>{
    if(await User.findOne({email: input.email})){
        return -1;
    }else{
        return await User.create(input);
    }
}

exports.updateUserById = async (id,input) =>{
    return await User.findByIdAndUpdate(id,input,{new: true});
}

exports.deleteUserById = async (id) =>{
    return await User.findByIdAndDelete(id);
}