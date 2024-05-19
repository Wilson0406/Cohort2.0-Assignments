const { User } = require("../db");
async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const username = req.headers.username;
    const password = req.headers.password;
    User.findOne({username: username, password: password})
    .then((value) => {
        if(value){
            next();
        } else {
            res.status(403).json({
                msg: "User not found!"
            })
        }
    });
    // try {
    //     const query = await User.findOne({username: username, password: password});
    //     if(!query) {
    //         return false;
    //     } else {
    //         return true;
    //     }
    // } catch(err) {
    //     console.log(err);
    //     return false;
    // } finally {
    //     next();
    // }
}

module.exports = userMiddleware;