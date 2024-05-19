const jwt = require("jsonwebtoken");
const JWT_SECRET = "123456"//require("./node_modules/config");
const { Admin } = require("../db");
// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    // const words = token.split(".");
    // const jwtToken = words[1];
    console.log(jwtToken);
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded);
        if(await Admin.find({username: decoded.username})) {
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

module.exports = adminMiddleware;