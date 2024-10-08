// Importing dependencies using ES6 modules
import bcrypt from 'bcrypt';

// Importing schemas
import collegesSchema from '../Models/collegesSchema';
import languageSchema from '../Models/languagesSchema';
import otpSchema from "../Models/otpSchema";
import schoolSchema from '../Models/schoolSchema';
import userSchema from '../Models/userSchema';

// Importing utility functions and constants
import CommonMessages from '../Constants/en';
import UniversalFunction from '../lib/UniversalFunction';
import { generateToken } from 'src/Middlewares/VerifyTokenHandler';

const registerUser = async (req: any, res: any) => {
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


        var newUserData: any = {
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
        return;
    } catch (error) {
        return UniversalFunction.SendServerError(res, error)
    }
}

const loginUser = async (req: any, res: any) => {
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


        let findUser: any = await userSchema.aggregate([
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
            {
                $lookup: {
                    from: "schools",
                    let: { school: "$school" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$_id", "$$school"]
                                }
                            }
                        }
                    ],
                    as: "school",
                },
            },
            {
                $unwind: {
                    path: "$school",
                    preserveNullAndEmptyArrays: true
                }
            },
            //// With Pipeline
            {
                $lookup: {
                    from: "colleges",
                    let: { college: "$college" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$_id", "$$college"]
                                }
                            }
                        }
                    ],
                    as: "college"
                }
            },
            {
                $unwind: {
                    path: "$college",
                    preserveNullAndEmptyArrays: true
                }
            },
            //// With Lookup
            // {
            //     $lookup: {
            //         from: "colleges",
            //         localField: "college",
            //         foreignField: "_id",
            //         as: "college"
            //     }
            // },
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
            },

        ])

        console.log(findUser, "findUserfindUserfindUserfindUser");
        findUser = findUser?.[0] || []
        if (!findUser) {
            return UniversalFunction.SendResponse(res, 404, CommonMessages.userIsNotRegisteredWithUs)
        }



        if (findUser && (await bcrypt.compare(password, findUser?.password))) {
            const accessToken = generateToken(findUser)
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

const getAllLanguages = async (req: any, res: any) => {
    try {
        const allLanguages = await languageSchema.find().sort({ name: 1 });
        if (Array.isArray(allLanguages)) {
            return UniversalFunction.SendResponse(res, 200, CommonMessages.success, allLanguages)
        } else {
            return UniversalFunction.SendResponse(res, 200, CommonMessages.success, [])
        }
    } catch (error) {
        return UniversalFunction.SendServerError(res, error)
    }
}

const getAllColleges = async (req: any, res: any) => {
    try {
        const { page = 1, limit = 10, search = "" } = req.query;

        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        let filter: any = {}
        if (search) {
            filter.university = {
                $regex: search,
                $options: 'i'
            }
        }
        const allColleges = await collegesSchema.find(filter)
            .limit(limitNumber)
            .skip((pageNumber - 1) * limitNumber)
            .sort({ _id: -1 })
        const totalRecords = await collegesSchema.countDocuments(filter)
        let response = {
            data: allColleges,
            currentPage: page,
            totalRecords,
            limit,
            totalPages: parseInt(totalRecords / limit as any, 10)
        }
        return UniversalFunction.SendResponse(res, 200, CommonMessages.success, response)
    } catch (error) {
        return UniversalFunction.SendServerError(res, error)
    }
}

const getAllSchools = async (req: any, res: any) => {
    try {
        const { page = 1, limit = 10, search = "" } = req.query;

        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        let filter: any = {}
        if (search) {
            filter.name = {
                $regex: search,
                $options: 'i'
            }
        }
        const allSchools = await schoolSchema.find(filter)
            .limit(limitNumber)
            .skip((pageNumber - 1) * limitNumber)
            .sort({ _id: -1 })
        const totalRecords: any = await schoolSchema.countDocuments(filter)
        let response: any = {
            data: allSchools,
            currentPage: page,
            totalRecords,
            limit,
            totalPages: parseInt(totalRecords / limit as any, 10)
        }
        return UniversalFunction.SendResponse(res, 200, CommonMessages.success, response)
    } catch (error) {
        return UniversalFunction.SendServerError(res, error)
    }
}

const generateOtp = async (req: any, res: any) => {
    try {

        var email = String(req.body?.email || "");

        if (email.trim() === '') {
            UniversalFunction.SendResponse(res, 404, "Email is required")
            return;
        }

        const _findUser: any = await userSchema.find({ email: email })

        if (Array.isArray(_findUser) && _findUser.length === 0) {
            return UniversalFunction.SendResponse(res, 404, "User not found with this email : " + email)
        }

        const otp = Math.floor(100000 + Math.random() * 900000)

        const otpObj: any = {
            otp: 123456 || otp,
            userId: _findUser?.[0]?._id,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000)
        }

        const _lastOtp = await otpSchema.find({
            userId: _findUser?.[0]?._id,
        })

        if (Array.isArray(_lastOtp) && _lastOtp.length != 0) {
            await otpSchema.findByIdAndUpdate(_lastOtp[0]._id, otpObj, { new: true });
            return UniversalFunction.SendResponse(res, 200, "OTP sent successfully", otpObj);
        } else {
            const _generate = await otpSchema.create(otpObj)
            if (_generate) {
                return UniversalFunction.SendResponse(res, 200, "OTP sent successfully", _generate)
            }
        }

        return UniversalFunction.SendResponse(res, 400, "Failed to generate otp")
    } catch (error) {
        return UniversalFunction.SendServerError(res, error)
    }
}

