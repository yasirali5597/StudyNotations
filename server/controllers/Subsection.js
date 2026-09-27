const Subsection = require("../models/subSection")
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUpload");

// create Subsections 
exports.createSubSection = async(req,res)=>{
    try{
        // fetch data from req body
        const {sectionId  , title , timeDuration } = req.body;
        // extract file / video
        const video = req.files.videoFile;
        //validations 
        if(!sectionId || !title || !timeDuration || !video){
            return res.status(400).json({
                success:false,
                message:"all fields are required "
            });
    }

    // upload video to cloudinary 
    const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
    console.log(uploadDetails)
    // create a sub-sections 
    const SubsectionDetails = await Subsection({
        title : title , 
        timeDuration: `${uploadDetails.duration}`,
        description: description,
        videoUrl: uploadDetails.secure_url,
    })
    // update section with this sub section objects 
    const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
        {$push:{
            Subsection:SubsectionDetails._id,
        }
    },
        {new: true}).populate("subsection")
        // HW : log updated with sub section object id
    // return response
    return res.status(500).json({
        success: false,
        message:"Sub Section Created successfuly" , 
        updatedSection,

    })


}catch(error){
return res.status(500).json({
    success:false,
   message:" internal server error ",
   error: error.message 
   
   
})
}
}

//HW :  update subsection and delete subsections  dono kernan hai 


  exports.updateSubSection = async (req, res) => {
    try {
      const { sectionId,subSectionId,  title, description } = req.body
      const subSection = await SubSection.findById(subSectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save()
      const updateSection = await Section.findById(sectionId).populate("subSection")

  
      return res.json({
        success: true,
        data: updateSection,
        message: "Section updated successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
  }
  
  exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }

      const updateSection = await Section.findById(sectionId).populate("subSection")
  
      return res.json({
        success: true,
        data: updateSection,
        message: "SubSection deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }
