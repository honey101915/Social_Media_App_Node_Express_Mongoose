const userSchema = require("../Models/userSchema");
const bcrypt = require("bcrypt");

const {
    allFieldsAreMandatory,
    emailAlreadyRegistered,
    userSuccessfullyRegistered,
    somethingWentWrong,
    userNameAlreadyRegistered,
    userIsNotRegisteredWithUs
} = require("../Constants/en");

const registerUser = async (req, res) => {
    try {
        const { userName, name, email, password, phoneNumber } = req.body;
        if (!userName || !name || !email || !password || !phoneNumber) {
            res.status(404).send({ message: allFieldsAreMandatory })
            return;
        }
        const findUserWithEmail = await userSchema.findOne({ email })
        if (findUserWithEmail) {
            res.status(400).send({ message: emailAlreadyRegistered })
            return;
        }
        const findUserWithUserName = await userSchema.findOne({ userName })
        if (findUserWithUserName) {
            res.status(400).send({ message: userNameAlreadyRegistered })
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await userSchema.create({
            userName, name, email, phoneNumber, password: hashedPassword
        })
        if (newUser) {
            res.status(200).send({ message: userSuccessfullyRegistered })
        }
    } catch (error) {
        res.status(500).end({ message: somethingWentWrong })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(404).send({ message: allFieldsAreMandatory })
        }
        const findUser = await userSchema.findOne({ email })
        if (!findUser) {
            res.status(404).send({ message: userIsNotRegisteredWithUs })
        }

    } catch (error) {
        res.status(500).end({ message: "Something went wrong" })
    }
}

module.exports = { registerUser, loginUser }