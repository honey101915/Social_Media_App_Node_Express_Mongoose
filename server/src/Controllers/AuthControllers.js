const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = require("../Models/userSchema");
const languageSchema = require("../Models/languagesSchema")

const UniversalFunction = require("../lib/UniversalFunction")
const CommonMessages = require("../Constants/en")

const registerUser = async (req, res) => {
    try {

        var userName = String(req.body?.userName || "").toLocaleLowerCase();
        var name = String(req.body?.name || "");
        var email = String(req.body?.email || "").toLocaleLowerCase();
        var password = String(req.body?.password || "");
        var phoneNumber = String(req.body?.phoneNumber || "");

        var dob = String(req.body?.phoneNumber || "");
        var age = String(req.body?.age || "");
        var gender = String(req.body?.gender || "");
        var profession = String(req.body?.profession || "");
        var about = String(req.body?.about || "");

        var myInterests = req.body?.interests || [];
        var myPrefLang = req.body?.preferredLanguages || [];

        if (userName.trim() === '') {
            UniversalFunction.SendResponse(res, 404, "Username is required")
            return;
        } else if (name.trim() === '') {
            UniversalFunction.SendResponse(res, 404, "Name is required")
            return;
        } else if (email.trim() === '') {
            UniversalFunction.SendResponse(res, 404, "Email is required")
            return;
        } else if (password.trim() === '' || password.trim().length < 6) {
            UniversalFunction.SendResponse(res, 404, "Password is required of 6 digits")
            return;
        } else if (phoneNumber.trim() === '') {
            UniversalFunction.SendResponse(res, 404, "Phone number is required")
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
        // console.log(hashedPassword, "hashedPassword");


        var newUserData = {
            userName,
            name,
            email,
            phoneNumber,
            password: hashedPassword,
            dob,
            age,
            gender,
            profession,
            about,
            isVerified: true,
            interests: myInterests,
            preferredLanguages: myPrefLang
        }
        console.log(newUserData, "newUserDatanewUserData", req.body);

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
    console.log(req.body, "XXXX");

    try {
        var email = String(req.body?.email || "");
        var password = String(req.body?.password || "");

        if (email.trim() === '') {
            UniversalFunction.SendResponse(res, 404, "Email is required")
            return;
        } else if (password.trim() === '' || password.trim().length < 6) {
            UniversalFunction.SendResponse(res, 404, "Password is required of 6 digits")
            return;
        }


        // const findUser = await userSchema.findOne({ email }).populate([{
        //     path: 'interests',
        //     model: 'interests'
        // }, {
        //     path: 'preferredLanguages',
        //     model: 'languages'
        // }])

        // var findUser = await userSchema.aggregate([
        //     {
        //         $match: { email }
        //     },
        //     {
        //         $lookup: {
        //             from: "interests",
        //             localField: "interests",
        //             foreignField: "_id",
        //             as: "interests"
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: "languages",
        //             localField: "preferredLanguages",
        //             foreignField: "_id",
        //             as: "preferredLanguages"
        //         }
        //     }
        // ])


        let findUser = await userSchema.aggregate([
            {
                $match: { email }
            },
            {
                $lookup: {
                    from: "interests", // from which table
                    let: { interests: "$interests" }, // this is local field
                    pipeline: [
                        {
                            $match: {
                                $expr: { $in: ["$_id", "$$interests"] }
                            }
                        },
                        // {
                        //     $project: { name: 1 } // if you want only name
                        // }
                    ],
                    // localField: "interests",
                    // foreignField: "_id",
                    as: "interests"
                }
            },
            // {
            //     $unwind: {
            //         path: "$interests", // inn case of single element to convert to object

            //     }
            // },

            {
                $lookup: {
                    from: "languages",
                    localField: "preferredLanguages",
                    foreignField: "_id",
                    as: "preferredLanguages"
                }
            }
        ])

        console.log(findUser, "findUserfindUserfindUserfindUser");
        findUser = findUser[0]
        if (!findUser) {
            return UniversalFunction.SendResponse(res, 404, CommonMessages.userIsNotRegisteredWithUs)
        }

        if (findUser && (await bcrypt.compare(password, findUser?.password))) {
            const accessToken = jwt.sign(
                {
                    user: {
                        username: findUser?.userName,
                        email: findUser?.email,
                        _id: findUser?._id,
                        phoneNumber: findUser?.phoneNumber,
                        name: findUser?.name,
                        profileImage: findUser?.profileImage
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
        console.log(error, "errorerrorerror");
        return UniversalFunction.SendServerError(res, error)
    }
}

const getAllLanguages = async (req, res) => {
    try {
        const allLanguages = await languageSchema.find().sort({ name: 1 });
        if (Array.isArray(allLanguages)) {
            return UniversalFunction.SendResponse(res, 200, CommonMessages.success, allLanguages)
        }
    } catch (error) {
        return UniversalFunction.SendServerError(res, error)
    }

}

module.exports = { registerUser, loginUser, getAllLanguages }