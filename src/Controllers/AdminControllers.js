const getAllUsers = (req, res) => {
    console.log(req.user, "reqreqreqreqreqreqreq");
    res.status(200).send({ data: req.user, message: "Success" })
}

module.exports = { getAllUsers };