const jwt = require("jsonwebtoken");
const JWT_SECRET = "123456"//require("./node_modules/config");
const { User } = require("../db");
async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    // const words = token.split(".");
    // const jwtToken = words[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded);
        if(await User.find({username: decoded.username})) {
            req.username = decoded.username;
            next();
        } else {
            res.status(403).json({
                message : "You are not authorized!"
            })
        }
    } catch(err) {
        res.json({
            message: "Incorrect inputs!"
        })
    }
}

module.exports = userMiddleware;