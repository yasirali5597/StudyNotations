const User = require("../models/UserSchema");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Profile = require("../models/Profile");
const { mailSender } = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");




// exports.sendotp = async (req, res) => {
//   try {
//     const { email } = req.body

//     // Check if user is already present
//     // Find user with provided email
//     const checkUserPresent = await User.findOne({ email })
//     // to be used in case of signup

//     // If user found with provided email
//     if (checkUserPresent) {
//       // Return 401 Unauthorized status code with error message
//       return res.status(401).json({
//         success: false,
//         message: `User is Already Registered`,
//       })
//     }

//     var otp = otpGenerator.generate(6, {
//       upperCaseAlphabets: false,
//       lowerCaseAlphabets: false,
//       specialChars: false,
//     })
//     const result = await OTP.findOne({ otp: otp })
//     console.log("Result is Generate OTP Func")
//     console.log("OTP", otp)
//     console.log("Result", result)
//     while (result) {
//       otp = otpGenerator.generate(6, {
//         upperCaseAlphabets: false,
//       })
//     }
//     const otpPayload = { email, otp }
//     const otpBody = await OTP.create(otpPayload)
//     console.log("OTP Body", otpBody)
//     res.status(200).json({
//       success: true,
//       message: `OTP Sent Successfully`,
//       otp,
//     })
//   } catch (error) {
//     console.log(error.message)
//     return res.status(500).json({ success: false, error: error.message })
//   }
// }

// Sign up code


exports.signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    // Further logic for sign-up can be added here
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !accountType ||
      !otp
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        otp: otp,
      });
    }

    if (password !== confirmPassword) {
      res.status(400).json({
        success: false,
        message: "password and confirm password donot match",
      });
    }
    const exitingUser = await User.findOne({ email });
    if (exitingUser) {
      return res.status(400).json({
        success: false,
        message: " User is already registerd   please sign in to continue",
      });
    }

    // find most recent otp stored for the user
    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log(recentOtp);

    if (recentOtp.length == 0) {
      // otp not found
      return res.status(400).json({
        success: false,
        message: " otp not  found ",
      });
    } else if (otp !== recentOtp[0].otp) {
      // invalid otp
      return res.status(400).json({
        success: false,
        message: "invalid otp ",
      });
    }
    // hash password
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: "https://api.dicebear.com/5.x/initials/svg?seed=Yasir Ali",
    });

    // retunr res
    return res.status(200).json({
      success: true,
      message: "User is registered successfully ",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// login pages

exports.login = async (req, res) => {
  try {
    // get data fron req, body
    const { email, password } = req.body;
    // validation data
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required , please try again ",
      });
    }
    //user check exits or not
    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user is not registered , please signup first ",
      });
    }
    // generate jwt after password mactching
    // console.log("USER => ", user);
    console.log("PASSWORD => ", user.password);
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      // save token to user document in db
      user.token = token;
      user.password = undefined;
      // create cookies and send response
      const options = {
        // expiresIn : new Date(Date.now() + 3*24*60*60*1000),
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Lpgged in successfully ",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "password is incorrect , please try again ",
      });
    }

    // create cookies and send response
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      // message:"login failer , please try again " ,
      message: error.message,
    });
  }
};

// Controller for Changing Password
exports.changePassword = async (req, res) => {
  try {
    // Get user data from req.user
    const userDetails = await User.findById(req.user.id);

    // Get old password, new password, and confirm new password from req.body
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    // Validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password,
    );
    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" });
    }

    // Match new password and confirm new password
    if (newPassword !== confirmNewPassword) {
      // If new password and confirm new password do not match, return a 400 (Bad Request) error
      return res.status(400).json({
        success: false,
        message: "The password and confirm password does not match",
      });
    }

    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true },
    );

    // Send notification email
    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        passwordUpdated(
          updatedUserDetails.email,
          `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`,
        ),
      );
      console.log("Email sent successfully:", emailResponse.response);
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      });
    }

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    });
  }
};





// const { mailSender } = require("../utils/mailSender");
// const emailTemplate = require("../mail/templates/emailVerificationTemplate");

exports.sendotp = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user is already present
    const checkUserPresent = await User.findOne({ email });

    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: `User is Already Registered`,
      });
    }

    // Generate OTP
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // Check OTP
    let result = await OTP.findOne({ otp: otp });

    console.log("Result is Generate OTP Func");
    console.log("OTP:", otp);
    console.log("Result:", result);

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      result = await OTP.findOne({ otp: otp });
    }

    // Save OTP
    const otpPayload = {
      email,
      otp,
    };

    const otpBody = await OTP.create(otpPayload);

    console.log("OTP Body:", otpBody);

    // ⭐ SEND EMAIL HERE
    const emailResponse = await mailSender(
      email,
      "OTP Verification",
      emailTemplate(otp)
    );

    console.log("EMAIL RESPONSE:", emailResponse);

    // Send response only after email is successfully sent
    return res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
    });

  } catch (error) {
    console.log("SEND OTP ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
