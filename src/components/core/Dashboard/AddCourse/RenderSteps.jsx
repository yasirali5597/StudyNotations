import React from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import CourseInformationForm from "./CourseBuilder/CourseInformation/CourseInformationForm";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import PublishCourse from "../AddCourse/PublishCourse/index"


const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Course Publish",
    },
    //  {
    //   id: 4,
    //   title: "Course Information",
    // },
  ];

  return (
    <>
      <div className="flex lg:w-full justify-between items-center gap-4 mb-8">
        {steps.map((item, index) => (
          <React.Fragment key={item.id}>
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`h-8 w-8 flex items-center justify-center rounded-full border 
          ${
            step > item.id
              ? "bg-yellow-500 text-yellow-500 border-yellow-200"
              : step === item.id
              ? "bg-yellow-900 text-yellow-200 border-yellow-200 border-dashed" 
              : "bg-gray-900 text-gray-300 border-gray-700"
          }`}
              >
                {step > item.id ? <FaCheck  className="text-black"/> : item.id}
              </div>

              <p className="text-xs mt-2 text-white">{item.title}</p>
            </div>

            {/* Dash Line */}
            {index !== steps.length - 1 && (
              <div className="flex-1 h-[2px]  bg-gray-600 mb-6"></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* <div>
        {steps.map((item) => {
          <>
            <div>
              <p className="text-white bg-red-700">{item.title}</p>
            </div>
          </>;
        })}
      </div> */}

      <div className="flex justify-between">
        {steps.map((item) => {
          return (
            <div key={item.id}>
              {/* <p className="text-white text-xs text-center ">{item.title}</p> */}
            </div>
          );
        })}
      </div>

      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse/> }
    </>
  );
};

export default RenderSteps;
