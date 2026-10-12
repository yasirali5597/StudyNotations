// import React from 'react'
// import { useForm } from 'react-hook-form';
// import { useState } from 'react';
// import IconsBtn from '../../../../comman/IconsBtn';
// import { MdOutlineEnhancedEncryption } from 'react-icons/md';
// import { useSelector } from 'react-redux';
// import { setStep } from '../../../../../slice/courseSlice';
// import { createSection, updateSection } from '../../../../../services/operation/courseDetailsAPI';
// import { toast } from 'react-hot-toast';
// import { BiRightArrow } from 'react-icons/bi';
// import IconBtn from '../../../../comman/IconsBtn';
// import NestedView from './NestedView';
// import { setEditCourse } from '../../../../../slice/courseSlice';
// import { token } from '../../../../../utils/constants';
// import { useDispatch } from 'react-redux';
// // import { text } from 'stream/consumers';
// // import { useEffect } from 'react';

// const CourseBuilderForm = () => {
//   const dispatchEvent = useDispatch();
//   const dispatch = useDispatch();
//   const {register , handleSubmit , setValue , formState: { errors }}  = useForm();
//   const [editSectionName, setEditSectionName] = useState(null);
//   const {course} = useSelector((state) => state.course);
//   const [loading , setLoading] = useState(false);

//   const cancilEdit=()=>{
//     editSectionName(null);
//     setValue("sectionName", "")
//   }

//   function  goBack(){
//     dispatchEvent(setStep(1));
//     dispatchEvent(setEditCourse(true));

//   }

//   function goToNext(){
//     if(course.courseContent.length === 0 ) {
//       toast.error("plese add atleast one Section" );
//       return
//     }
//     if(course.courseContent.some((section) => section.subSection.length === 0)) {
//       toast.error("please add atleast one lecture in each sections ")
//       return;
//     }

//     // if everything is good
//     dispatch(setStep(3));

//   }

//   const onSubmit = async(data)=>{
//     setLoading(true);
//     let result;

//     if(editSectionName) {
//       // we are editing the section name
//     result = await updateSection(
//       {
//         sectionName:data.sectionName,
//         sectionId:editSectionName,
//         courseid:course._id,
//       },token
//     )
//     }
//     else {
//       result = await createSection({
//         sectionName:data.sectionName,
//         courseId:course._id,
//       },token)
//     }

//     // update values
//     if(result) {
//       dispatch(setValue(result));
//       setEditSectionName(null);
//       setValue("sectionName" , "");
//     }
//     //loading false
//     setLoading(false);

//   }

//   const handleChangeEditSectionName  =(sectionId, sectionName) =>{
//     if(editSectionName === sectionId){
//       cancilEdit();
//       return;
//     }
//     setEditSectionName(sectionId);
//     setValue("sectionName" , sectionName);
//   }

//   return (
//     <div>
//       <p>Course Builder </p>

//       <form  onSubmit={handleSubmit(onSubmit) }>
//         <div>
//            <label>Section name  <sup>*</sup></label>
//             <input
//             id="sectionName"
//             placeholder="Add section name"
//             {...register("sectionName" , {required: true})}
//             className="w-full"
//         />

//         {errors.sectionName && (
//           <span>Section Name is required</span>
//         )}
//         </div>
//         <div className='mt-10'>
//           <IconsBtn
//           type="Submit"
//           text={MdOutlineEnhancedEncryption ? "Edit Section Name" : "Create Section"}
//           outline={true}
//           customClasses="text-white"
//           >

//           </IconsBtn>

//           {editSectionName && (
//             <button
//             type="button"
//             onClick={cancilEdit}
//             className='text-sm text-gray-300 underline ml-10'
//             >
//               Cancil Edits
//             </button>
//           )}
//         </div>

//       </form>

