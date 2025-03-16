import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    password2: "",
    age: "",
    idnumber: "",
    gender: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to handle input changes
  const changeInputHandler = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  // Function to handle registration
  const registerVoter = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true);

    // Basic validation
    if (
      !userData.fullName ||
      !userData.email ||
      !userData.password ||
      !userData.password2 ||
      !userData.age ||
      !userData.idnumber ||
      !userData.gender
    ) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    if (userData.password !== userData.password2) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/voters/register`,
        userData
      );
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="register">
      <div className="container register_container">
        <h2>Sign Up</h2>
        <form onSubmit={registerVoter}>
          {error && <p className="form_error-message">{error}</p>}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            autoComplete="true"
            onChange={changeInputHandler}
            autoFocus
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={changeInputHandler}
            autoComplete="true"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={changeInputHandler}
            autoComplete="true"
          />
          <input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            onChange={changeInputHandler}
            autoComplete="true"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            autoComplete="true"
            onChange={changeInputHandler}
          />
          <input
            type="number"
            name="idnumber"
            placeholder="Voter Id Number"
            autoComplete="true"
            onChange={changeInputHandler}
          />
          <select name="gender" onChange={changeInputHandler}>
            <option value="">Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {/* <p className="">
            <Link className="forgot-password" to="/reset-password">
              Forgot Password
            </Link>
          </p> */}
          <p>
            Already have an account? <Link to="/">Sign in</Link>
          </p>
          <button type="submit" className="btn primary" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const Register = () => {
//   const [userData, setUserData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     password2: "",
//     age: "",
//     idnumber: "",

//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Function to handle input changes
//   const changeInputHandler = (e) => {
//     setUserData((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value.trim(),
//     }));
//   };

//   // Function to handle registration
//   const registerVoter = async (e) => {
//     e.preventDefault();
//     setError(""); // Clear previous errors
//     setLoading(true);

//     // Basic validation
//     if (
//       !userData.fullName ||
//       !userData.email ||
//       !userData.password ||
//       !userData.password2 ||
//       !userData.age ||
//       !userData.idnumber

//     ) {
//       setError("All fields are required.");
//       setLoading(false);
//       return;
//     }

//     if (userData.password !== userData.password2) {
//       setError("Passwords do not match.");
//       setLoading(false);
//       return;
//     }
//     // const APP_URL = process.env.REACT_APP_API_URL;
//     try {
//       await axios.post(
//         `${process.env.REACT_APP_API_URL}/voters/register`,
//         userData
//         // {
//         // headers: {
//         //   "Content-Type": "application/json",
//         // },}
//       );
//       navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="register">
//       <div className="container register_container">
//         <h2>Sign Up</h2>
//         <form onSubmit={registerVoter}>
//           {error && <p className="form_error-message">{error}</p>}
//           <input
//             type="text"
//             name="fullName"
//             placeholder="Full Name"
//             autoComplete="true"
//             onChange={changeInputHandler}
//             autoFocus
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             onChange={changeInputHandler}
//             autoComplete="true"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             onChange={changeInputHandler}
//             autoComplete="true"
//           />
//           <input
//             type="password"
//             name="password2"
//             placeholder="Confirm Password"
//             onChange={changeInputHandler}
//             autoComplete="true"
//           />
//           <input
//             type="number"
//             name="age"
//             placeholder="Age"
//             autoComplete="true"
//             onChange={changeInputHandler}
//           />
//           <input
//             type="number"
//             name="idnumber"
//             placeholder="Voter Id Number"
//             autoComplete="true"
//             onChange={changeInputHandler}
//           />

//           <p>
//             Already have an account? <Link to="/">Sign in</Link>
//           </p>
//           <button type="submit" className="btn primary" disabled={loading}>
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default Register;
