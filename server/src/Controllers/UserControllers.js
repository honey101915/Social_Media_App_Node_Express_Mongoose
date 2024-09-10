

const userSchema = require("../Models/userSchema")
const mediaFileSchema = require("../Models/mediaFileSchema")
const interestSchema = require("../Models/interestSchema")

const CommonMessages = require("../Constants/en")
const UniversalFunction = require("../lib/UniversalFunction")

const updateProfile = async (req, res) => {
    try {
        var currentUser = req.user;



        var name = String(req.body?.name || "");
        var phoneNumber = String(req.body?.phoneNumber || "");
        var dob = String(req.body?.dob || "");
        var age = String(req.body?.age || "");
        var gender = String(req.body?.gender || "");
        var profession = String(req.body?.profession || "");
        var about = String(req.body?.about || "");

        const _newUser = {
            name,
            phoneNumber,
            dob,
            age,
            gender,
            profession,
            about
        }

        if (name.trim() === '') {
            UniversalFunction.SendResponse(res, 404, "Name is required")
            return;
        } else if (phoneNumber.trim() === '' || phoneNumber.trim().length < 8) {
            UniversalFunction.SendResponse(res, 404, "PhoneNumber is required of minimum 8 digits")
            return;
        } else if (dob.trim() === '') {
            UniversalFunction.SendResponse(res, 404, "Date of birth is required")
            return;
        } else if (age.trim() === '') {
            UniversalFunction.SendResponse(res, 404, "Age is required")
            return;
        } else if (gender.trim() === '') {
            UniversalFunction.SendResponse(res, 404, "Gender is required")
            return;
        } else if (profession.trim() === '') {
            UniversalFunction.SendResponse(res, 404, "Profession is required")
            return;
        } else if (about.trim() === '') {
            UniversalFunction.SendResponse(res, 404, "About is required")
            return;
        }


        var updatedUser = { ..._newUser }
        await userSchema.findByIdAndUpdate(
            currentUser._id,
            updatedUser,
            { new: true }
        )

        const _updatedUser = await userSchema.findById(currentUser)
        console.log(_updatedUser, "ssss API FULL");
        var _data = res
        _data.userData = _updatedUser
        return UniversalFunction.SendResponse(_data, 200, CommonMessages.profileUpdatedSuccessfully)
    } catch (error) {
        console.log(error, "API ERROR");

        return UniversalFunction.SendServerError(res, error)
    }
}

const deleteProfile = async (req, res) => {
    try {
        var currentUser = req.user

        const findUser = await userSchema.findById(currentUser?._id)
        if (findUser) {
            await userSchema.findByIdAndDelete(currentUser?._id)
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
        const findUser = await userSchema.findById(currentUser._id)
        if (findUser) {
            await userSchema.findByIdAndUpdate(currentUser?._id, {
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
        const findUser = await userSchema.findById(currentUser?._id)
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

const uploadProfilePic = async (req, res) => {
    try {
        console.log(req.file, "ssssss")
        console.log(req.protocol, "protocol")
        console.log(req.get('host'), "req.get('host')")
        var currentUser = req.user

        var findUser = await userSchema.findById(currentUser?._id)
        const fileUrl = `${req.protocol}://${req.get('host')}/${req.file.path}`;
        findUser.profileImage = fileUrl

        const updatedUser = await userSchema.findByIdAndUpdate(
            currentUser?._id,
            findUser,
            { new: true }
        )

        let mediaData = {
            userId: currentUser?._id,
            type: "image",
            fileName: req.file.filename,
            path: req.file.path,
            url: fileUrl
        }

        const newPost = await mediaFileSchema.create(mediaData)

        return UniversalFunction.SendResponse(res, 200, "", updatedUser)

    } catch (error) {
        console.log(error, "errorerror");
        return UniversalFunction.SendServerError(res, error)
    }
}

module.exports = {
    updateProfile,
    deleteProfile,
    logout,
    addInterests,
    uploadProfilePic
}