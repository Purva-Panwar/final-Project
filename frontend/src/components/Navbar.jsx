import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoIosMoon } from "react-icons/io";
import { IoMdSunny } from "react-icons/io";
import { HiOutlineBars3 } from "react-icons/hi2";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import axios from "axios";
import "../store/vote-slice";

const Navbar = () => {
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(
    window.innerWidth < 600 ? false : true
  );

  const [isAccountVerified, setIsAccountVerified] = useState(false);

  const voterId = useSelector((state) => state?.vote?.currentVoter?.id);
  const token = useSelector((state) => state?.vote?.currentVoter?.token);

  const closeNavMenu = () => {
    if (window.innerWidth < 600) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  };

  const sendVerificationOtp = async (voterId, token) => {
    if (!voterId) {
      console.error("Voter email is missing.");
      alert("Your email is missing. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/voters/send-otp`,
        { voterId },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        console.log(response.data.message);
        navigate("/email-verify");
      }
    } catch (error) {
      console.error(
        "Error sending OTP:",
        error.response?.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    const fetchVerificationStatus = async () => {
      try {
        if (!token || !voterId) {
          console.log("Token or Voter ID not found");
          return;
        }

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/voters/${voterId}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setIsAccountVerified(response.data.isAccountVerified);
      } catch (error) {
        console.error("Error fetching verification status:", error);
      }
    };

    fetchVerificationStatus();
  }, [token, voterId]); // ✅ Include voterId in dependencies

  return (
    <nav>
      <div className="container nav_container">
        <Link to="/" className="nav_logo">
          <h1>Smart-Vote</h1>
        </Link>

        <div>
          {token && isAccountVerified && showNav && (
            <menu>
              <NavLink to="/home" onClick={closeNavMenu}>
                Home
              </NavLink>
              <NavLink to="/elections" onClick={closeNavMenu}>
                Elections
              </NavLink>
              <NavLink to="/results" onClick={closeNavMenu}>
                Results
              </NavLink>
              <NavLink to="/logout" onClick={closeNavMenu}>
                Logout
              </NavLink>

              {/* ✅ Only show Verify Email button if voterEmail exists and is not verified */}
            </menu>
          )}
          {!isAccountVerified && token && (
            <NavLink
              to="/email-verify"
              onClick={(e) => {
                e.preventDefault();
                sendVerificationOtp(voterId, token);
                // setShowNav(false);
              }}
            >
              Verify Email
            </NavLink>
          )}

          {/* <button
            className="theme_toggle-btn"
            onClick={
              changeThemeHandler
              //   () => {
              //   const newTheme =
              //     localStorage.getItem("voting-app-theme") === "dark"
              //       ? ""
              //       : "dark";
              //   localStorage.setItem("voting-app-theme", newTheme);
              //   setDarkTheme(newTheme);
              // }
            }
          >
            {darkTheme ? <IoMdSunny /> : <IoIosMoon />}
          </button> */}

          <button
            className="nav_toggle-btn"
            onClick={() => setShowNav(!showNav)}
          >
            {showNav ? <AiOutlineClose /> : <HiOutlineBars3 />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// import React, { useEffect, useState } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { IoIosMoon } from "react-icons/io";
// import { IoMdSunny } from "react-icons/io";
// import { HiOutlineBars3 } from "react-icons/hi2";
// import { AiOutlineClose } from "react-icons/ai";
// import { useSelector } from "react-redux";
// import axios from "axios";
// // import { errorHandler } from "../../../backend/middleware/errorMiddleware";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [showNav, setShowNav] = useState(
//     window.innerWidth < 600 ? false : true
//   );
//   const [darkTheme, setDarkTheme] = useState(
//     localStorage.getItem("voting-app-theme") || ""
//   );

//   const [isAccountVerified, setIsAccountVerified] = useState(false); // Store email verification status
//   const token = useSelector((state) => state?.vote?.currentVoter?.token);
//   const voterEmail = useSelector((state) => state?.vote?.currentVoter?.email);
//   // const voterEmail = useSelector((state) => state?.vote?.currentVoter?.email);

//   const sendVerificationOtp = async (email, token) => {
//     console.log(email);

//     try {
//       // Get the voter's email from the Redux store

//       if (!email) {
//         console.error("Voter email is missing.");
//         return;
//       }

//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/voters/send-otp`,
//         { email }, // ✅ Send email in request body
//         {
//           withCredentials: true,
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (response.data.success) {
//         // ✅ Corrected success check
//         console.log(response.data.message);
//         navigate("/email-verify");
//       }
//     } catch (error) {
//       console.error(
//         "Error sending OTP:",
//         error.response?.data?.message || error.message
//       );
//     }
//   };

//   // const sendVerificationOtp = async () => {
//   //   try {
//   //     const response = await axios.post(
//   //       `${process.env.REACT_APP_API_URL}/voters/send-otp`,
//   //       {},
//   //       {
//   //         withCredentials: true,
//   //         headers: { Authorization: `Bearer ${token}` },
//   //       }
//   //     );
//   //     if (response.success) {
//   //       navigate("/email-verify");
//   //       console.log(response.message);
//   //     }
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };
//   // Function to close nav menu on small screens
//   const closeNavMenu = () => {
//     if (window.innerWidth < 600) {
//       setShowNav(false);
//     } else {
//       setShowNav(true);
//     }
//   };

//   // Function to change theme
//   const changeThemeHandler = () => {
//     if (localStorage.getItem("voting-app-theme") === "dark") {
//       localStorage.setItem("voting-app-theme", "");
//     } else {
//       localStorage.setItem("voting-app-theme", "dark");
//     }
//     setDarkTheme(localStorage.getItem("voting-app-theme"));
//   };

//   useEffect(() => {
//     document.body.className = localStorage.getItem("voting-app-theme");
//   }, [darkTheme]);
//   const voterId = useSelector((state) => state?.vote?.currentVoter?.id);
//   // Fetch user verification status from the backend
//   useEffect(() => {
//     const fetchVerificationStatus = async () => {
//       try {
//         if (!token || !voterId) {
//           console.log("token , voterid not found");
//         }

//         const response = await axios.get(
//           `${process.env.REACT_APP_API_URL}/voters/${voterId}`,
//           {
//             withCredentials: true,
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         setIsAccountVerified(response.data.isAccountVerified);
//       } catch (error) {
//         console.error("Error fetching verification status:", error);
//       }
//     };

//     fetchVerificationStatus();
//   }, [token]);

//   return (
//     <nav>
//       <div className="container nav_container">
//         <Link to="/" className="nav_logo">
//           <h1>Smart-Vote</h1>
//         </Link>
//         <div>
//           {token && showNav && (
//             <menu>
//               <NavLink to="/elections" onClick={closeNavMenu}>
//                 Elections
//               </NavLink>
//               <NavLink to="/results" onClick={closeNavMenu}>
//                 Results
//               </NavLink>
//               <NavLink to="/logout" onClick={closeNavMenu}>
//                 Logout
//               </NavLink>

//               {/* Show Verify Email only if the user is NOT verified */}
//               {!isAccountVerified && (
//                 <NavLink
//                   to="/email-verify"
//                   onClick={(e) => {
//                     e.preventDefault(); // Prevents navigation if needed
//                     sendVerificationOtp(voterEmail, token);
//                     closeNavMenu();
//                   }}
//                   // onClick={(sendVerificationOtp, closeNavMenu)}
//                 >
//                   Verify Email
//                 </NavLink>
//               )}
//             </menu>
//           )}

//           <button className="theme_toggle-btn" onClick={changeThemeHandler}>
//             {darkTheme ? <IoMdSunny /> : <IoIosMoon />}
//           </button>
//           <button
//             className="nav_toggle-btn"
//             onClick={() => setShowNav(!showNav)}
//           >
//             {showNav ? <AiOutlineClose /> : <HiOutlineBars3 />}
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// // import React, { useContext, useEffect, useState } from "react";
// // import { Link, NavLink, useNavigate } from "react-router-dom";
// // import { IoIosMoon } from "react-icons/io";
// // import { IoMdSunny } from "react-icons/io";
// // import { HiOutlineBars3 } from "react-icons/hi2";
// // import { AiOutlineClose } from "react-icons/ai";
// // import { useSelector } from "react-redux";
// // import { AppContext } from "../context/AppContext";

// // const Navbar = () => {

// //   const [showNav, setShowNav] = useState(
// //     window.innerWidth < 600 ? false : true
// //   );
// //   const [darkTheme, setDarkTheme] = useState(
// //     localStorage.getItem("voting-app-theme") || ""
// //   );
// //   const token = useSelector((state) => state?.vote?.currentVoter?.token);

// //   //function to close nav menu on small screens when menu link
// //   const closeNavMenu = () => {
// //     if (window.innerWidth < 600) {
// //       setShowNav(false);
// //     } else {
// //       setShowNav(true);
// //     }
// //   };

// //   //function to change toggle theme
// //   const changeThemeHandler = () => {
// //     if (localStorage.getItem("voting-app-theme") === "dark") {
// //       localStorage.setItem("voting-app-theme", "");
// //     } else {
// //       localStorage.setItem("voting-app-theme", "dark");
// //     }
// //     setDarkTheme(localStorage.getItem("voting-app-theme"));
// //   };

// //   useEffect(() => {
// //     document.body.className = localStorage.getItem("voting-app-theme");
// //   }, [darkTheme]);

// //   return (
// //     <nav>
// //       <div className="container nav_container">
// //         <Link to="/" className="nav_logo">
// //           <h1>Smart-Vote</h1>
// //         </Link>
// //         <div>
// //           {token && showNav && (
// //             <menu>
// //               <NavLink to="/elections" onClick={closeNavMenu}>
// //                 {" "}
// //                 Elections{" "}
// //               </NavLink>
// //               <NavLink to="/results" onClick={closeNavMenu}>
// //                 Results
// //               </NavLink>
// //               <NavLink to="/logout" onClick={closeNavMenu}>
// //                 {" "}
// //                 Logout{" "}
// //               </NavLink>
// //               <NavLink to="/verify-email" onClick={closeNavMenu}>
// //                 {" "}
// //                 Verify Email{" "}
// //               </NavLink>
// //               {/* {voterData ? (
// //                 <div>{voterData.fullName[0].toUpperCase()}</div>
// //               ) : (
// //                 <NavLink to="/login" onClick={closeNavMenu}>
// //                   {" "}
// //                   Login{" "}
// //                 </NavLink>
// //               )} */}
// //             </menu>
// //           )}

// //           <button className="theme_toggle-btn" onClick={changeThemeHandler}>
// //             {darkTheme ? <IoMdSunny /> : <IoIosMoon />}
// //           </button>
// //           <button
// //             className="nav_toggle-btn"
// //             onClick={() => setShowNav(!showNav)}
// //           >
// //             {showNav ? <AiOutlineClose /> : <HiOutlineBars3 />}
// //           </button>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;
