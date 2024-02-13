exports.registerUser = async (req, res) => {
    try {
        res.status(200).send({ message: "Register success" })
    } catch (error) {
        res.status(500).end({ message: "Something went wrong" })
    }
}

exports.loginUser = async (req, res) => {
    try {
        res.status(200).send({ message: "Login success" })
    } catch (error) {
        res.status(500).end({ message: "Something went wrong" })
    }
}
