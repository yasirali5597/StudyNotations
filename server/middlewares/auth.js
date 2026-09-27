const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/UserSchema");

// auth
exports.auth = async (req, res,next) => {
  try {
    // extract token
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization")?.replace("Bearer ", "");
    // if token missing then return response
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token is missing",
      });
    }
    // verify the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token is invalid ",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "something went wrong while validating the token  ",
    });
  }
};

// is Student 
exports.isStudent = async(req,res,next) =>{
    try{
        if(req.user.accountType !== "student"){
            return res.status(500).json({
                success:false,
                message: "this is a protected route for student only"
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verifyed , plese try again"
        })
    }
}

// for instructor 
exports.isInstructor = async(req,res,next) =>{
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(500).json({
                success:false,
                message: "this is a protected route for instructor only"
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verifyed , plese try again"
        })
    }
}

exports.isAdmin = async(req,res,next) =>{
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(500).json({
                success:false,
                // message: req.user.accountType,
                accountType: req.user.accountType,
                message: "this is a protected route for isadmin only"
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verifyed , plese try again"
        })
    }
}



