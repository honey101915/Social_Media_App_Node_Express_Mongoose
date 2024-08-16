const userSchema = require("../Models/userSchema")
const interestSchema = require("../Models/interestSchema")
const postSchema = require("../Models/postSchema")
const likeSchema = require("../Models/likeSchema")
const mediaFileSchema = require("../Models/mediaFileSchema")

const UniversalFunction = require("../lib/UniversalFunction")
const CommonMessages = require("../Constants/en")

const getAllInterests = async (req, res) => {
    try {
        const allInterests = await interestSchema.find();
        if (allInterests) {
            return UniversalFunction.SendResponse(res, 200, "Success", allInterests)
        } else {
            return UniversalFunction.SendResponse(res, 401, "We could'nt find any interests.")
        }
    } catch (error) {
        return UniversalFunction.SendServerError(res, error)
    }
}

const addPost = async (req, res) => {
    try {

        var caption = String(req.body?.caption || "");
        var mediaFile = String(req.body?.mediaFile || "");

        if (caption.trim() === '') {
            UniversalFunction.SendResponse(res, 404, "Caption is required")
            return;
        } else if (mediaFile.trim() === '') {
            UniversalFunction.SendResponse(res, 404, "Media file is required")
            return;
        }

        const currentUser = req?.user

        console.log(currentUser, "currentUser");

        const _findUser = await userSchema.findById(currentUser?._id)

        if (!_findUser) {
            return UniversalFunction.SendResponse(res, 404, "User not found");
        }

        let makePost = {
            userId: _findUser?._id,
            caption: caption,
            fileUrl: mediaFile
        }

        const uploadedPost = await postSchema.create({ ...makePost })

        return UniversalFunction.SendResponse(res, 200, uploadedPost, "Post uploaded successfully")

    } catch (error) {
        console.log(error, "errororororo");
        return UniversalFunction.SendServerError(res, error)
    }
}

const likePost = async (req, res) => {
    try {
        const { postId } = req.body
        const currentUser = req.user
        const _currentLoggedInUser = await userSchema.findById(currentUser?._id)

        const getPostById = await postSchema.findOne({ _id: postId })
        if (!getPostById) {
            return UniversalFunction.SendResponse(res, 401, `Invalid post id or could'nt find post with the id ${postId}`)
        }

        const _checkIfAlreadyLiked = await postSchema.findOne({
            _id: postId,
            totalLikes: { $in: [_currentLoggedInUser?._id] }
        })

        if (_checkIfAlreadyLiked) {
            return UniversalFunction.SendResponse(res, 200, "Success, you have already liked a post", getPostById)
        }

        getPostById.totalLikes = [
            ...getPostById.totalLikes,
            _currentLoggedInUser?._id,
        ]

        let likePost = {
            userId: _currentLoggedInUser?._id,
            postId: postId,
        }

        await postSchema.findByIdAndUpdate(postId, getPostById)
        await likeSchema.create(likePost)

        return UniversalFunction.SendResponse(res, 200, "Post liked successfully.", getPostById)

    } catch (error) {
        return UniversalFunction.SendServerError(res, error)
    }
}

const dislikePost = async (req, res) => {
    try {
        const { postId } = req.body
        const currentUser = req.user
        const _currentLoggedInUser = await userSchema.findById(currentUser?.id)

        const getPostById = await postSchema.findOne({ _id: postId })
        if (!getPostById) {
            return UniversalFunction.SendResponse(res, 401, `Invalid post id or could'nt find post with the id ${postId}`)
        }

        const _checkIfLiked = await postSchema.findOne({
            _id: postId,
            totalLikes: { $in: [_currentLoggedInUser?._id] }
        })

        if (!_checkIfLiked) {
            return UniversalFunction.SendResponse(res, 200, "Success, you have not liked a post", getPostById)
        }

        // remove from post collection
        await postSchema.updateOne({
            _id: postId,
            $pull: { totalLikes: _currentLoggedInUser?._id }
        })

        // remove from like collection
        await likeSchema.deleteOne({
            userId: _currentLoggedInUser?._id,
            postId: postId
        })

        return UniversalFunction.SendResponse(res, 200, "Post disliked successfully.")
    } catch (error) {
        return UniversalFunction.SendServerError(res, error)
    }
}

const getAllPosts = async (req, res) => {

    try {
        if (req?.query?.type === "USER_DETAILS") {
            const requestedUserId = req.query._id;
            if (!requestedUserId) {
                return UniversalFunction.SendResponse(res, 400, "User ID is required");
            }
            const _allPosts = await postSchema.find({
                userId: requestedUserId
            })
            return UniversalFunction.SendResponse(res, 200, "Success", _allPosts)
        } else {
            const _allPosts = await postSchema.find()

            // const excludeUserId = req.user._id;
            // const _allPosts = excludeUserId
            //     ? await postSchema.find({
            //         userId: { $ne: excludeUserId }
            //     })
            //     : await postSchema.find();

            return UniversalFunction.SendResponse(res, 200, "Success", _allPosts)
        }
    } catch (error) {
        return UniversalFunction.SendServerError(res, error)
    }

}

const getUserDetails = async (req, res) => {
    try {
        const userId = req.query._id;
        if (!userId) {
            return UniversalFunction.SendResponse(res, 400, "User ID is required");
        }
        const _findUser = await userSchema.findById(userId, {
            accessToken: 0,
            password: 0,
            fcmToken: 0
        });
        if (!_findUser) {
            return UniversalFunction.SendResponse(res, 404, "User not found");
        }
        return UniversalFunction.SendResponse(res, 200, "Success", _findUser);
    } catch (error) {
        console.error("Error in getUserDetails:", error);
        return UniversalFunction.SendServerError(res, error);
    }
}

module.exports = {
    getAllInterests,
    addPost,
    likePost,
    getAllPosts,
    dislikePost,
    getUserDetails
}