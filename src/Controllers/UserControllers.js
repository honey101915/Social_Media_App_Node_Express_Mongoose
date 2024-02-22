const express = require("express");
const userSchema = require("../Models/userSchema");
const { profileUpdatedSuccessfully } = require("../Constants/en");

const updateProfile = async (req, res) => {
    try {
        var currentUser = req.user;
        const { email, userName } = req.body;
        if (email || userName) {
            return res.status(401).send({ status: 401, message: "You can't update email and username" })
        }

        const findUser = await userSchema.findById(currentUser?.id)

        if (findUser?.accessToken === null) {
            return res.status(401).send({ message: "Unauthorized user" })
        }

        var updatedUser = {
            ...currentUser,
            ...req.body
        }
        await userSchema.findByIdAndUpdate(
            req.user.id,
            updatedUser,
            { new: true }
        )
        res.status(200).send({ data: updatedUser, message: profileUpdatedSuccessfully })
    } catch (error) {
        res.status(500).send({ error: error, message: somethingWentWrong })
    }
}

const deleteProfile = async (req, res) => {
    try {
        var currentUser = req.user

        const findUser = await userSchema.findById(currentUser?.id)
        if (findUser) {
            await userSchema.findByIdAndDelete(currentUser?.id)
            res.status(200).send({ message: "User deleted successfully." })
        } else {
            res.status(404).send({ message: "User not found" })
        }
    } catch (error) {
        res.status(500).send({ error: error, message: somethingWentWrong })
    }
}

const logout = async (req, res) => {
    try {
        var currentUser = req.user
        const findUser = await userSchema.findById(currentUser.id)
        if (findUser) {
            await userSchema.findByIdAndUpdate(currentUser?.id, {
                accessToken: null
            })
            res.status(200).send({ message: "User is logged out successfully" })
        } else {
            res.status(404).send({ message: "User is already logged out" })
        }
    } catch (error) {
        res.status(500).send({ error: error, message: somethingWentWrong })
    }
}

module.exports = {
    updateProfile,
    deleteProfile,
    logout
}