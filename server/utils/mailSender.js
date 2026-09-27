const emailTemplate = require("../mail/templates/emailVerificationTemplate");
const nodemailer = require("nodemailer"); 


const mailSender = async (email , title, body) => {
    try{
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST, 
            auth: {
                user: process.env.MAIL_USER, 
                pass: process.env.MAIL_PASS,
            }
        })

        let info = await transporter.sendMail({
            // from: 'studyNotation || CodeHelp-by Yasir Ali',
            from: `"StudyNotation | CodeHelp by Yasir Ali" <${process.env.MAIL_USER}>`,
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        })

         console.log( "this is info " , info); 
        // console.log("this is a info to the mail sender " , info);
        // console.log("this is a info to the mail sender " , info.messageId);

        return info;

    }catch(error){
        console.log("Error in mail sender3333", error);
        // throw error;
    }
}


module.exports = { mailSender };








// const nodemailer = require("nodemailer");

// const mailSender = async (email, title, body) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             host: process.env.MAIL_HOST,
//             port: 587,
//             secure: false,
//             auth: {
//                 user: process.env.MAIL_USER,
//                 pass: process.env.MAIL_PASS,
//             },
//         });

//         const info = await transporter.sendMail({
//             from: `"StudyNotation | CodeHelp by Yasir Ali" <${process.env.MAIL_USER}>`,
//             to: email,
//             subject: title,
//             html: body,
//         });

//         console.log("THIS IS INFO:", info);
//         console.log("MESSAGE ID:", info.messageId);

//         return info;

//     } catch (error) {
//         console.log("ERROR IN MAIL SENDER:", error);

//         throw error;   // ⭐ important
//     }
// };

// module.exports = { mailSender };
