const express = require("express");
const EndPoints = require("../Config/EndPoints");
const UserControllers = require("../Controllers/UserControllers")
const validateToken = require("../Middlewares/VerifyTokenHandler")

const fs = require('fs');
const path = require('path');

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

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory)
    },
    filename: function (req, file, cb) {
        // console.log(file, "filefile")
        const uniqueSuffix = Date.now() + '-' + file?.fieldname
        cb(null, uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

userRouter.route("/update-profile").post(validateToken, UserControllers.updateProfile)
userRouter.route("/delete-profile").delete(validateToken, UserControllers.deleteProfile)
userRouter.route("/logout").post(validateToken, UserControllers.logout)
userRouter.route("/select-interests").post(validateToken, UserControllers.addInterests)
userRouter.route("/upload-profile-pic").post(validateToken, upload.single('fileName'), UserControllers.uploadProfilePic)

module.exports = userRouter;