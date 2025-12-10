// const User = require("../model/UserModel");
// require("dotenv").config();
// const jwt = require("jsonwebtoken");

// module.exports.userVerification = (req, res) => {
//     const token = req.cookies.token;
//     if (!token) {
//         return res.json({ status: false, message: "No token provided" });
//     }
//     jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
//         if (err) {
//             return res.json({ status: false, message: "Invalid token" });
//         } else {
//             const user = await User.findById(data.id);
//             if (user) {
//                 return res.json({
//                     status: true,
//                     user: {
//                         id: user._id,
//                         email: user.email,
//                         displayName: user.displayName
//                     }
//                 });
//             } else {
//                 return res.json({ status: false, message: "User not found" });
//             }
//         }
//     });
// };



const User = require("../model/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
    // 1. TRY TO GET TOKEN FROM HEADER FIRST (The new way)
    let token;
    const authHeader = req.headers['authorization'];
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1]; // Remove "Bearer " to get just the token
    } 
    // 2. FALLBACK TO COOKIES (The old way - optional but good for safety)
    else if (req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.json({ status: false, message: "No token provided" });
    }

    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            return res.json({ status: false, message: "Invalid token" });
        } else {
            const user = await User.findById(data.id);
            if (user) {
                return res.json({
                    status: true,
                    user: {
                        id: user._id,
                        email: user.email,
                        displayName: user.displayName
                    }
                });
            } else {
                return res.json({ status: false, message: "User not found" });
            }
        }
    });
};