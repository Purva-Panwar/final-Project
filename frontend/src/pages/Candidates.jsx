import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Candidate from "../components/Candidate";
import ConfirmVote from "../components/ConfirmVote";

const Candidates = () => {
  const token = useSelector((state) => state?.vote?.currentVoter?.token);
  const navigate = useNavigate();
  //access control
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });

  const { id: selectedElection } = useParams();
  const [candidates, setCandidates] = useState([]);
  const [canVote, setCanVote] = useState(true);

  const voteCandidateModalShowing = useSelector(
    (state) => state.ui.voteCandidateModalShowing
  );

  const voterId = useSelector((state) => state?.vote?.currentVoter?.id);
  const votedElections = useSelector(
    (state) => state?.vote?.currentVoter?.votedElections
  );

  const getCandidates = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/elections/${selectedElection}/candidates`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setCandidates(response.data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };
  //chheck voter has already voted
  const getVoter = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/voters/${voterId}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const votedElections = await response.data.votedElections;
      if (votedElections.includes(selectedElection)) {
        setCanVote(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCandidates();
    getVoter();
    if (votedElections.includes(selectedElection)) {
      setCanVote(false);
    }
  }, []);

  // ✅ Added dependencies

  return (
    <>
      <section className="candidates">
        {!canVote ? (
          <div className="can">
            <header className="already-voted-container">
              <h1>Already Voted</h1>
              <p>
                You are only permitted to vote once in this election. Please
                vote in another election or sign out.
              </p>
              <p>Thank you for participating in this election.</p>
            </header>
          </div>
        ) : (
          <>
            {candidates.length > 0 ? (
              <div className="can">
                <header className="already-voted-container ">
                  <h1>Vote for your candidate</h1>
                  <p>
                    These are the candidates for the selected election. Please
                    vote wisely, as you won’t be able to vote again in this
                    election.
                  </p>
                </header>
              </div>
            ) : (
              <header className="candidate_header">
                <h1>Inactive Election</h1>
                <p>
                  There are no candidates found for this election. Please check
                  back later.
                </p>
              </header>
            )}
            <div className="container candidates_container">
              {candidates.map((candidate) => (
                <Candidate key={candidate._id} {...candidate} />
              ))}
            </div>
          </>
        )}
      </section>
      {voteCandidateModalShowing && (
        <ConfirmVote selectedElection={selectedElection} />
      )}
    </>
  );
};

export default Candidates;

// import React, { useEffect, useState } from "react";
// // import { candidates as dummyCandidates } from "../data";
// import Candidate from "../components/Candidate";
// import { useParams } from "react-router-dom";
// import ConfirmVote from "../components/ConfirmVote";
// import { useSelector } from "react-redux";
// import axios from "axios";

// const Candidates = () => {
//   const { id: selectedElection } = useParams();
//   const [candidates, setCandidates] = useState([]);
//   const [canVote, setCAnVote] = useState(true);

//   const voteCandidateModalShowing = useSelector(
//     (state) => state.ui.voteCandidateModalShowing
//   );
//   const token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjZkYTMxNWI4MzM5YWM0MjgxOGMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc0MDczMTU5MCwiZXhwIjoxNzQwODE3OTkwfQ.SezEwQGXDDeeynE0_0PMXp16MXRFX9qISgy05AO5kqw";
//   const voterId = useSelector((state) => state?.vote?.currentVoter?.id);
//   const votedElection = useSelector(
//     (state) => state?.vote?.currentVoter?.votedElection
//   );
//   // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.etJpZCI6IjY3YjZkYTMxNWI4MzM5YWM0MjgxOGMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc0MDczMTU5MCwiZXhwIjoxNzQwODE3OTkwfQ.SezEwQGXDDeeynE0_0PMXp16MXRFX9qISgy05AO5kqw";

//   const getCandidates = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_API_URL}/elections/${selectedElection}/candidates`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             // "Content-Type": "application/json",
//           },
//           withCredentials: true, // Remove if unnecessary
//         }
//       );
//       setCandidates(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   //chheck voter has already voted
//   // const getVoter = async () => {
//   //   try {
//   //     const response = await axios.get(
//   //       `${process.env.REACT_APP_API_URL}/voters/${voterId}`,
//   //       {
//   //         withCredentials: true,
//   //         headers: { Authorization: `Bearer ${token}` },
//   //       }
//   //     );
//   //     const votedElection = await response.data.votedElection;
//   //     if (votedElection.includes(selectedElection)) {
//   //       setCAnVote(false);
//   //     }
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };

//   useEffect(() => {
//     getCandidates();
//     // getVoter()
//     if (votedElection.includes(selectedElection)) {
//       setCAnVote(false);
//     }
//   }, []);
//   return (
//     <>
//       <section className="candidates">
//         {!canVote ? (
//           <header>
//             <h1>Already Voted</h1>
//             <p>
//               You are only permitted to vote one this election .Please vote in
//               another election or sign out.
//             </p>
//           </header>
//         ) : (
//           <>
//             {candidates.length > 0 ? (
//               <header className="candidate_header">
//                 <h1>Vote your candidate</h1>
//                 <p>
//                   These are the candidate for the selected election. Please vote
//                   once and wisely, because you won`t be allowed to a in this
//                   election again
//                 </p>
//               </header>
//             ) : (
//               <header className="candidate_header">
//                 <h1>InActive Election</h1>
//                 <p>
//                   There are no candidates found for this election.Please check
//                   back later.
//                 </p>
//               </header>
//             )}
//             <div className="container candidates_container">
//               {candidates.map((candidate, index) => (
//                 <Candidate key={(candidate._id, index)} {...candidate} />
//               ))}
//             </div>
//           </>
//         )}
//       </section>
//       {voteCandidateModalShowing && <ConfirmVote />}
//     </>
//   );
// };

// export default Candidates;
