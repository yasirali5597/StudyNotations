import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import IconsBtn from '../../../../comman/IconsBtn';
import { resetCourseState, setStep } from '../../../../../slice/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { editCourseDetails } from '../../../../../services/operation/courseDetailsAPI';




const PublishCourse  = () => {

    const {register, handleSubmit , setValue , getValues} = useForm();
    const {course } = useSelector((state) => state.course)
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    const [loading , setLoading] = useState(false);

    useEffect( () =>{
        if(course?.status === COURSE_STATUS.PUBLISHED) {
            setValue("public", true);
        }
    },[])


    const onSubmit = async(data) =>{
        console.log(data);
        handleCoursePublic();
        
    }

    const goBack = () =>{
        dispatch(setStep(2));
         
        

    }


    const goToCourse = () =>{
        dispatch(resetCourseState());
        // navigate "/dashboard/my_course"
    }

    const handleCoursePublic = async()=>{
        if(course?.status === COURSE_STATUS.PUBLISHED   && getValues("public") === true || 
    (course.status === COURSE_STATUS.DRAFT && getValues("public") === false )){
        // no update in form 
        // no needs to make api call 
        goToCourse();
        return;
    }

    // if form is updated 
     const formData = new FormData();
     formData.append("courseId" , course._id);
     const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED:COURSE_STATUS.DRAFT;
     formData.append("status" , courseStatus);

     setLoading(true);
     const result = await editCourseDetails(formData, token);

     if(result){
        goToCourse();
     }

     setLoading(false);
    }




  return (
    <div className="rounded-md border-[1px] bg-gray-800 p-6 border-gray-700 ">
        <p> Publish Courses</p>

        <form  onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label> 

                <input
                    type='checkbox'
                    id='public'
                    {...register("public")}
                    className='rounded h-4 w-4 '
                />
                <span>
                     Make this course as publics
                </span>



                </label>
            </div>

            <div className='flex justify-end gap-x-3'>
                <button
                    disabled={loading}
                    type="button"
                    onClick={goBack}
                    className='flex items-center rounded-md bg-gray-300 p-6 '
                >Back </button>

                <IconsBtn disabled={loading } text="save change"/>

            </div>

        </form>
    
    </div>
  )
}

export default PublishCourse 