import jwt from "jsonwebtoken"

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        return res.status(401).json({
            message: "Authentication Token required"
        });
    }

    jwt.verify(token, "paperStore123", (e, user) => {
        if (e) {
            return res.status(403).json(e, {
                message: "Your token has been expired"
            });
        }
        req.user = user;
        next();
    });
}


export default authenticateToken;