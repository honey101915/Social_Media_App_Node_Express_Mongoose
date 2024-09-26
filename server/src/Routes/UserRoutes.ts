import express from "express";
// const EndPoints = require("../Config/EndPoints");
import UserControllers from "../Controllers/UserControllers"
import validateToken from "../Middlewares/VerifyTokenHandler"

import fs from "fs"
import path from 'path'
import multer from 'multer'

const userRouter = express.Router();

const uploadDirectory = path.resolve(__dirname, '../Files');

// if (!fs.existsSync(uploadDirectory)) {
//     fs.mkdir(uploadDirectory, { recursive: true }, (err) => {
//         if (err) {
//             console.error('Error creating upload directory:', err);
//         } else {
//             console.log('Upload directory created successfully.');
//         }
//     });
// }



const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, uploadDirectory)
    },
    filename: function (req: any, file: any, cb: any) {
        // console.log(file, "filefile")
        const uniqueSuffix = Date.now() + '-' + file?.fieldname
        cb(null, uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

userRouter.route("/update-profile").post(validateToken, UserControllers.updateProfile)
userRouter.route("/delete-profile").delete(validateToken, UserControllers.deleteProfile)
userRouter.route("/logout").get(validateToken, UserControllers.logout)
userRouter.route("/select-interests").post(validateToken, UserControllers.addInterests)
userRouter.route("/upload-profile-pic").post(validateToken, upload.single('fileName'), UserControllers.uploadProfilePic)

export default userRouter;