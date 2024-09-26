import jwt from "jsonwebtoken"

const validateToken = async (req: any, res: any, next: any) => {
    try {
        // const authToken = req.headers.authorization || req.headers.Authorization
        const authToken = req.headers.authorization
        if (authToken) {
            var token = authToken.split(" ")[1]

            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, decoded: any) => {
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
export default validateToken