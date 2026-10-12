// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { setLoading } from "../../../../../slice/authSlice";
// import { HiOutlineCurrencyRupee } from "react-icons/hi";
// import IconsBtn from "../../../../comman/IconsBtn";
// import { useDispatch, useSelector } from "react-redux";
// // import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
// import { addCourseDetails , editCourseDetails, fetchCourseCategories } from "../../../../../services/operation/courseDetailsAPI";
// import { useEffect } from "react";
// import RequirementField from "./RequirementField";
// // import { addCourseDetails } from "../../../../../services/operation/courseDetailsAPI";
// import { COURSE_STATUS } from "../../../../../utils/constants";
// import { setCourse, setStep  } from "../../../../../slice/courseSlice";
// import {toast } from "react-hot-toast"
// // import {auth} from "../../../../../services/operation/authAPI"
// import {Upload} from "../Upload"

// const CourseInformation  = () => {


//     // const  {token } = useSelector((state) => state.auth);
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     getValues,
//     formState: { errors },
//   } = useForm();

//   const dispatch = useDispatch();
//   const { course, editCourse } = useSelector((state) => state.course);
//   const [loading  , setLoading ] = useState(false)
//   const [courseCategory, setCourseCategory] = useState([]);
//   const { token } = useSelector((state) => state.auth);

//   useEffect(() => {
//     const getCategories = async () => {
//       setLoading(true);
//       const categories = await fetchCourseCategories();
//     //   console.log("PRINTING CATEGORIES1", categories);
//       if (categories?.length > 0) {
//         setCourseCategory(categories);
//       }
//       setLoading(false);
//     };

//     if (editCourse && course) {
//       setValue("courseTitle", course.courseName);
//       setValue("courseDescription", course.courseDescription);
//       setValue("coursePrice", course.price);
//       setValue("courseTags", course.tag);
//       setValue("courseBenefits", course.whatYouWillLearn);
//       setValue("courseCategory", course.category);
//       setValue("courseRequirements", course.instructions);
//       setValue("courseImage", course.thumbnail);
//     }

//     getCategories();
//   }, []);



//    const isFormUpdated = () => {
//         const currentValues = getValues();
//         if(currentValues.courseTitle !== course.courseName ||
//             currentValues.courseShortDesc !== course.courseDescription ||
//             currentValues.coursePrice !== course.price ||
//             currentValues.courseTitle !== course.courseName ||
//             //currentValues.courseTags.toString() !== course.tag.toString() ||
//             currentValues.courseBenefits !== course.whatYouWillLearn ||
//             currentValues.courseCategory._id !== course.category._id ||
//             //currentValues.courseImage !== course.thumbnail ||
//             currentValues.courseRequirements.toString() !== course.instructions.toString() )
//             return true;
//         else
//             return false;
//     }


    

//   //handles next button click 
//     const onSubmit = async(data) => {

//         if(editCourse) {
//             if(isFormUpdated()) {
//                 const currentValues = getValues();
//             const formData = new FormData();

//             formData.append("courseId", course._id);
//             if(currentValues.courseTitle !== course.courseName) {
//                 formData.append("courseName", data.courseTitle);
//             }

//             if(currentValues.courseShortDesc !== course.courseDescription) {
//                 formData.append("courseDescription", data.courseShortDesc);
//             }

//             if(currentValues.coursePrice !== course.price) {
//                 formData.append("price", data.coursePrice);
//             }

//             if(currentValues.courseBenefits !== course.whatYouWillLearn) {
//                 formData.append("whatYouWillLearn", data.courseBenefits);
//             }

//             if(currentValues.courseCategory._id !== course.category._id) {
//                 formData.append("category", data.courseCategory);
//             }

//             if(currentValues.courseRequirements.toString() !== course.instructions.toString()) {
//                 formData.append("instructions", JSON.stringify(data.courseRequirements));
//             }

//             setLoading(true);
//             const result = await editCourseDetails(formData, token);
//             setLoading(false);
//             if(result) {
//                 setStep(2);
//                 dispatch(setCourse(result));
//             }
//             } 
//             else {
//                 toast.error("NO Changes made so far");
//             }
//             console.log("PRINTING FORMDATA", formData);
//             console.log("PRINTING result", result);

//             return;
//         }

//         //create a new course
//         const formData = new FormData();
//         formData.append("courseName", data.courseTitle);
//         formData.append("courseDescription", data.courseShortDesc);
//         formData.append("price", data.coursePrice);
//         formData.append("whatYouWillLearn", data.courseBenefits);
//         formData.append("category", data.courseCategory);
//         formData.append("instructions", JSON.stringify(data.courseRequirements));
//         formData.append("status", COURSE_STATUS.DRAFT);

//         setLoading(true);
//         console.log("BEFORE add course API call");
//         console.log("PRINTING FORMDATA", formData);
//         const result = await addCourseDetails(formData,token);
//         console.log("AFTER add course API call" , token);
//         if(result) {
//             setStep(2);
//             dispatch(setCourse(result));
//         }
//         setLoading(false);
//         console.log("PRINTING FORMDATA", formData);
//         console.log("PRINTING result", result);

