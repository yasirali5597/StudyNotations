const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema({
        courseName: {
            type: String,
        },
        courseDescription: {
            // type: mongoose.Schema.Types.ObjectId,
             type: String,
            ref: "User",
            required: true
        },
        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User" , 
        },
        whatyouWillLearn: {
            type: String,
        },
        courseContent: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Section",
                required: true
            }
        ],
        ratingAndreviews: [
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref: "RatingAndReview"
            }
        ],
        price: {
           type: Number,
        },
        thumbnail: {
            type: String, 
        },
        tag: {
            type: [String],
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            // required true,
            ref: "Category"
        },
        studentsEnrolled: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref:"User" ,
            required: true
        }], 
        instructions: {
            type: String,
        },
        status: {
            type: String,
            enum: ["Draft" , "Published", "Unpublished"  ] ,
        }
}); 

module.exports = mongoose.model("Course" ,courseSchema )