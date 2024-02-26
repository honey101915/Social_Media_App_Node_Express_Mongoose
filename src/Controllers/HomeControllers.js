const userSchema = require("../Models/userSchema")
const interestSchema = require("../Models/interestSchema")
const postSchema = require("../Models/postSchema")
const likeSchema = require("../Models/likeSchema")

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
        const { postData } = req.body
        const currentUser = req.user
        const newUser = await userSchema.findById(currentUser?.id)

        let makePost = {
            userId: newUser?._id,
            postData: postData,
        }

        const uploadedPost = await postSchema.create(makePost)

        return UniversalFunction.SendResponse(res, 200, uploadedPost, "Post uploaded successfully")

    } catch (error) {
        return UniversalFunction.SendServerError(res, error)
    }
}

const likePost = async (req, res) => {
    try {
        const { postId } = req.body
        const currentUser = req.user
        const newUser = await userSchema.findById(currentUser?.id)

        const getPostById = await postSchema.findById(postId)

        const _checkIfAlreadtLiked = await postSchema.findOne({
            _id: postId,
            totalLikes: { $in: [newUser?._id] }
        })

        if (_checkIfAlreadtLiked) {
            return UniversalFunction.SendResponse(res, 401, "You have already liked a post")
        }

        getPostById.totalLikes = [
            ...getPostById.totalLikes,
            newUser?._id,
        ]

        await postSchema.findByIdAndUpdate(postId, getPostById)

        let likePost = {
            userId: newUser?._id,
            postId: postId,
        }
        await likeSchema.create(likePost)

        return UniversalFunction.SendResponse(res, 200)

    } catch (error) {
        return UniversalFunction.SendServerError(res, error)
    }
}

module.exports = {
    getAllInterests,
    addPost,
    likePost
}