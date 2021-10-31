const User = require("../models/Users");

exports.readUser = async () =>{
    return await User.find({});
}

exports.readUserById = async (id) =>{
    return await User.findOne({_id:id});
}

exports.createUser = async (input) =>{
    return await User.create(input);
}

