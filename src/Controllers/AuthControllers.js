const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../Models/userSchema");
const {
    allFieldsAreMandatory,
    emailAlreadyRegistered,
    userSuccessfullyRegistered,
    somethingWentWrong,
    userNameAlreadyRegistered,
    userIsNotRegisteredWithUs,
    emailOrPassIncorrect
} = require("../Constants/en");


const registerUser = async (req, res) => {
    try {
        const { userName, name, email, password, phoneNumber } = req.body;
        if (!userName || !name || !email || !password || !phoneNumber) {
            res.status(404).send({ statucCode: 404, message: allFieldsAreMandatory })
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
            userName, name, email, phoneNumber, password: hashedPassword, isVerified: true
        })
        if (newUser) {
            res.status(200).send({ message: userSuccessfullyRegistered })
        }
    } catch (error) {
        res.status(500).send({ message: somethingWentWrong })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).send({ message: allFieldsAreMandatory });
        }
        const findUser = await userSchema.findOne({ email })
        if (!findUser) {
            return res.status(404).send({ message: userIsNotRegisteredWithUs })
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

            return res.send({ data: getData, status: true })
        } else {
            return res.status(401).send({ message: emailOrPassIncorrect })
        }
    } catch (error) {
        res.status(500).end({ message: somethingWentWrong })
    }
}

module.exports = { registerUser, loginUser }