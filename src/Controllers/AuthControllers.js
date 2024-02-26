const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../Models/userSchema");
const UniversalFunction = require("../lib/UniversalFunction")
const CommonMessages = require("../Constants/en")

const registerUser = async (req, res) => {
    try {
        const { userName, name, email, password, phoneNumber } = req.body;
        if (!userName || !name || !email || !password || !phoneNumber) {
            UniversalFunction.SendResponse(res, 404, CommonMessages.allFieldsAreMandatory)
            return;
        }
        const findUserWithEmail = await userSchema.findOne({ email })
        if (findUserWithEmail) {
            return UniversalFunction.SendResponse(res, 400, CommonMessages.emailAlreadyRegistered)
        }
        const findUserWithUserName = await userSchema.findOne({ userName })
        if (findUserWithUserName) {
            return UniversalFunction.SendResponse(res, 400, CommonMessages.userNameAlreadyRegistered)
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        var newUserData = {
            userName, name, email, phoneNumber, password: hashedPassword, isVerified: true
        }

        if (req?.body?.latitude && req?.body?.longitude && req?.body?.city) {
            newUserData = {
                ...newUserData,
                location: {
                    latitude: req?.body?.latitude,
                    longitude: req?.body?.longitude,
                    city: req?.body?.city
                }
            }
        }

        // console.log(newUserData, "newUserData");

        const newUser = await userSchema.create({
            // userName, name, email, phoneNumber, password: hashedPassword, isVerified: true
            ...newUserData
        })
        if (newUser) {
            return UniversalFunction.SendResponse(res, 200, CommonMessages.userSuccessfullyRegistered)
        }
    } catch (error) {
        return UniversalFunction.SendServerError(res, error)
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return UniversalFunction.SendResponse(res, 404, CommonMessages.allFieldsAreMandatory)
        }
        const findUser = await userSchema.findOne({ email }).populate({ path: "interests" })
        if (!findUser) {
            return UniversalFunction.SendResponse(res, 404, CommonMessages.userIsNotRegisteredWithUs)
        }

        if (findUser && (await bcrypt.compare(password, findUser.password))) {
            const accessToken = jwt.sign(
                {
                    user: {
                        username: findUser.userName,
                        email: findUser.email,
                        id: findUser._id,
                        phoneNumber: findUser.phoneNumber,
                        name: findUser.name,
                        profileImage: findUser.profileImage
                    }
                },
                process.env.ACCESS_TOKEN_SECRET
            )
            const getData = JSON.parse(JSON.stringify(findUser))
            delete getData.password
            getData.accessToken = accessToken

            await userSchema.findByIdAndUpdate(getData?._id, {
                accessToken: accessToken
            })
            return UniversalFunction.SendResponse(res, 200, CommonMessages.success, getData)
        } else {
            return UniversalFunction.SendResponse(res, 401, CommonMessages.emailOrPassIncorrect)
        }
    } catch (error) {
        return UniversalFunction.SendServerError(res, error)
    }
}

module.exports = { registerUser, loginUser }