const verifyOtp = async (req: any, res: any) => {
    try {
        var email = String(req.body?.email || "");
        var otp = String(req.body?.otp || "");
        if (email.trim() === '') {
            UniversalFunction.SendResponse(res, 404, "Email is required")
            return;
        } else if (otp.trim() === "") {
            UniversalFunction.SendResponse(res, 404, "OTP is required")
            return;
        } else if (otp.length != 6) {
            UniversalFunction.SendResponse(res, 404, "OTP of 6 digits is required")
            return;
        }

        const _findUser: any = await userSchema.find({ email: email })
        if (Array.isArray(_findUser) && _findUser.length === 0) {
            return UniversalFunction.SendResponse(res, 404, "User not found with this email : " + email)
        }

        const _findOtp = await otpSchema.find({
            userId: _findUser?.[0]?._id
        })

        if (Array.isArray(_findOtp) && _findOtp.length != 0) {
            if (_findOtp[0]?.otp == otp) {
                // await otpSchema.findByIdAndDelete(_findOtp[0]?._id)

                var _findUserDetails: any = await userSchema.aggregate([
                    {
                        $match: { email }
                    },
                    {
                        $lookup: {
                            from: "interests",
                            let: { interests: "$interests" },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $in: ["$_id", "$$interests"]
                                        }
                                    }
                                }
                            ],
                            as: "interests"
                        }
                    },
                    {
                        $unwind: {
                            path: "$interests",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $lookup: {
                            from: "college",
                            let: { college: "$college" },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $eq: ["$_id", "$$college"]
                                        }
                                    }
                                }
                            ],
                            as: "college"
                        }
                    },
                    {
                        $unwind: {
                            path: "$college",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $lookup: {
                            from: "schools",
                            let: { school: "$school" },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $eq: ["$_id", "$$school"]
                                        }
                                    }
                                }
                            ],
                            as: "school"
                        }
                    },
                    {
                        $unwind: {
                            path: "$school",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $lookup: {
                            from: "languages",
                            localField: "preferredLanguages",
                            foreignField: "_id",
                            as: "preferredLanguages"
                        }
                    }
                ])

                _findUserDetails = _findUserDetails?.[0] || []
                if (!_findUserDetails) {
                    return UniversalFunction.SendResponse(res, 404, CommonMessages.userIsNotRegisteredWithUs)
                }
                const accessToken = generateToken(_findUserDetails)
                const getData = JSON.parse(JSON.stringify(_findUserDetails))
                delete getData.password
                getData.accessToken = accessToken

                await userSchema.findByIdAndUpdate(getData?._id, {
                    accessToken: accessToken
                })
                return UniversalFunction.SendResponse(res, 200, "OTP verified successfully with token", getData)

            } else {
                return UniversalFunction.SendResponse(res, 404, "Invalid OTP")
            }
        } else {
            return UniversalFunction.SendResponse(res, 404, "It seems like you have not sent any OTP yet.")
        }

    } catch (error) {
        return UniversalFunction.SendServerError(res, error)
    }
}

export default {
    registerUser,
    loginUser,
    getAllLanguages,
    getAllColleges,
    getAllSchools,
    generateOtp,
    verifyOtp
}

