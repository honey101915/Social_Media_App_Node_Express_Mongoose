const userSchema = require("./../Models/userSchema")

const getAllUsers = async (req, res) => {
    // console.log(req.user, "reqreqreqreqreqreqreq");
    const getAllUsers = await userSchema.find({});
    console.log(getAllUsers, "XXXXXXXXXXXX")

    res.status(200).send({ data: getAllUsers, message: "Success" })
}

module.exports = { getAllUsers };