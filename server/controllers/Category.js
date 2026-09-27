const Category = require("../models/Category");

// create category ka handler functions
exports.createCategory = async (req, res) => {
  try {
    // fetch Data
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }
    // create entry in db
    const CategoryDetails = await Category.create({
      name: name,
      description: description,
    });
    console.log(CategoryDetails);
    return res.status(200).json({
      success: true,
      message: "Category created successfuly",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all  categories handler function
// exports.showAllCategories = async (req, res) => {
//   try {
//     const allCategory = await Category.find({}, { name: true, description: true });


//     return res.status(200).json({
//       success: true,
//       message: "all categories returned successfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


exports.showAllCategories = async (req, res) => {
  try {

    const allCategory = await Category.find(
      {},
      {
        name: true,
        description: true,
      }
    );

    return res.status(200).json({
      success: true,
      data: allCategory,
      message: "All categories returned successfully",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//


// exports.categoryPageDetails = async (req, res) => {
//   try {
//     // GET  courses gategory id
//     const { category_Id } = req.body;

//     // get course for specified category id
//     const SelectedcategoryDetails = await Category.findById(category_Id)
//       .populate("courses")
//       .exec();
//     // validations
//     if (!SelectedcategoryDetails) {
//       return res.status(404).json({
//         success: false,
//         message: "Category or courses  not found",
//       });
//     }
//     //get courses for deffrent category id
//     const diffrentCategory = await Category.find({
//       _id: { $ne: category_Id },
//     })
//       .populate("courses")
//       .exec();

//     // get top 10  selling courses for the category   this is a home works



//     return res.status(200).json({
//       success: true,
//       message: "category details fetched successfully ",
//       data: {
//         SelectedcategoryDetails,
//         diffrentCategory,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };




exports.categoryPageDetails = async (req,res)=>{
  try {
    const {categoryId} = req.body;

    // get course for the specified category 
    const selectedCategory = await Category.findById(categoryId)
    .populate({
      path:"courses",
      match: {status: "Published " },
      populate: "ratingAndReviews",
    }).exec();

    console.log("SELECTED COURSE " , selectedCategory );
    //  handle the case when the category is not found 
    if(!selectedCategory){
      console.log("Category not found " );
      return res
      .status(404)
      .json({
        success: false, 
        message:"Category not found " 
      })
    }

    // handle the case when there are no courses 
    if(selectedCategory.courses.length === 0 ) {
      console.log("No courses found for the selected category ")
      return res.status(404).json({
        success:false, 
        message: " No course found for the selected category "
      })
    }

    // get courses for other categories 
    const categoriesExceptSelected = await Category.find({
      _id: {$ne : categoryId },
    })

    let diffrentCategory = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
      ._id
    )
    .populate({
      path: "course",
      match: {status: "Published "},
    })
    .exec();
    console.log();
    // get top-selling courses across all categories 
    const  allCategories = await Category.find()
    .populate({
      path: "course",
      match: {status: "Published"},
    }).exec();

    const allCourse = allCategories.flatMap((category) => category.courses)
    const mostSellingCourses = allCourses
    .sort( (a,b ) => b.sold - a.sold )
    .slice(0,10) 


    res.status(200).json({
      success: true,
      data: {
        selectedCategory, 
        diffrentCategory,
        mostSellingCourses,
      },
    })

  } catch(error){
    return res.status(500).json({
      success:false,
      message:" internal server error ",
      error: error.message,
    })
  }


}

    
    


