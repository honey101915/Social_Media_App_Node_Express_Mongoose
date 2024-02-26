const userSchema = require("../Models/userSchema");
const interestSchema = require("../Models/interestSchema")

const CommonMessages = require("../Constants/en")
const UniversalFunction = require("../lib/UniversalFunction")

const updateProfile = async (req, res) => {
    try {
        var currentUser = req.user;
        const { email, userName } = req.body;
        if (email || userName) {
            return UniversalFunction.SendResponse(res, 401, "You can't update email and username")
        }
        const findUser = await userSchema.findById(currentUser?.id)

        if (findUser?.accessToken === null) {
            return UniversalFunction.SendResponse(res, 401, "Unauthorized user")
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
        return UniversalFunction.SendResponse(res, 200, CommonMessages.profileUpdatedSuccessfully)
    } catch (error) {
        return UniversalFunction.SendServerError(res, error)
    }
}

const deleteProfile = async (req, res) => {
    try {
        var currentUser = req.user

        const findUser = await userSchema.findById(currentUser?.id)
        if (findUser) {
            await userSchema.findByIdAndDelete(currentUser?.id)
            return UniversalFunction.SendResponse(res, 200, "User deleted successfully.")
        } else {
            return UniversalFunction.SendResponse(res, 404, "User not found")
        }
    } catch (error) {
        return UniversalFunction.SendServerError(res, error)
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
            return UniversalFunction.SendResponse(res, 200, "User is logged out successfully")
        } else {
            return UniversalFunction.SendResponse(res, 404, "User is already logged out")
        }
    } catch (error) {
        return UniversalFunction.SendServerError(res, error)
    }
}

const addInterests = async (req, res) => {
    try {
        var currentUser = req.user
        const { interests } = req.body
        const findUser = await userSchema.findById(currentUser?.id)
        if (!interests) {
            return UniversalFunction.SendResponse(res, 404, "Interests is required")
        }
        if (findUser) {
            await userSchema.findOneAndUpdate(findUser?._id, { interests: interests })
            const getUpdatedUser = await userSchema.findById(findUser?._id)
            return UniversalFunction.SendResponse(res, 200, getUpdatedUser, "Interests updated successfully")
        } else {
            return UniversalFunction.SendResponse(res, 404, "Unauthorised")
        }
    } catch (error) {
        return UniversalFunction.SendServerError(res, error)
    }
}


module.exports = {
    updateProfile,
    deleteProfile,
    logout,
    addInterests
}