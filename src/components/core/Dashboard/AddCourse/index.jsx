import React from "react";
import RenderSteps from "./RenderSteps";
import { BsLightningChargeFill } from "react-icons/bs";

export default function AddCourse() {
  return (
    <div className="text-white flex flex-col lg:flex-row gap-5  w-full p-5">
      
      {/* Left Section */}
      <div className="w-full lg:w-[70%]">
        <h1 className="mb-6 text-3xl font-semibold">Add Course</h1>

        <div>
          <RenderSteps />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-[30%]">
        <div className="bg-gray-900 p-5 rounded-lg border border-gray-700">
          
          <p className="flex items-center gap-2 mb-4 text-lg font-semibold">
            <span className="text-yellow-400">
              <BsLightningChargeFill />
            </span>
            Code Upload Tips
          </p>

          <ul className="text-sm text-gray-300 list-disc list-inside space-y-2">
            <li>Set the Course Price options or make it free.</li>
            <li>Standard size for the course thumbnail is 1024 × 576.</li>
            <li>Upload high-quality thumbnail images.</li>
            <li>Write a clear and attractive course description.</li>
            <li>Add proper tags to improve search visibility.</li>
            <li>Keep course sections well organized.</li>
            <li>Use short and understandable lecture titles.</li>
            <li>Preview the course before publishing.</li>
            <li>Make sure all videos are working properly.</li>
            <li>Save your progress regularly.</li>
          </ul>

        </div>
      </div>

    </div>
  );
}