//     }

//   return(
//     <form 
//     onSubmit={handleSubmit(onSubmit)}
//     className=" w-full rounded-md border-gray-700 bg-black p-6 border  bg-gray-800 mt-6">

//         <div>
//             <label htmlFor="courseTitle"> Course Title <sup className="text-red-500">*</sup></label>
//             <input 
//             id="courseTitle"
//             placeholder="Enter Course Title"
//             {...register("courseTitle" , {required: true})}
//         className="w-full bg-gray-500 rounded-md border-gray-700 bg-gray-100 p-3 mt-4 "
//         />
//         {
//             errors.courseTitle && (
//                 <span className="text-red-500 text-xs">Course Title is required</span>
//             )
//         }
//         </div>
        
//         <div className="mt-6 ">
//             <label  htmlFor="courseDescription" > Course short Description <sup className="text-red-500">*</sup></label>
//             <textarea
//             id="courseDescription"
//             placeholder="Enter Course Description"
//             {...register("courseDescription", {required: true})}
//                     className="w-full bg-gray-500 rounded-md border-gray-700 bg-gray-100 p-3 mt-2 "

//             />
//             {
//                 errors.courseDescription && (
//                     <span className="text-red-500 text-xs">Course Description is required</span>
//                 )
//             }
//         </div>


//         <div className="relative mt-5">
//             <label  htmlFor="coursePrice" > Course Price <sup className="text-red-500">*</sup></label>
//             <textarea
//             id="coursePrice"
//             placeholder="Enter Course Price"
//             {...register("coursePrice", {required: true})}
//             className="w-full bg-gray-500 rounded-md border-gray-700 bg-gray-100 p-3 mt-2 "
//             />
//             <HiOutlineCurrencyRupee className="absolute right-4 top-[38px] text-gray-500"/>
//             {
//                 errors.coursePrice && (
//                     <span className="text-red-500 text-xs">Course Price is required</span>
//                 )
//             }
//         </div>

//         <div className="mt-4 mb-5 ">
//             <label htmlFor="courseCategory">Course Category <sup className="text-red-500 mr-5 ">*</sup></label>
//             <select
//             id='courseCategory'
//             defaultValue=""
//             {...register("courseCategory" )}
//             className="bg-gray-500 rounded-sm  "
//             >
//                  <option  className="bg-gray-600 rounded-md" value=" " disabled>Choose a Category </option>

//                  {
//                     !loading && courseCategory.map((category, index) => (
//                         <option  key={index} value={category?._id}>
//                             {category?.name}
//                         </option>
//                     ))
//                  }
//             </select>

//             {
//                 errors.courseCategory && (
//                     <span className="text-red-500 text-xs"> Course Category is Required </span>
//                 )
//             }
//         </div>


//         {/* create a custom select component for handling tags input  */}
// {/* 
//         <chipInput
//         label="Tags"
//         name="courseTags
//         placeholder="Enter tags and press enter"
//         register={register}
//         errors={errors}
//         setValue={setValue}
//         getValues={getValues}
//         /> */}


//         {/* create a component for uploading showing previews of media < */}

//         {/* <Upload 
//         name=
//         label=
//         register=
//         errors=
//         setValue={}
//         getValues={}
//         /> */}


//         <div className="mb-6 mt-4">
//             <label  htmlFor="courseBenefits">Benefits of the Course <sup className="text-red-500">*</sup></label>
//             <textarea
//             id="courseBenefits"
//             placeholder="Enter Benefits of the course"
//             {...register("courseBenefits", {required: true})}
//             className="w-full bg-gray-500 rounded-md border-gray-700 bg-gray-100 p-3 mt-2 text-black "
//             />
//             {
//                 errors.courseBenefits && (
//                     <span className="text-red-500 text-xs">Benefits of the Course is required</span>
//                 )
//             }
//         </div>



//         <RequirementField
//         name="courseRequirements/Instructions"
//         label="Course Requirements/Instructions"
//         register={register}
//         errors={errors}
//         setValue={setValue}
//         getValues={getValues}       
//         />

//         <div className="mb-6 mt-4">
//             {
//                 editCourse && (
//                     <button 
//                     onClick={()=>dispatch(setStep(2))}
//                     className="bg-yellow-50 text-black px-4 py-2 rounded-md"
//                     >
//                         Continue Without Saving
//                     </button>
//                 )
//             }

//             <IconsBtn 
//             className="bg-yellow-900 text-yellow-500 px-4 py-2 rounded-md text-left"
//             text={!editCourse ? "Next" : "Save Changes"}
//             />
//         </div>








//     </form>
//   )
// };

// export default CourseInformation;



import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
  fetchCourseCategories,
  editCourseDetails,
  addCourseDetails,
}   from "../../../../../../services/operation/courseDetailsAPI";

import { setCourse, setStep } from "../../../../../../slice/courseSlice"
import { COURSE_STATUS } from "../../../../../../utils/constants"
import IconBtn from "../../../../../comman/IconsBtn"
import Upload from "../../Upload"
import ChipInput from "./chipInput"
import RequirementsField from "./RequirementField"
import { categories } from "../../../../../../services/apis"



