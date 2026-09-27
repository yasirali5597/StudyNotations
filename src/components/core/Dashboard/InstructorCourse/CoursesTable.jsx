import React , {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import course from '../../../../../server/models/course';

   export default CoursesTable = ({courses , setCourses}) => {

    const dispatch = useDispatch();
    const {token} = useSelector( (state) => state.auth)
    const [loading , setLoading ] = useState(false)
    const [confirmModal, setConfirmationModal] = useState(null );
  return (
    <div>
        
        <Table>
        <Thead>
            <Tr>
                <Th>
                    Course
                </Th>
                 <Th>
                    Duration
                 </Th>
                 <Th>
                    Price
                 </Th>
                 <Th>
                    Actions
                 </Th>

            </Tr>
        </Thead>

        <Tbody>
        {
            courses.length === 0 ? (
                <Tr>
                    <Td>
                        No Course Found
                    </Td>
                </Tr>
            )
            :(
                courses?.map( (course) => (
                    <Tr key={course._id} className='flex gap-x-10 border-gray-800 p-8'> 
                    <Td className='flex gap-x-4'>
                        <img
                         src={course?.thumbnail}
                         className='h-[150px] w-[220px] rounded-lg object-cover '
                         />

                         <div
                          className='flex flex-col'>
                          <p>{course.courseName}</p>
                          <p>{course.courseDescription}</p>
                          <p>Created: </p>

                          {
                            course.status ===   COURSE_STATUS.DRAFT ? (
                                <p>DRAFTED</p>
                            )
                            : 
                            (
                                <P className="text-yellow-200"> published</P>
                            )
                          }

                        </div>

                    </Td>
                    </Tr>
                ))
            )
        }


        </Tbody>





        </Table>
    </div>
  )
}

  