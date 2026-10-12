import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operation/courseDetailsAPI";
import { setCourse } from "../../../../../slice/courseSlice";
import { Form } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import Upload from "../Upload";
import IconBtn from "../../../../comman/IconsBtn";
import { useSelector } from "react-redux";

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      return true;
    } else {
      return false;
    }
  };
  const handleEditSubSection = async () => {
    const currentValues = getValues();
    const formData = new FormData();

    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }

    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc);
    }

    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("videoFile", currentValues.lectureVideo);
    }

    setLoading(true);
    //API call
    const result = await updateSubSection(formData, token);
    if (result) {
      //TODO: same check
      const updatedCourseContent = course.courseContent.map((section) =>
        section.id === modalData ? result : section,
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
    setLoading(false);
  };

  const onSubmit = async (data) => {
    if (view) return;

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form");
      } else {
        //edit krdo store me
        handleEditSubSection();
      }
      return;
    }
    

    //ADD

    const formData = new FormData();

    // formData.append("videoFile", data.lectureVideo);
    formData.append("sectionId", modalData);

    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    // formData.append("timeDuration", data.timeDuration);
    formData.append("videoFile", data.lectureVideo);

    for (const [key, value] of formData.entries()) {
      console.log("formData ", key, value);
    }

    setLoading(true);
    //API CALL
    const result = await createSubSection(formData, token);

    if (result) {
      //TODO: we will check for updatation

      const updatedCourseContent = course.courseContent.map((section) =>
        section.id === modalData ? result : section,
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
    setLoading(false);
  };

  // return (
  //   <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm">
  //     {/* <div> */}
  //       <div className="w-[90%] max-w-[700px] max-h-[90vh] overflow-y-auto rounded-xl bg-gray-900 p-6 shadow-2xl border border-gray-700">
  //         <p>
  //           {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
  //         </p>
  //         <button onClick={() => (!loading ? setModalData(null) : {})}>
  //           <RxCross1 />
  //         </button>
  //       </div>
  //       <form onSubmit={handleSubmit(onSubmit)}>
  //         <Upload
  //           name="lectureVideo"
  //           label="Lecture Video"
  //           register={register}
  //           setValue={setValue}
  //           errors={errors}
  //           video={true}
  //           viewData={view ? modalData.videoUrl : null}
  //           editData={edit ? modalData.videoUrl : null}
  //         />
  //         <div>
  //           <label className=" text-gray-300 font-bold mt-4 text-xl mb-2" >Lecture Title</label>
  //           <input
  //             id="lectureTitle"
  //             placeholder="Enter Lecture Title"
  //             {...register("lectureTitle", { required: true })}
  //             className="w-full py-2 px-3 rounded-xl bg-gray-800 text-white text-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
  //           />
  //           {errors.lectureTitle && <span>Lecture Title is required</span>}
  //         </div>
  //         <div>
  //           <label className=" text-gray-300 font-bold mt-4 text-xl mb-2  "  >Lecture Description</label>
  //           <textarea
  //             id="lectureDesc"
  //             placeholder="Enter Lecture Description"
  //             {...register("lectureDesc", { required: true })}
  //             className="w-full min-h-[130px] my-4 px-3 py-2 rounded-xl bg-gray-800 text-white text-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
  //           />
  //           {errors.lectureDesc && <span>Lecture Description is required</span>}
  //         </div>

  //         {!view && (
  //           <div>
  //             <IconBtn
  //               text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
  //             />
  //           </div>
  //         )}
  //       </form>
  //     </div>
  //   // </div>
  // );

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      {/* Modal Box */}
      <div className="w-[90%] max-w-[700px] max-h-[90vh] overflow-y-auto rounded-xl bg-gray-900 p-6 shadow-2xl border border-gray-700">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between border-b border-gray-700 pb-4">
          <p className="text-2xl font-semibold text-white">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>

          <button
            type="button"
            disabled={loading}
            onClick={() => setModalData(null)}
            className="text-gray-300 hover:text-white text-xl"
          >
            <RxCross1 />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Video Upload */}
          <div className="mb-6">
            <Upload
              name="lectureVideo"
              label="Lecture Video"
              register={register}
              setValue={setValue}
              errors={errors}
              video={true}
              viewData={view ? modalData.videoUrl : null}
              editData={edit ? modalData.videoUrl : null}
            />
          </div>

          {/* Lecture Title */}
          <div className="mb-5">
            <label className="mb-2 block text-lg font-semibold text-gray-300">
              Lecture Title
            </label>

            <input
              id="lectureTitle"
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", {
                required: true,
              })}
              className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-lg text-white outline-none focus:border-yellow-400"
            />

            {errors.lectureTitle && (
              <span className="mt-1 block text-sm text-pink-400">
                Lecture Title is required
              </span>
            )}
          </div>

          {/* Lecture Description */}
          <div className="mb-6">
            <label className="mb-2 block text-lg font-semibold text-gray-300">
              Lecture Description
            </label>

            <textarea
              id="lectureDesc"
              placeholder="Enter Lecture Description"
              {...register("lectureDesc", {
                required: true,
              })}
              className="min-h-[130px] w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-lg text-white outline-none focus:border-yellow-400"
            />

            {errors.lectureDesc && (
              <span className="mt-1 block text-sm text-pink-400">
                Lecture Description is required
              </span>
            )}
          </div>

          {/* Buttons */}
          {!view && (
            <div className="flex justify-end border-t border-gray-700 pt-5">
              <IconBtn
                text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;
//PAANI BREAK - 2min
