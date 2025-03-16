import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import "./ResetPassword.css"; // Import CSS file

const ResetPassword = () => {
  const navigate = useNavigate();
  // const [userData, setUsreData] = useState({
  //   email: "",
  // });
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSend, setIsEmailSend] = useState("");
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const inputRefs = React.useRef([]);
  const voterId = useSelector((state) => state?.vote?.currentVoter?.id);
  // const token =
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Y2RhZTc0MTRkNGJlNDkyMDlmZjQ1MSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3NDE4NTE3OTEsImV4cCI6MTc0MjQ1NjU5MX0.BXrhrRzYz6us67ReBKKFdG9fXLOJlebsj201HUgP6Fk";
  // const token = useSelector((state) => state?.vote?.currentVoter?.token);
  // const email = useSelector((state) => state?.vote?.currentVoter?.email);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  // const changeInputHandler = (e) => {
  //   setEmail((prevState) => {
  //     return { ...prevState, [e.target.name]: e.target.value };
  //   });
  // };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    // console.log(token);
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/voters/send-reset-otp`,
        { email },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        console.log("OTP send successfully", response.data.message);
        setIsEmailSend(true);
        // navigate("/elections");
      }
    } catch (error) {
      console.error(
        // "Error verifying OTP:",
        error.response?.data?.message || error.message
      );
    }
  };
  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    setOtp(otpArray.join(""));
    setIsOtpSubmitted(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/voters/reset-password`,
        { email, otp, newPassword },
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        console.log("Passed reset successfully", response.data.message);
        // setIsEmailSend(true);
        navigate("/");
      }
    } catch (error) {}
  };
  return (
    <div className="reset-container">
      <div className="reset-box">
        <div className="">
          {!isEmailSend && (
            <form onSubmit={onSubmitEmail}>
              <h1>Reset Password</h1>
              <p>Enter your registered email address</p>
              <div className="input-group">
                <input
                  type="email"
                  // name="email"
                  placeholder="Enter your email"
                  value={email}
                  // onChange={changeInputHandler}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </form>
          )}
        </div>

        <div className="">
          {!isOtpSubmitted && isEmailSend && (
            <form onSubmit={onSubmitOtp}>
              <h1>Reset Password OTP</h1>
              <p>Enter the 6-digit code sent to your email.</p>
              <div className="otp-inputs" onPaste={handlePaste}>
                {Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <input
                      type="text"
                      maxLength="1"
                      key={index}
                      required
                      ref={(e) => (inputRefs.current[index] = e)}
                      onInput={(e) => handleInput(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="otp-box"
                    />
                  ))}
              </div>
              <button type="submit" className="submit-btn">
                Verify Email
              </button>
            </form>
          )}
        </div>
        <div className="">
          {isOtpSubmitted && isEmailSend && (
            <form onSubmit={onSubmitNewPassword}>
              <h1>New Password</h1>
              <p>Enter a new password below</p>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const ResetPassword = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState();
//   const [newPassword, setNewPassword] = useState();
//   // const navigate = useNavigate();
//   const inputRefs = React.useRef([]);
//   const voterId = useSelector((state) => state?.vote?.currentVoter?.id);
//   const token = useSelector((state) => state?.vote?.currentVoter?.token);

//   const handleInput = (e, index) => {
//     if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && e.target.value === "" && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handlePaste = (e) => {
//     const paste = e.clipboardData.getData("text");
//     const pasteArray = paste.split("");
//     pasteArray.forEach((char, index) => {
//       if (inputRefs.current[index]) {
//         inputRefs.current[index].value = char;
//       }
//     });
//   };
//   return (
//     <div>
//       <br />
//       <br />
//       <br />
//       <form action="">
//         <h1>Reset Password</h1>
//         <p>Enter your registered email address</p>
//         <div>
//           <input
//             type="email"
//             placeholder="Enter your email "
//             value={email}
//             obChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <button>Submit</button>
//       </form>
//       <br />
//       <br />
//       <form>
//         <h1>Reset Password OTP</h1>
//         <p>Enter the 6-digit code sent to your email id.</p>
//         <div onPaste={handlePaste}>
//           {Array(6)
//             .fill(0)
//             .map((_, index) => (
//               <input
//                 type="text"
//                 maxLength="1"
//                 key={index}
//                 required
//                 ref={(e) => (inputRefs.current[index] = e)}
//                 onInput={(e) => handleInput(e, index)}
//                 onKeyDown={(e) => handleKeyDown(e, index)}
//               />
//             ))}
//         </div>
//         <button type="submit">Verify Email</button>
//       </form>

//       {/* enter new password */}
//       <form action="">
//         <h1>New Password</h1>
//         <p>Enter new password</p>
//         <div>
//           <input
//             type="password"
//             placeholder="Enter new password "
//             value={newPassword}
//             obChange={(e) => setNewPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button>Submit</button>
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;
