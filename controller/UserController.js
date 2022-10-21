const User = require("../models/User");

const getAllUsers = async (req,res) => {
    try {
        const user = await User.find();
        return res.send({user})
    } catch (error) {
        res.status(500).send({error: error.message})
    }
}

module.exports = {
    getAllUsers
}