const Course = require("../models/course");
// const Category = require("../models/Category");
const User = require("../models/UserSchema");
const Category = require("../models/Category");
const { uploadImageToCloudinary } = require("../utils/imageUpload");

// crate Course handler function
exports.createCourse = async (req, res) => {
  try {
    // fetch data
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
      status,
      // /instructor,
    } = req.body;
    // get thumbnail
    // const thumbnail = req.files.thumbnailImage;
    const thumbnail = req.files?.thumbnailImage;
    // validations
    console.log({
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
      status,
      // instructor,
    });
    // if (
    //   !courseName ||
    //   !courseDescription ||
    //   !whatYouWillLearn ||
    //   !price ||
    //   !tag ||
    //   !category ||
    //   !status ||
    //   !instructor
    // ) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "All fields are required ",
    //   });
    // }

    if (!courseName) {
      return res.status(400).json({
        success: false,
        message: "courseName is missing",
      });
    }

    if (!courseDescription) {
      return res.status(400).json({
        success: false,
        message: "courseDescription is missing",
      });
    }

    if (!whatYouWillLearn) {
      return res.status(400).json({
        success: false,
        message: "whatYouWillLearn is missing",
      });
    }

    if (!price) {
      return res.status(400).json({
        success: false,
        message: "price is missing",
      });
    }

    if (!tag) {
      return res.status(400).json({
        success: false,
        message: "tag is missing",
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "category is missing",
      });
    }

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "status is missing",
      });
    }

    // if (!instructor) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "instructor is missing",
    //   });
    // }

    // check for instructure
    const userid = req.user.id;
    const instructorDetails = await User.findById(userid);
    console.log("instructor details ", instructorDetails);
    console.log("api secret ", process.env.api_secret);

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "instructor details not found ",
      });
    }

    // check given tag is valid or not
    console.log("CATEGORY VALUE: Before", category);

    const CategoryDetails = await Category.findById(category);
    console.log("CATEGORY VALUE: After", CategoryDetails);
    if (!CategoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category details not found ",
      });
    }
    // upload image to  cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME,
    );
    if (!thumbnailImage) {
      return res.status(500).json({
        success: false,
        message: "Thumbnail upload failed",
      });
    }

    //  create an entry new entery

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      tag: tag,
      category, // added
      status, // added
      thumbnail: thumbnailImage.secure_url,
    });

    // add the new course to the user schema of instructor
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true },
    );

    // update the tag ka schema
    // todo : HW

    return res.status(200).json({
      success: true,
      message: "Course Created Successfully ",
      data: newCourse,
    });
  } catch (error) {
    console.error(error.data);
    return res.status(500).json({
      success: false,
      message: "failed to create course ",
      error: error.message,
      toast: "error in course creation ",
      process: process.env.api_secret,
    });
  }
};

// Edit course Details
exports.editCourses = async (req, res) => {
  try {
    const { courseId } = req.body;
    const updates = req.body;
    const course = await Course.findById(courseId);

    // validation
    if (!course) {
      return res.status(400).json({
        error: "course not found with this Id",
      });
    }
    // if thumbnail image is found update its
    if (req.files) {
      console.log("thumnail updates ");
      const thumnail = req.files.thumbnailImage;
      const thumbnailImage = await uploadImageToCloudinary(
        thumnail,
        process.env.FOLDER_NAME,
      );
      course.thumbnail = thumbnailImage.secure_url;
    }

    // update only those fields that are present in the request body
    // for(const key in updates){
    //   if(updates.hasOwnProperty(key)) {
    //     if(key === "tag"  || key=== "instructor" || key === "category"){
    //       course[key] = JSON.parse(updates[key]);
    //     } else {
    //       course[key] = updates[key];
    //     }
    //   }
    // }

    for (const key of Object.keys(updates)) {
      if (key === "tag" || key === "instructor" || key === "category") {
        course[key] = JSON.parse(updates[key]);
      } else {
        course[key] = updates[key];
      }
    }
    
    await course.save();

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })

      .populate("category")
      .populate("ratingAndreviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    res.json({
      success: true,
      message: "course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "failed to update course details",
      error: error.message,
    });
  }
};

// getAllCourse handler functions

exports.getAllCourses = async (req, res) => {
  try {
    const allCourse = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsenrolled: true,
      },
    )
      .populate("instructor")
      .exec();

    return res.status(200).josn({
      success: true,
      message: " data for all course fetch successfully ",
      data: allCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "cannot fetch course data ",
    });
  }
};

exports.getCourseDetails = async (req, res) => {
  try {
    const { course_Id } = req.body;
    let courseDetails = await Course.find(
      { _id: course_Id }
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        // .populate("ratingAndreviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec(),
    );

    // validations
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find the Course with ${course_Id}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course details fetched successfully ",
      data: courseDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: " internal server error ",
      message: error.message,
    });
  }
};

exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category ")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    let courseProgressCount = await CourseProgress.findOne({
      courseId: courseId,
      userId: userId,
    });

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "course not found with this id",
      });
    }

    let totalDurationInSeconds = 0;
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration);
        totalDurationInSeconds += timeDurationInSeconds;
      });
    });

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getInstructorCourses = async (req, res) => {
  try {
    // get the isntructor id from the authentication user or requrest body
    const instructorId = req.user.id;

    // find all courses belonging to the instructor
    const instructorCourse = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 });

    // return the instructors course
    res.status(200).json({
      success: true,
      data: instructorCourse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "failed to retrived instructor course ",
      error: error.message,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "course not found",
      });
    }

    // Unenrolled students from the courses
    const studentSEnrolled = course.studentsEnroled;
    for (const studentId of studentSEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      });
    }

    // delete section and subsection
    const courseSection = course.courseContent;
    for (const sectionId of courseSections) {
      // delete sub-section of the section
      const section = await Section.findById(sectionId);

      if (section) {
        const subSections = section.subSection;
        for (const subSectionId of subSectionId) {
          await SubSection.findByIdAndDelete(subSectionId);
        }
      }

      // delete the section
      await Section.findByIdAndDelete(sectionId);
    }
    // delete the course
    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "course deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "server error",
      error: error.message,
    });
  }
};

// exports.showAllCategories = async (req, res) => {
//   try {
//     const allCategorys = await Category.find()
//     res.status(200).json({
//       success: true,
//       data: allCategorys,
//     })
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }

exports.getCategoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    const selectedCategory = await Category.findById(categoryId)
      .populate("courses")
      .exec();

    res.status(200).json({
      success: true,
      data: selectedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
