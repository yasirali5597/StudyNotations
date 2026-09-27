import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchInstructorCourses } from '../../../services/operation/courseDetailsAPI'

const MyCourses = () => {


    const {token} = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const [courses , setCourse ] = useState([]);

    useEffect( () =>{
        const fetchCourses  = async () => {
            const resutl 
        }
        
    })

  return (
    <div>


    <div>
         this is a courses pages in this fileds 

    </div>
    
    
    
    
    </div>
  )
}

export default MyCourses