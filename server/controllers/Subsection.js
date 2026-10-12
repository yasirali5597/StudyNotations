const SubSection = require("../models/subSection")
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUpload");
// const {
//   uploadVideoToCloudinary
// } = require("../utils/imageUploader");
// const { uploadVideoToCloudinary } = require("../utils/imageUpload");



// create Subsections 
exports.createSubSection = async (req, res) => {
  try {
    // Fetch data from req.body
    const {
      sectionId,
      title,
      // timeDuration,
      description,
    } = req.body;

    // Extract video
    const video = req.files?.videoFile;

    // // console.log("BODY:", req.body);
    // // console.log("FILES:", req.files);
    // // console.log("time Ducration:", timeDuration);

    // Validation
    if (!sectionId || !title || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Upload video to Cloudinary
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    console.log("UPLOAD DETAILS:", uploadDetails);

    // Create subsection
    const subsectionDetails = await SubSection.create({
      title: title,
      timeDuration: `${uploadDetails.duration}`,
      description: description,
      videoUrl: uploadDetails.secure_url,
    });

    // Update section
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: {
          subSection: subsectionDetails._id,
        },
      },
      { new: true }
    ).populate("subSection");

    // Response
    return res.status(200).json({
      success: true,
      message: "Sub Section Created successfully",
      updatedSection,
    });

  } catch (error) {
    console.log("CREATE SUBSECTION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

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
