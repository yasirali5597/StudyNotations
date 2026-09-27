// import React ,{useState, useEffect } from 'react'
// import {useForm} from "react-hook-form"

// const ContactUsForm = ()=> {
//     const [ loading , setLoading ] = useState(false);
//     const {
//         register,
//         handleSubmit,
//         reset,
//         formState:{errors, isSubmitSuccessful }
//     } = useForm();

//     useEffect ( () => {
//         if(isSubmitSuccessful ) {
//             reset ({
//                 email : "",
//                 firstname:"",
//                 lastname:"",
//                 message:"",
//                 phoneNo:"",
//             })
//         }
//     }, [reset , isSubmitSuccessful] ) ;
// }

// const submitContactForm = async(data) =>{
//     console.log(data);
// }

// const ContactFormSection = () => {
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>

//     <div>

//         <div className='flex flex-col '>
//             {/* firstName */}
//             <label htmlFor='firstname'>First Name</label>
//             <input
//             type="text"
//             name="firstname"
//             id="firstname"
//             placeholder="enter your name"
//             {...register("firstname" , {required: true})}

//             />
//             {errors.firstname && (
//                 <span> Please enter your form </span>
//             )}
//         </div>

//         <div>
//             {/* firstName */}
//             <label htmlFor='lastname'>First Name</label>
//             <input
//             type="text"
//             name="lastname"
//             id="lastname"
//             placeholder="enter your name"
//             {...register ("lastname")}

//             />

//         </div>

//          <div>
//             {/* firstName */}
//             <label htmlFor='email'>Email</label>
//             <input
//             type="email"
//             name="email"
//             id="email"
//             placeholder="enter your email"
//             {...register ("email" , {required:true})}

//             />
//             {
//                 errors.email && (
//                     <span>Please enter your email address</span>
//                 )
//             }

//         </div>

//         <div>
//             <label htmlFor='message'> Message</label>
//             <textarea
//             name='message'
//             id='message'
//             cols="37"
//             rows="7"
//             placeholder='enter your message'
//             {...register ("message" , {required:true})}
//             />
//             {
//                 errors.message && (
//                     <span>Please enter your messages</span>
//                 )
//             }
//         </div>

//         <button type='Submit'>
//         Send Messages

//         </button>

//     </div>

//     </form>

//   )

// }

// export default ContactFormSection;

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import CountryCode from "../../../data/countrycode.json";
import { apiConnector } from "../../../services/apiconnector";
import { contactusEndpoint } from "../../../services/apis";
// import { apiConnector } from "../../services/apiconnector"
// import { contactusEndpoint } from "../../services/apis"

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    console.log("logging data", data);
    try {
      setLoading(true);
      const response = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data,
      );
      console.log("logging response ", response);
      setLoading(false);
    } catch (error) {
      console.log("Error ", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center  w-screen ">
        <div className="font-bold text-3xl mb-8 bg-gradient-to-r from-red-500 p-2 rounded-lg to-green-500 ">Get In Touch</div>
        <p className="text-gray-300 mb-8 text-xs " ><span className="text-green-400">we'd love to hear from you!</span> Please fill out the form below and we'll get in touch with you <span className="text-blue-400">as soon as possible.</span></p>
        <form
          className="flex flex-col gap-7 p-7 rounded-lg bg-gray-800  text-center "
          onSubmit={handleSubmit(submitContactForm)}
        >
          <div className="flex flex-col gap-5 ">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="firstname"
                className="lable-style text-gray-400 text-start ml-2  pb-1"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="Enter first name"
                className="form-style h-10 rounded-lg bg-gray-600 p-5"
                {...register("firstname", { required: true })}
              />
              {errors.firstname && (
                <span className="-mt-1 text-[12px] text-yellow-400">
                  Please enter your name.
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 ">
              <label
                htmlFor="lastname"
                className="lable-style text-gray-400 text-start ml-2  pb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Enter last name"
                className="form-style h-10 rounded-lg bg-gray-600 p-5"
                {...register("lastname")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="lable-style text-gray-400 text-start ml-2  pb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email address"
              className="form-style h-10 rounded-lg bg-gray-600 p-5"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your Email address.
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="phonenumber"
              className="lable-style text-gray-400 text-start ml-2  pb-1 "
            >
              Phone Number
            </label>

            <div className="flex gap-5 text-black">
              <div className="flex w-[81px] flex-col gap-2">
                <select
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="Enter first name"
                  className="form-style h-10 rounded-lg bg-gray-600 p-5"
                  {...register("countrycode", { required: true })}
                >
                  {CountryCode.map((ele, i) => {
                    return (
                      <option key={i} value={ele.code}>
                        {ele.code} -{ele.country}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                <input
                  type="number"
                  name="phonenumber"
                  id="phonenumber"
                  placeholder="12345 67890"
                  className="form-style h-10 rounded-lg bg-gray-600 p-5"
                  {...register("phoneNo", {
                    required: {
                      value: true,
                      message: "Please enter your Phone Number.",
                    },
                    maxLength: { value: 12, message: "Invalid Phone Number" },
                    minLength: { value: 10, message: "Invalid Phone Number" },
                  })}
                />
              </div>
            </div>
            {errors.phoneNo && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                {errors.phoneNo.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="lable-style text-gray-400 text-start ml-2  pb-1"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="7"
              placeholder="Enter your message here"
              className="form-style rounded-lg bg-gray-600 p-5"
              {...register("message", { required: true })}
            />
            {errors.message && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your Message.
              </span>
            )}
          </div>

          <button
            disabled={loading}
            type="submit"
            className={`rounded-md bg-yellow-500 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px] `}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUsForm;