//       {course.courseContent.length > 0 &&  (
//         <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
//       )}
//       <div
//         className='flex justify-end gap-x-3'
//       >
//         <button
//           onClick={goBack}
//           className='rounded-md cursor-pointer flex items-center'
//         >
//           Back
//         </button>
//         <IconBtn text="Next" onClick={goToNext}>
//           <BiRightArrow/>
//         </IconBtn>

//       </div>
//     </div>
//   )
// }

// export default CourseBuilderForm

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowBack } from "react-icons/io";

import {
  createSection,
  updateSection,
} from "../../../../../services/operation/courseDetailsAPI";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slice/courseSlice";
import IconBtn from "../../../../comman/IconsBtn";
import NestedView from "./NestedView";

export default function CourseBuilderForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [editSectionName, setEditSectionName] = useState(false);
  const dispatch = useDispatch();

  // handle form submission
  const onSubmit = async (data) => {
    // console.log(data)
    setLoading(true);

    let result;

    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token,
      );
      // console.log("edit", result)
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token,
      );
    }
    if (result) {
      // console.log("section result", result)
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }
    setLoading(false);
  };

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add atleast one section");
      return;
    }
    if (
      course.courseContent.some((section) => section?.subSection?.length === 0)
    ) {
      toast.error("Please add atleast one lecture in each section");
      return;
    }
    dispatch(setStep(3));
  };

//   const goToNext = () => {
//   if (!course?.courseContent || course.courseContent.length === 0) {
//     toast.error("Please add at least one section");
//     return;
//   }

//   if (
//     course.courseContent.some(
//       (section) => (section?.subSection?.length ?? 0) === 0
//     )
//   ) {
//     toast.error("Please add at least one lecture in each section");
//     return;
//   }

//   dispatch(setStep(3));
// };



  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  // const handleChangeEditSectionName = (sectionId, sectionName) => {
  //   if (editSectionName === sectionId) {
  //     cancelEdit();
  //     return;
  //   }
  //   setEditSectionName(sectionId);
  //   setValue("sectionName", sectionName);
  // };

  const handleChangeEditSectionName = (sectionId , sectionName) =>{
    if(editSectionName === sectionId) {
      cancelEdit();
      return;
    }
      setEditSectionName(sectionId);
      setValue("sectionName" , sectionName);

  }

  return (
    <div className="space-y-8 rounded-md border-[1px] border-gray-700 bg-gray-800 p-6">
      <p className="text-2xl font-semibold text-gray-100">Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-gray-100" htmlFor="sectionName">
            Section Name <sup className="text-pink-600">*</sup>
          </label>
          <input
            id="sectionName"
            disabled={loading}
            placeholder="Add a section to build your course"
            {...register("sectionName", { required: true })}
            className="form-style w-full text-black rounded-md border-gray-700 py-2 px-4 bg-gray-600 focus:border-yellow-500 focus:ring-yellow-500 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-400"
          />
          {errors.sectionName && (
            <span className="ml-2 text-xs tracking-wide text-pink-600">
              Section name is required
            </span>
          )}
        </div>
        <div className="flex items-end gap-x-4">
          <IconBtn
            type="submit"
            disabled={loading}
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
            
          >
            <IoAddCircleOutline size={20} className="text-yellow-500 font-bold" />
          </IconBtn>
          {/* <h>hellpo</h> */}
          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-gray-300 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div>
          {/* <p className="text-white">
            Course Content Length: {course?.courseContent?.length}
          </p> */}

            {course?.courseContent?.length > 0 && (
              <NestedView
                handleChangeEditSectionName={handleChangeEditSectionName}
              />
            )}
      </div>

      {/* Next Prev Button */}
      <div className="flex justify-end gap-x-3">
        <button
          onClick={goBack}
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-gray-300 py-[8px] px-[20px] font-semibold text-gray-900`}
        >
          <IoMdArrowBack />
          Back
        </button>
        <IconBtn disabled={loading} text="Next" onclick={goToNext}>
          <MdNavigateNext />
        </IconBtn>
      </div>
      {/* <NestedView/> */}
    </div>
  );
}
