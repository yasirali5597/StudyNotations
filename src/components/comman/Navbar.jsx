import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
// import NavbarLinks from "../../data/navbar-links";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import { ACCOUNT_TYPE } from "../../utils/constants";

// const subLinks = [
//   {
//     title: "pyhton",
//     link: "/catalog/pyhton",
//   },
//   {
//     title: "web dev ",
//     link: "/catalog/web-development",
//   },
// ];

const Navbar = () => {
  const token = useSelector((state) => state.auth?.token);
  const user = useSelector((state) => state.profile?.user);
  const totalItems = useSelector((state) => state.cart?.totalItems);
  const location = useLocation();
  // const [subLinks , setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [subLinks, setSubLinks] = useState([]);

  //   const fetchSubLinks = async () => {
  //     try {
  // const result = await apiConnector("GET", categories.CATEGORIES_API);
  //       console.log("printing sublinks results", result);
  //       setSubLinks(result?.data?.data || []);
  //     } catch (error) {
  //       console.log("could not fetch the category list");
  //     }
  //   };

  // useEffect(() => {
  //   fetchSubLinks();
  // }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        // console.log("catelog data ", res.data.data);
        setSubLinks(res.data?.data || []);
      } catch (errors) {
        console.log(
          "catalog  data is not show could not fetch catogories ",
          errors,
        );
      }
      setLoading(false);
    })();
  }, []);

  // const location = useLocation();
  const matchRoute = (route) => {
    return location.pathname === route;
  };
  // return (
  //   <div className="flex items-center justify-center border-b bg-black py-2">
  //     <div className="flex justify-between w-11/12 max-w-maxContent text-center">
  //       {/* Logo */}
  //       <Link to="/">
  //         <img src={Logo} alt="Logo" width={160} height={42} loading="lazy" />
  //       </Link>

  //       {/* Nav Links */}

  //       <nav>
  //         <ul className="flex gap-x-6 text-white">
  //           {NavbarLinks.map((link, index) => (
  //             <li key={index}>
  //               {link.title === "Catalog" ? (
  //                 <div className="relative flex flex-row gap-1 items-center group">
  //                   <p className="cursor-pointer">{link.title}</p>
  //                   <div className="mt-1">
  //                     <MdKeyboardArrowDown  />
  //                   </div>
  //                   <div
  //                     className=" invisible absolute left-[50%] -translate-x-1/2 translate-y-[80%]
  //                    flex flex-col rounded-md bg-white p-4 text-gray-900
  //                     opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100
  //                     lg:w-[300px]  "
  //                   >
  //                     <div className="absolute left-1/2 top-1 -translate-x-1/2 -translate-y-1/2 h-6 w-4 rotate-45  bg-white  "></div>

  //                     {/* {
  //                       subLinks.length ? (
  //                         subLinks.map((subLinks,index) => (
  //                           <Link to={`${subLinks.link}`} key={index }>
  //                              <p className="text-black">{subLinks.title}</p>
  //                           </Link>
  //                         ) )
  //                       ): (<div className="text-red-600">no links found </div>)
  //                     }
  //                      */}
  //                     {loading ? (
  //                       <p className="text-center">Loading...</p>
  //                     ) : subLinks.length ? (
  //                       <>
  //                         {/* {subLinks */}
  //                           {/* ?.filter((subLink) => subLink?.courses?.length > 0) */}
  //                          { subLinks.map((subLink, i) => (
  //                             <Link
  //                               to={`./catalog/${subLink.name
  //                                 .split(" ")
  //                                 .join("-")
  //                                 .toLowerCase()} `}
  //                               className="rounded-lg bg-transparent py-1 pl-4 hover:bg-gray-100"
  //                               key={i}
  //                             >
  //                               <p>{subLink.name}</p>
  //                             </Link>
  //                           ))}
  //                       </>
  //                     ) : (
  //                       <p className="text-center">No Course Found</p>
  //                     )}
  //                   </div>
  //                 </div>
  //               ) : (
  //                 <Link to={link?.path}>
  //                   <p
  //                     className={`${
  //                       matchRoute(link?.path)
  //                         ? "text-yellow-600 border-b-2 border-yellow-500 border-dashed"
  //                         : "text-white"
  //                     }`}
  //                   >
  //                     {link.title}
  //                   </p>
  //                 </Link>
  //               )}
  //             </li>
  //           ))}
  //         </ul>
  //       </nav>

  //       {/* // login signup dashboard  */}
  //       <div className="hidden items-center gap-x-4 md:flex">

  //       {
  //         user  && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR  && (
  //           <Link to="/dashboard/cart" className="relative">
  //             <AiOutlineShoppingCart className="text-2xl text-gray-100 "/>
  //             {totalItems >  0 && (
  //               <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-gray-600 text-center text-xs">
  //                 {totalItems}
  //               </span>
  //             )}

  //           </Link>
  //         )
  //       }
  //       {
  //         token === null && (
  //           <Link to="/login">
  //             <button className="rounded-[8px] border border-gray-700 bg-gray-800 px-[8px] text-gray-100">
  //             Log in </button>
  //           </Link>
  //         )
  //       }
  //       {
  //         token === null && (
  //           <Link to="/login">
  //             <button className="rounded-[8px] border border-gray-700 bg-gray-800 px-[8px] text-gray-100">
  //             Sign in </button>
  //           </Link>
  //         )
  //       }
  //       {token !== null && <ProfileDropDown/>}

  //       </div>

  //       <button className="mr-4 md:hidden">
  //         <aiOutlineMenu fontSize={24} fill="#AFB2BF"/>
  //       </button>

  //     </div>
  //   </div>
  // );

  // return (
  //     <div className="flex items-center justify-center border-b border-gray-700 bg-black py-3">
  //       <div  className="flex w-11/12 max-w-maxContent items-center justify-between">

  //       {/* logo */}
  //        <Link to="/">
  //         <img src={Logo} alt="logo" width={160} height={42} loading="lazy"/>

  //        </Link>

  //        {/* Nav links */}

  //        <nav>
  //           <ul className="flex items-center gap-x-6 text-white">
  //             {
  //               NavbarLinks.map( (link , index ) => (
  //                 <li key={index}>
  //                   {link.title === "Catalog" ? (
  //                     <div className="group relative flex items-center gap-1">
  //                       <p className="cursor-pointer">{link.title}</p>
  //                       <MdKeyboardArrowDown className="transition-all duration-200 group-hover:rotate-180"/>

  //                       {/* dropdown */}
  //                       <div
  //                       className="invisible absolute left-1/2 top-full z-50 mt-3
  //                        flex w-[280px] -translate-x-1/2 flex-col rounded-lg bg-white
  //                        p-3 text-gray-900 shadow-xl opocity-0 transition-all
  //                        duration-200 group-hover:visible group-hover:opocity-100
  //                       ">

  //                       {/* Arrow */}
  //                       <div
  //                        className="absolute left-1/2 top-0 h-4 w-4
  //                        -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white"
  //                       >

  //                       </div>

  //                       </div>
  //                     </div>
  //                   )}
  //                 </li>
  //               ))
  //             }

  //           </ul>
  //        </nav>

  //       </div>

  //     </div>
  // )

  return (
    <div className="flex items-center justify-center border-b border-gray-700 bg-black py-3">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={Logo} alt="Logo" width={160} height={42} loading="lazy" />
        </Link>

        {/* Nav Links */}
        <nav>
          <ul className="flex items-center gap-x-6 text-white">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="group relative flex items-center gap-1">
                    <p className="cursor-pointer">{link.title}</p>

                    <MdKeyboardArrowDown className="transition-all duration-200 group-hover:rotate-180" />

                    {/* Dropdown */}
                    <div
                      className="
                      invisible absolute left-1/2 top-full z-50 mt-2
                      flex w-[280px] -translate-x-1/2 flex-col
                      rounded-lg bg-white p-3 text-gray-900 shadow-xl
                      opacity-0 transition-all duration-200
                      group-hover:visible group-hover:opacity-100 border border-emerald-600 border-3px 
                    "
                    >
                      {/* Arrow */}
                      <div
                        className="
                        absolute left-[167px] top-0 h-4 w-4
                        -translate-x-1/2 -translate-y-1/2
                        rotate-45 bg-white
                      "
                      ></div>

                      {loading ? (
                        <p className="text-center py-2">Loading...</p>
                      ) : subLinks?.length > 0 ? (
                        subLinks.map((subLink, i) => (
                          <Link
                            key={i}
                            to={`/catalog/${subLink.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                            className="rounded-md px-4 py-2 transition-all duration-200 hover:bg-gray-100"
                          >
                            <p>{subLink.name}</p>
                          </Link>
                        ))
                      ) : (
                        <p className="text-center py-2">No Course Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "border-b-2 border-dashed border-yellow-500 text-yellow-400"
                          : "text-white"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Login Signup Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-gray-100" />

              {totalItems > 0 && (
                <span
                  className="
                    absolute -bottom-2 -right-2
                    grid h-5 w-5 place-items-center
                    rounded-full bg-yellow-500
                    text-xs font-bold text-black
                  "
                >
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null && (
            <>
              <Link to="/login">
                <button
                  className="
                  rounded-md border border-gray-700
                  bg-gray-800 px-4 py-2
                  text-sm text-white
                  transition-all duration-200
                  hover:bg-gray-900
                "
                >
                  Log In
                </button>
              </Link>

              <Link to="/signup">
                <button
                  className="
                  rounded-md border border-gray-700
                  bg-gray-800 px-4 py-2
                  text-sm text-white
                  transition-all duration-200
                  hover:bg-gray-900
                "
                >
                  Sign Up
                </button>
              </Link>
            </>
          )}

          {token !== null && <ProfileDropDown />}
        </div>

        {/* Mobile Menu */}
        <button className="block md:hidden"> 
          <AiOutlineMenu size={24} color="#AFB2BF" />
          </button>
      </div>
    </div>
  );
};

export default Navbar;

//  {/* <nav>
// <ul>

//   {
//     NavbarLinks.map((link , index) => (
//       <li>
//         {link.title === "catalog"? (
//           <div>
//             <p>{link.title}</p>
//           </div>
//         ): (
//           <Link to={link?.path}>
//             <p className={`${
//             matchRoute(link?.path) ? "text-yellow-100" : "text-richblack-25" }`}>
//               {link.title}
//             </p>
//           </Link>
//         )
//         })
//       </li>
//     )
//   }
// </ul>
// </nav> */}

{
  /* login signup dashboard */
}

{
  /* <div className="flex gap-x-4 items-center ">
          {user && user?.accountType !== "instructor " && (
            <Link to="/dashboard/cart" className="relative ">
              {/* <AiOutlineShoppingCart /> */
}
{
  /* {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )} */
}

{
  /* {token === null && (
            <Link to="/login">
              <button className="border border-richblack-700  px-[12px] py-[8px] text-white  rounded-xl  bg-black hover:bg-gray-600 ">
                Log in
              </button>
            </Link>
          )}

          {token === null && (
            <Link to="/signup">
              <button className="border border-richblack-700  px-[12px] py-[8px] text-white  rounded-xl bg-black hover:bg-gray-600">
                sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropDown />}
        </div> */
}
