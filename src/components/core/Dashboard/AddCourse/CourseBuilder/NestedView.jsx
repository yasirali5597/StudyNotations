// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import {MdEdit} from 'react-icons/md'
// import {RiDelelteBin6Line} from 'react-icons/ri'
// import {BiSolidDownArrow} from 'react-icons/bi'

// const NestedView = (handleChangeEditSectionName) => {

//     const {course}=useSelector((state) => state.course);
//     const {token}=useSelector((state) => state.auth);
//     const dispatch = useDispatch();

//     const [addSubSection , setAddSubSection] = useState(null)
//     const [ViewSubSection , setViewAddSubSection] = useState(null)
//     const [editSubSection , setEditSubSection] = useState(null)

//     const [confirmationModal,setConfirmationModal] = useState(null);

//     const handleDeleteSection = (sectionId) =>{

//     }

//   return (
//     <div>
//     <div className="rounded-lg bg-gray-700 p-6 px-8">
//         {courseEndpoints?.courseContent?.map((section) => {
//             <details key={section._id} open>

//             <summary className='flex items-center  justify-center gap-x-3 border-b-2 '>
//                 <div className='flex items-center gap-x-3'>
//                     <RxDropdowmMenu/>
//                     <p>{section.sectionName}</p>

//                 </div>
//                 <div className='flex items-center '>
//                     <button
//                     onClick={handleChangeEditSectionName(section._id,section.sectionName)}>
//                         <MdEdit/>
//                     </button>

//                     <button
//                     onClick={ () => {
//                         setConfirmationModal({
//                             text1="Delete This Section",
//                             text2="All the lectures in this section will be deleted",
//                             btn1Text="Dlete",
//                             btn2Text="Cancil",
//                             btn1Handler:()=>handleDeleteSection(section._id),
//                             btn2Handler:()=> serConfirmationModal(null),

//                         })
//                     }}
//                     >
//                         <RiDelelteBin6Line/>
//                     </button>
//                     <span>|</span>
//                     <BiDownArrow className={"text-xl text-gray-300"}/>

//                 </div>
//             </summary>

//           <div>
//   {section?.subSection?.map((data) => (
//     <div
//       key={data?._id}
//       onClick={() => setViewSubSection(data)}
//       className="flex items-center justify-between gap-x-3 border-b-2 py-2"
//     >
//       <div className="flex items-center gap-x-3">
//         <RxDropdownMenu />
//         <p>{data?.title}</p>
//       </div>

