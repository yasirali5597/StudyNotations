import React, { useEffect, useState } from 'react'

const RequirementField = ({name, label, register, errors, setValue, getValues}) => {
    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);


    useEffect(()=> {
        register(name, {
            required:true,
            // validate: (value) => value.length > 0
        })
    },[])

    useEffect(()=> {
        setValue(name, requirementList);
    },[requirementList])

    const handleAddRequirement = () => {
        if(requirement) {
            setRequirementList([...requirementList, requirement]);
            setRequirement("");
        }
    }

    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index, 1);
        setRequirementList(updatedRequirementList);
    }

  return (
    <div>

        <label htmlFor={name} >{label}<sup className="text-red-500">*</sup></label>
        <div>
            <input
                type='text'
                id={name}
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                className='w-full bg-gray-500 rounded-md border-gray-700 bg-gray-100 p-3 mt-2 text-black '
            />
            <button
            type='button'
            onClick={handleAddRequirement}
            className='font-semibold text-yellow-500 mt-2   rounded-md'>
                Add
            </button>
        </div>


        {
            requirementList.length > 0 && (
                <ul>
                    {
                        requirementList.map((requirement, index) => (
                            <li key={index} className='flex items-center text-richblack-5'>
                                <span className="text-blue-400">{requirement}</span>
                                <button
                                type='button'
                                onClick={() => handleRemoveRequirement(index)}
                                className='text-xs text-pure-greys-300 ml-2 hover:text-red-500'>
                                    clear
                                </button>
                            </li>
                        ))
                    }
                </ul>
            )
        }
        {errors[name] && (
            <span>
                {label} is required
            </span>
        )}
      
    </div>
  )
}

export default RequirementField
