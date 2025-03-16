import React, { useEffect, useState } from "react";
import CandidateRating from "./CandidateRating";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "./Loader";

const ResultElection = ({ _id: id, thumbnail, title, startDate, endDate }) => {
  const [totalVotes, setTotalVotes] = useState(0);
  const [electionCandidates, setElectionCandidates] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state?.vote?.currentVoter?.token);
  const isAdmin = useSelector((state) => state?.vote?.currentVoter?.isAdmin);

  // Convert dates to JavaScript Date objects
  const now = new Date();
  // const start = new Date(startDate);
  const end = new Date(endDate);

  // Election status
  // const isElectionActive = now >= start && now <= end;
  const isElectionEnded = now > end;

  const getCandidates = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/elections/${id}/candidates`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const candidates = await response.data;
      setElectionCandidates(candidates);

      let total = 0;
      candidates.forEach((candidate) => {
        total += candidate.voteCount;
      });
      setTotalVotes(total);
    } catch (error) {
      console.error(
        "Error fetching candidates:",
        error.response?.data || error.message
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id && token) {
      getCandidates();
    }
  }, [id, token]);

  return (
    <>
      {loading && <Loader />}
      <article className="result">
        {/* Show results only if election has ended or user is admin */}
        <header className="result_header">
          <h4>{title}</h4>
          <div className="result_header-image">
            <img src={thumbnail} alt={title} />
          </div>
        </header>
        {isElectionEnded ? (
          <div>
            <ul className="result_list">
              {electionCandidates.map((candidate) => (
                <CandidateRating
                  key={candidate._id}
                  {...candidate}
                  totalVotes={totalVotes}
                />
              ))}
            </ul>
          </div>
        ) : (
          <p className="info">
            <b> Results will be available after the election ends.</b>
          </p>
        )}
      </article>
    </>
  );
};

export default ResultElection;

// import React, { useEffect, useState } from "react";
// import CandidateRating from "./CandidateRating";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import Loader from "./Loader";

// const ResultElection = ({ _id: id, thumbnail, title }) => {
//   const [totalVotes, setTotalVotes] = useState(0);
//   const [electionCandidates, setElectionCandidates] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const token = useSelector((state) => state?.vote?.currentVoter?.token);

//   const getCandidates = async () => {

//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `${process.env.REACT_APP_API_URL}/elections/${id}/candidates`,
//         {
//           withCredentials: true,
//           headers: { Authorization: `Bearer ${token}` }, // Remove extra space
//         }
//       );

//       const candidates = await response.data;
//       setElectionCandidates(candidates);

//       for (let i = 0; i < candidates.length; i++) {
//         setTotalVotes((prevState) => (prevState += candidates[i].voteCount));
//       }

//     } catch (error) {
//       console.error(
//         "Error fetching candidates:",
//         error.response?.data || error.message
//       );
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (id && token) {
//       getCandidates();
//     }
//   }, [id, token]); // Include id and token as dependencies

//   return (
//     <>
//       {loading && <Loader />}
//       <article className="result">
//         <header className="result_header">
//           <h4>{title}</h4>
//           <div className="result_header-image">
//             <img src={thumbnail} alt={title} />
//           </div>
//         </header>
//         <ul className="result_list">
//           {electionCandidates.map((candidate) => (
//             <CandidateRating
//               key={candidate._id}
//               {...candidate}
//               totalVotes={totalVotes}
//             />
//           ))}
//         </ul>

//       </article>
//     </>
//   );
// };

// export default ResultElection;}

// //yourube
// import React, { useEffect, useState } from "react";
// import CandidateRating from "./CandidateRating";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import axios from "axios";

// const ResultElection = ({ _id: id, thumbnail, title }) => {
//   const [totalVotes, setTotalVotes] = useState(0);
//   const [electionCandidates, setElectionCandidates] = useState([]);
//   const token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjZkYTMxNWI4MzM5YWM0MjgxOGMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc0MDczMTU5MCwiZXhwIjoxNzQwODE3OTkwfQ.SezEwQGXDDeeynE0_0PMXp16MXRFX9qISgy05AO5kqw";
//   // const token = useSelector((state) => state?.vote?.currentVoter?.token);

//   const getCandidates = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_API_URL}/elections/${id}/candidates`,
//         {
//           withCredentials: true,
//           headers: { Authorization: `Bearer  ${token}` },
//         }
//       );

//       const candidates = await response.data;
//       setElectionCandidates(candidates);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getCandidates();
//   }, []);
//   // const electionCandidates = candidates.filter((candidate) => {
//   //   return candidate.election == id;
//   // });
//   return (
//     <article className="result">
//       <header className="result_header">
//         <h4>{title}</h4>
//         <div className="result_header-image">
//           <img src={thumbnail} alt={title} />
//         </div>
//       </header>
//       <ul className="result_list">
//         {electionCandidates.map((candidate) => (
//           <CandidateRating
//             key={candidate.id}
//             {...candidate}
//             totalVotes={totalVotes}
//           />
//         ))}
//       </ul>
//       <Link to={`/elections/${id}/candidates`} className="btn primary full">
//         Enter Election
//       </Link>
//     </article>
//   );
// };

// export default ResultElection;
