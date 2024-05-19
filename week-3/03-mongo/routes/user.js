const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    await User.create({
        username: username,
        password: password
    })
    res.json({message: 'User created successfully'})
}); 

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const course = await Course.find({});
    res.json({courses: course});
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const id = req.params.courseId;
    console.log(id);
    const username = req.headers.username;
    let course = await User.updateOne({username: username}, {
        $push : {
            purchasedCourses: id
        }
    })
    res.json({message: "Purchase complete!"})
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({username: req.headers.username});
    const course = await Course.find({
        _id : {
            $in : user.purchasedCourses
        }
    })
    res.json({course: course});
});

module.exports = router