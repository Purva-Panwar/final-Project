import React, { useEffect, useState } from "react";
import ResultElection from "../components/ResultElection";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Results = () => {
  const token = useSelector((state) => state?.vote?.currentVoter?.token);
  const navigate = useNavigate();
  //access control
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });
  const [elections, setElections] = useState([]);
  // const token = useSelector((state) => state?.vote?.currentVoter?.token);
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjZkYTMxNWI4MzM5YWM0MjgxOGMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc0MDczMTU5MCwiZXhwIjoxNzQwODE3OTkwfQ.SezEwQGXDDeeynE0_0PMXp16MXRFX9qISgy05AO5kqw";
  // const token = useSelector((state) => state?.vote?.currentVoter?.token);
  const API_URL = process.env.REACT_APP_API_URL;

  // console.log("API URL:", API_URL);
  // console.log("Token:", token);

  const getElections = async () => {
    if (!token) return; // Prevent API call if no token

    try {
      const response = await axios.get(`${API_URL}/elections`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true, // Remove if unnecessary
      });

      setElections(response.data);
    } catch (error) {
      console.error(
        "Error fetching elections:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if (token) {
      getElections();
    }
  }, [token]);

  return (
    <section className="results">
      <div className="container results_container">
        {elections.map((election) => (
          <ResultElection key={election._id} {...election} />
        ))}
      </div>
    </section>
  );
};

export default Results;

//youtube
// import React, { useEffect, useState } from "react";
// import ResultElection from "../components/ResultElection";
// // import { elections as dummyElections } from "../data";
// import { useSelector } from "react-redux";
// import axios from "axios";

// const Results = () => {
//   const [elections, setElections] = useState([]);
//   const token = useSelector((state) => state?.vote?.currentVoter?.token);
//   // const APP_URL = process.env.REACT_APP_API_URL;
//   const getElections = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_API_URL}/elections`,
//         {
//           withCredentials: true,
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       const elections = await response.data;
//       setElections(elections);
//     } catch (error) {
//       // console.error("Error Response:", error.response?.data || error.message);
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getElections();
//   }, []);
//   return (
//     <section className="results">
//       <div className=" container results_container">
//         {elections.map((election) => (
//           <ResultElection key={election._id} {...election} />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Results;