//       <div className="flex items-center gap-x-3">
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             setEditSubSection({
//               ...data,
//               sectionId: section?._id,
//             });
//           }}
//         >
//           <MdEdit />
//         </button>

//         <button
//           onClick={(e) => {
//             e.stopPropagation();

//             setConfirmationModal({
//               text1: "Delete this Sub Section",
//               text2: "Selected Lecture will be deleted",
//               btn1Text: "Delete",
//               btn2Text: "Cancel",
//               btn1Handler: () =>
//                 handleDeleteSubSection(
//                   data?._id,
//                   section?._id
//                 ),
//               btn2Handler: () =>
//                 setConfirmationModal(null),
//             });
//           }}
//         >
//           <RiDeleteBin6Line />
//         </button>
//       </div>
//     </div>
//   ))}

//   <button
//     onClick={() => setAddSubSection(section?._id)}
//     className="mt-4 flex items-center gap-x-2 text-yellow-50"
//   >
//     <AiOutlinePlus />
//     <p>Add Lecture</p>
//   </button>
// </div>
//             {/* </details>
//         ))}

//       </div> */}

//       {addSubSection ? (
//   <SubSectionModal
//     modalData={addSubSection}
//     setModalData={setAddSubSection}
//     add={true}
//   />
// ) : viewSubSection ? (
//   <SubSectionModal
//     modalData={viewSubSection}
//     setModalData={setViewSubSection}
//     view={true}
//   />
// ) : editSubSection ? (
//   <SubSectionModal
//     modalData={editSubSection}
//     setModalData={setEditSubSection}
//     edit={true}
//   />
// ) : null}

// {confirmationModal ? (
//   <ConfirmationModal
//     modalData={confirmationModal}
//   />
// ) : null}

//     {/* </div> */}
//   )
// }

// export default NestedView







import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidDownArrow } from "react-icons/bi";
import { RxDropdownMenu } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";
import { deleteSection,deleteSubSection  } from "../../../../../services/operation/courseDetailsAPI";
import { setCourse } from "../../../../../slice/courseSlice";
import SubSectionModal from "./SubSectionModal";
import ConfirmationModal from "../../../../../components/comman/ConfirmationModal";

const NestedView = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  // const handleDeleteSection = async (sectionId) => {
  //   try {
  //     console.log("Delete Section:", sectionId);
  //     const result = await deleteSection(
  //       {
  //         sectionId,
  //         courseId: course._id,
  //          token,
  //       },
       
  //     );
  //     console.log("PRINTING AFTEr DELETED SECTION");
  //     if (result) {
  //       dispatch(setCourse(result));
  //     }

  //     setConfirmationModal(null);
  //     // API call here
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  const handleDeleteSection = async (sectionId) => {
  try {
    console.log("section Id " , sectionId);
    console.log("course Id " , course?._id);
    console.log("token Id " , token);


    const result = await deleteSection({
      sectionId,
      courseId: course._id,
      token,
    });

    if (result) {
      dispatch(setCourse(result));
    }

    setConfirmationModal(null);
  } catch (error) {
    console.error("Error deleting section:", error);
    setConfirmationModal(null);
  }
};

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    try {
      console.log("Delete SubSection:", subSectionId, sectionId);

      const result = await deleteSubSection({ subSectionId, sectionId, token });
      if (result) {
        // todo extra kya ker sakte hai yaha per
        dispatch(setCourse(result));
      }
      setConfirmationModal(null);

      // API call here
    } catch (error) {
      console.log(error);
    }
  };

  // const handleDeleteSubSection = async (subSectionId, sectionId) =>{
  //   const result = await deleteSubSection({subsectionId, sectionId , token});
  //   if(result) {
  //     const updatedCourseContent = course.courseContent.map((section) =>
  //     section.id === sectionId ? result: section );
  //     const updatedCourse = {...course , courseContent:updatedCourseContent };
  //     dispatch(setCourse(updatedCourse))
  //   }
  //   setConfirmationModal(null);
  // }

  return (

    <div>
    {/* <h1 className="text-white">hellow</h1> */}

      <div className="rounded-lg bg-gray-700 p-6 px-8">
        {course?.courseContent?.map((section,index) => (
          console.log("SECTION OBJECT:", section),
          console.log("SECTION NAME:", section?.sectionName),
           console.log("SECTION =", section),
           console.log("SECTION TYPE =", typeof section),
      
          <details
            key={section?._id}
            open
            className="mb-4 rounded-md border border-gray-600"
          >
            <summary className="flex items-center justify-between border-b border-gray-600 p-3 cursor-pointer">
              <div className="flex items-center gap-x-3">
                <RxDropdownMenu />
                <p className="text-gray-300">Section {index+1}: {section?.sectionName}</p>
               
                
              </div> 

              <div className="flex items-center gap-x-3">
                <button
                  onClick={(e) => {
                    e.preventDefault();

                    handleChangeEditSectionName(
                      section?._id,
                      section?.sectionName,
                    );
                  }}
                >
                  <MdEdit />
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("SECTION OBJECT2:", section);
                    console.log("SECTION ID2:", section?._id);


                    setConfirmationModal({
                      text1: "Delete This Section",
                      text2: "All lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleteSection(section),
                      btn2Handler: () => setConfirmationModal(null),
                    });
                  }}
                >
                  <RiDeleteBin6Line />
                </button>

                <BiSolidDownArrow className="text-xl text-gray-300" />
              </div>
            </summary>

            <div className="p-3">
              {section?.subSection?.map((data) => (
                <div
                  key={data?._id}
                  onClick={() => setViewSubSection(data)}
                  className="flex items-center justify-between gap-x-3 border-b border-gray-600 py-3 cursor-pointer"
                >
                  <div className="flex items-center gap-x-3">
                    <RxDropdownMenu />
                    <p>{data?.title}</p>
                  </div>

                  <div className="flex items-center gap-x-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        setEditSubSection({
                          ...data,
                          sectionId: section?._id,
                        });
                      }}
                    >
                      <MdEdit />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        setConfirmationModal({
                          text1: "Delete this Lecture",
                          text2: "Selected lecture will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () =>
                            handleDeleteSubSection(data?._id, section?._id),
                          btn2Handler: () => setConfirmationModal(null),
                        });
                      }}
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={() => {
                  console.log("SECTION OBJECT3:", section);
                  // console.log("SECTION ID3:", section?._id);
                  // console.log("SECTION NAME3:", section?.sectionName);
                  // console.log("clicked add lecture");
                
                setAddSubSection(section)}}
                className="mt-4 flex items-center gap-x-2 text-yellow-500 "
              >
                <AiOutlinePlus />
                <p>Add Lecture</p>
              </button>
            </div>
          </details>
        ))}
      </div>




      
      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : null}

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

      {/* <h>hellow world</h> */}
    </div>
  );
};

export default NestedView;