export default function CourseInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course, editCourse } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchCourseCategories()
      console.log(categories)
      if (categories?.length > 0) {
        // console.log("categories", categories)
        setCourseCategories(categories)
      }
      setLoading(false)
    }
    // if form is in edit mode
    if (editCourse) {
      // console.log("data populated", editCourse)
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category)
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
    }
    getCategories()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues()
    // console.log("changes after editing form values:", currentValues)
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    ) {
      return true
    }
    return false
  }

  //   handle next button click
  const onSubmit = async (data) => {
    // console.log(data)

    if (editCourse) {
      // const currentValues = getValues()
      // console.log("changes after editing form values:", currentValues)
      // console.log("now course:", course)
      // console.log("Has Form Changed:", isFormUpdated())
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        // console.log(data)
        formData.append("courseId", course._id)
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle)
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc)
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice)
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags))
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits)
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory)
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          )
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage)
        }
        // console.log("Edit Form data: ", formData)
        setLoading(true)
        const result = await editCourseDetails(formData, token)
        setLoading(false)
        if (result) {
          dispatch(setStep(2))
          dispatch(setCourse(result))
        }
      } else {
        toast.error("No changes made to the form")
      }
      return
    }

    const formData = new FormData()
    formData.append("courseName", data.courseTitle)
    formData.append("courseDescription", data.courseShortDesc)
    formData.append("price", data.coursePrice)
    formData.append("tag", JSON.stringify(data.courseTags))
    formData.append("whatYouWillLearn", data.courseBenefits)
    formData.append("category", data.courseCategory)
    formData.append("status", COURSE_STATUS.DRAFT)
    formData.append("instructions", JSON.stringify(data.courseRequirements))
    formData.append("thumbnailImage", data.courseImage)
    setLoading(true)
    const result = await addCourseDetails(formData, token)
    if (result) {
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }
    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
    >
      {/* Course Title */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseTitle">
          Course Title <sup className="text-red-500">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="form-style w-full text-black h-9 bg-gray-600 rounded-md border-gray-700 bg-gray-100 p-3 mt-4 "
        />
        {errors.courseTitle && (
          <span className="ml-2 text-xs tracking-wide text-red-500">
            Course title is required
          </span>
        )}
      </div>
      {/* Course Short Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
          Course Short Description <sup className="text-red-500">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          className="form-style w-full text-black bg-gray-600 rounded-md border-gray-700 bg-gray-100 p-3 mt-4 "

        />
        {errors.courseShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-red-500">
            Course Description is required
          </span>
        )}
      </div>
      {/* Course Price */}
      <div className="flex flex-col space-y-2">
  <label
    className="text-sm text-richblack-5"
    htmlFor="coursePrice"
  >
    Course Price <sup className="text-red-500">*</sup>
  </label>

  <div className="relative">
    
    {/* Rupee Icon */}
    <HiOutlineCurrencyRupee
      className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-gray-300"
    />

    {/* Input */}
    <input
      type="number"
      id="coursePrice"
      placeholder="Enter Course Price"
      {...register("coursePrice", {
        required: "Course Price is required",
        valueAsNumber: true,
        pattern: {
          value: /^(0|[1-9]\d*)(\.\d+)?$/,
          message: "Enter a valid price",
        },
      })}
      className="w-full rounded-md border border-gray-700 bg-gray-600 py-3 pl-10 pr-3 text-white placeholder:text-gray-400 focus:outline-none"
    />
  </div>

  {errors.coursePrice && (
    <span className="ml-2 text-xs tracking-wide text-red-500">
      {errors.coursePrice.message}
    </span>
  )}
</div>
      {/* Course Category */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseCategory">
          Course Category <sup className="text-red-500">*</sup>
        </label>
        <select
          {...register("courseCategory", { required: true })}
          // {...register("courseCategory")}

          defaultValue=""
          id="courseCategory"
          className="form-style w-full text-black bg-gray-600 rounded-md border-gray-700 bg-gray-100 p-3 mt-4 "

        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            courseCategories?.map((category, indx) => (
              <option
              // className="form-style w-full  h-9 rounded-md border-gray-700 text-black  p-3 mt-4 "

               key={indx} value={category?._id}>
                {/* {categories?.name} */}
                {category.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-red-500">
            Course Category is required
          </span>
        )}
     </div> 



      {/* Course Tags */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      {/* Course Thumbnail Image */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />
      {/* Benefits of the course */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
          Benefits of the course <sup className="text-red-500">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter benefits of the course"
          {...register("courseBenefits", { required: true })}
          className="form-style w-full text-black  bg-gray-600 rounded-md border-gray-700 bg-gray-100 p-3 mt-4 "

        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-red-500">
            Benefits of the course is required
          </span>
        )}
      </div>
      {/* Requirements/Instructions */}
      <RequirementsField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />
      {/* Next Button */}
      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          >
            Continue Wihout Saving
          </button>
        )}
        <IconBtn
          type="submit"
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>

      
    </form>
  )
}