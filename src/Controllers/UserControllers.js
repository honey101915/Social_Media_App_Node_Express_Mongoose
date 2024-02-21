const express = require("express");
const userSchema = require("../Models/userSchema");
const { profileUpdatedSuccessfully } = require("../Constants/en");

const updateProfile = async (req, res) => {

    var existingUser = req.user;
    const { email, userName } = req.body;
    if (email || userName) {
        return res.status(401).send({ status: 401, message: "You can't update email and username" })
    }
    var updatedUser = {
        ...existingUser,
        ...req.body
    }
    const performUpdate = await userSchema.findByIdAndUpdate(
        req.user.id,
        updatedUser,
        { new: true }
    )
    res.status(200).send({ data: updatedUser, message: profileUpdatedSuccessfully })
}

module.exports = {
    updateProfile
}