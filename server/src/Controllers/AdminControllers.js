const userSchema = require("./../Models/userSchema")
const UniversalFunction = require("../lib/UniversalFunction")

const getAllUsers = async (req, res) => {
    try {
        const getAllUsers = await userSchema.find({});
        return UniversalFunction.SendResponse(res, 200, "Success", getAllUsers)
    } catch (error) {
        return UniversalFunction.SendServerError(res, error)
    }
}

module.exports = { getAllUsers };