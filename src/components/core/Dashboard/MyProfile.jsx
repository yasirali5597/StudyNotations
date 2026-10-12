import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../comman/IconsBtn";
import { RiEditBoxLine } from "react-icons/ri";
import { formattedDate } from "../../../utils/dateFormater";

export default function MyProfile() {

  // Get user data from redux
  const { user  } = useSelector((state) => state.profile);
  // const { user  } = useSelector((state) => state.profile);
  const { loading } = useSelector((state) => state.profile);

  const navigate = useNavigate();
  console.log("PROFILE USER => ", user)

  console.log("USER DATA => ", user);

  // Loading State
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  // If user not found
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        User Not Found dsfghj
      </div>
    );
  }

  return (
    <div className="mx-auto w-11/12 max-w-[1000px] py-10 text-white">

      {/* Page Heading */}
      <h1 className="mb-10 text-3xl font-medium">
        My Profile
      </h1>

      {/* Section 1 */}
      <div className="mb-10 flex items-center justify-between rounded-md border border-richblack-700 bg-richblack-800 p-8">

        <div className="flex items-center gap-x-4">

          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />

          <div>
            <p className="text-lg font-semibold">
              {user?.firstName} {user?.lastName}
            </p>

            <p className="text-sm text-richblack-300">
              {user?.email}
            </p>
          </div>

        </div>

        <IconBtn
          text="Edit"
          onClick={() => navigate("/dashboard/settings")}
        >
          <RiEditBoxLine />
        </IconBtn>

      </div>

      {/* About Section */}
      <div className="mb-10 rounded-md border border-richblack-700 bg-richblack-800 p-8">

        <div className="mb-5 flex items-center justify-between">

          <p className="text-lg font-semibold ">
            About
          </p>

          <IconBtn
            text="Edit"
            onClick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconBtn>

        </div>

        <p className="text-sm font-medium text-richblack-300">

          {user?.additionalDetails?.about
            ? user?.additionalDetails?.about
            : "Write Something About Yourself"}

        </p>

      </div>

      {/* Personal Details */}
      <div className="rounded-md border border-richblack-700 bg-richblack-800 p-8">

        {/* Header */}
        <div className="mb-5 flex items-center justify-between">

          <p className="text-lg font-semibold">
            Personal Details
          </p>

          <IconBtn
            text="Edit"
            onClick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconBtn>

        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-5">

          {/* First Name */}
          <div>
            <p className="mb-2 text-sm text-richblack-600">
              First Name
            </p>

            <p className="text-sm font-medium text-richblack-5">
              {user?.firstName || "N/A"}
            </p>
          </div>

          {/* Last Name */}
          <div>
            <p className="mb-2 text-sm text-richblack-600">
              Last Name
            </p>

            <p className="text-sm font-medium text-richblack-5">
              {user?.lastName || "N/A"}
            </p>
          </div>

          {/* Email */}
          <div>
            <p className="mb-2 text-sm text-richblack-600">
              Email
            </p>

            <p className="text-sm font-medium text-richblack-5">
              {user?.email || "N/A"}
            </p>
          </div>

          {/* Phone Number */}
          <div>
            <p className="mb-2 text-sm text-richblack-600">
              Phone Number
            </p>

            <p className="text-sm font-medium text-richblack-5">
              {user?.additionalDetails?.contactNumber || "N/A"}
            </p>
          </div>

          {/* Gender */}
          <div>
            <p className="mb-2 text-sm text-richblack-600">
              Gender
            </p>

            <p className="text-sm font-medium text-richblack-5">
              {user?.additionalDetails?.gender || "N/A"}
            </p>
          </div>

          {/* Date of Birth */}
          <div>
            <p className="mb-2 text-sm text-richblack-600">
              Date Of Birth
            </p>

            <p className="text-sm font-medium text-richblack-5">
              {user?.additionalDetails?.dateOfBirth
                ? formattedDate(user?.additionalDetails?.dateOfBirth)
                : "N/A"}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}








{/* <p>{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth " } </p> */}