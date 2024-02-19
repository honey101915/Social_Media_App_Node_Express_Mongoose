const userSchema = require("../Models/userSchema")

const editProfile = async (req, res) => {
    // const filter = { name: req?.user?.name };
    // const update = { name: 59 };
    // const findUser = await userSchema.findOneAndUpdate({ email: req?.user?.email })
    res.status(200).send({ message: "Success" })
}

module.exports = {
    editProfile
}