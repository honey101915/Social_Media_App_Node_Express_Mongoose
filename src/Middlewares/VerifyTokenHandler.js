const jwt = require("jsonwebtoken")

const validateToken = async (req, res, next) => {
    try {
        const authToken = req.headers.authorization || req.headers.Authorization
        if (authToken) {
            var token = authToken.split(" ")[1]

            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    res.status(401).send({ message: "Unauthorized user" })
                }
                req.user = decoded.user;
                next();
            })
        } else {
            res.status(401).send({ message: "Token is required for authorization" })
        }
    } catch (error) {
        res.status(401).send({ message: "Unauthorized erroruser" })
    }
}
module.exports = validateToken