//Middleware creation auth,isStudent,isAdmin

const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.auth = (req, res, next) => {
    try {
        //Extract JWT Token
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer", "");

        if (!token || token ===    undefined) {
            return res.status(401).json({
                success: false,
                message: "token Missing"
            })
        }

        //Verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            })
        }
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Something Went worng while verifying"
        })
    }
}


exports.isStudent = (req, res, next) => {
    try {
        if (req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route the token for student"
            })
        }
        next();

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User Role is not matching"
        })
    }
}


exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route the token for admin"
            })
        }
        next();

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User Role is not matching"
        })
    }
}

