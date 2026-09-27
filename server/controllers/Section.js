// const { default: SubSectionModal } = require("../../src/components/core/Dashboard/AddCourse/CourseBuilder/SubSectionModal");
const  Section = require("../models/Section");
const Course = require("../models/course");

exports.createSection = async (req,res) =>{
    try{
        // data fetch 
        const {sectionName , courseId} = req.body;
        // data viladations 
        if(!sectionName , !courseId ) {
            return res.status(400).json({
                success:false,
                message: "data missing "
            })

        }
        // crete sections 
        const newSection = await Section.create({sectionName});
        // update Course with section objectId
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{
                    courseContent:newSection._id,
                }
            },
            {new:true}
        );
        // HW use populate to replace sections / sub-sections both in the updatecourseDetails 
        
        // return response 
        return res.status(200).json({
            success:true, 
            message:"section created successfully ",
            updatedCourseDetails
        })
    }catch(error){
        return res.status(500).json({
            succes:false,
              message: "sections is not crateing successfully, please try again"
        })

    }
}
   // update a sections 
exports.updateSection = async(req,res)=>{
    try{
        // data input 
         const {sectionName , sectionId , courseId} = req.body;
         const section = await Section.findByIdAndUpdate(
            sectionId, 
            {sectionName},
            {new:true},
         )


         const course = await Course.findById(courseId)
         .populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            },
         }).exec();
        // data viladations 
        if(!sectionName , sectionId ) {
            return res.status(400).json({
                success:false,
                message: "data missing "
            })

        }
        // update data 
        // const section = await Section.findByIdAndUpdate(sectionId , {sectionName} , {new:true})
        return res.status(200).json({
            success:true,
            message:section,
            message:"sections updated successfully ", 
            data:course,
        })

    }catch(error){
        console.log("Error updating section " , error);
        return res.status(500).json({
            success:false,
            message:"unable to update the sections parts , plese try again "
        });

    }
}

exports.deleteSection = async(req, res) =>{
        let result = null; 
        const toastId = toast.loading("loading....")
    try {
         
//         const {sectionId }= req.params;
//        // HW -> req.params -> text 
//         // get id 
//         // find the findbyid 
//         await Section.findByIdAndDelete( sectionId)
// // todo [testing ] do we need to delete teh entry from the course schema 


//         return res.status(200).json({
//             success:true,
//             message:"you are successfully deleted the sections"
//         })
//         //


        const {sectionId , courseId } = req.body; 
        await Course.findByIdAndUpdate(courseId, {
            $pull: {
                courseContent: sectionId,
            }
        })

        const section = await Section.findById(sectionId);
        console.log((sectionId , courseId));

        if(!section){
            return res.status(404).json({
                success:false,
                message:"Section not found "
            })
        }

        // delete sub secion 
         await SubSection.deleteMany({_id: {$in: section.subSection}});

         await Section.findByIdAndDelete(sectionId);

         // find the updated course and return 

         const course = await Course.findById(CourseId).populate({
            path:"courseContent",
            populate: {
                path: "subSection"
            }
         })
         .exec();

         res.status(200).json({
            success:true,
            message:"Section deleted ",
            data:course
         })





         
    }catch(error){
        console.error("Error deleting section:", error);
        return res.status(500).json({
            success:false,
            message:"unable to delete the sections parts , plese try again"
        });

    }

}