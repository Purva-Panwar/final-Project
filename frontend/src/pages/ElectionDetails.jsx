import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ElectionCandidate from "../components/ElectionCandidate";
import { IoAddOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { UiActions } from "../store/ui-slice";
import AddCandidateModal from "../components/AddCandidateModal";
import axios from "axios";
import { voteActions } from "../store/vote-slice";

const ElectionDetails = () => {
  const token = useSelector((state) => state?.vote?.currentVoter?.token);
  const navigate = useNavigate();
  //access control
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });

  const [loading, setLoading] = useState(false);
  const [election, setElections] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [voters, setVoters] = useState([]);

  const { id } = useParams();
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const token = useSelector((state) => state?.vote?.currentVoter?.token);
  const isAdmin = useSelector((state) => state?.vote?.currentVoter?.isAdmin);

  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjZkYTMxNWI4MzM5YWM0MjgxOGMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc0MDgxODk3NywiZXhwIjoxNzQwOTA1Mzc3fQ.KD2GlcUHfP8BtJIhFkqcOwShuaQeQOi_gHZ5fFaRsNU";
  //

  const addCandidateModalShowing = useSelector(
    (state) => state.ui.addCandidateModalShowing
  );

  const getElection = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/elections/${id}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setElections(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCandidates = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/elections/${id}/candidates`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCandidates(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getVoters = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/elections/${id}/voters`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setVoters(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteElection = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/elections/${id}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/elections");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getElection();
    getCandidates();
    getVoters();
  }, []);

  // open add candidate modal
  const openModal = () => {
    dispatch(UiActions.openAddCandidateModal());
    dispatch(voteActions.changeAddCandidateElectionId(id));
  };

  return (
    <>
      <section className="electionDetails">
        <div className="container electionDetails_container">
          <div className="c1">
            <div className="electionDetails_image">
              <img src={election.thumbnail} alt={election.title} />
            </div>
            <div className="head">
              <h2 className="tit">{election.title}</h2>
              <p className="des">{election.description}</p>
              <p className="date">Start Date : {election.startDate}</p>
              <p className="date">End Date : {election.endDate}</p>
            </div>
          </div>
          <menu className="electionDetails_candidates">
            {candidates.map((candidate) => (
              <ElectionCandidate key={candidate._id} {...candidate} />
            ))}
            {isAdmin && (
              <button className="add_candidate-btn" onClick={openModal}>
                <IoAddOutline />
              </button>
            )}
          </menu>

          <menu className="voters">
            <h2>Voters</h2>
            <table className="voters_table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email Address</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {voters.map((voter) => (
                  <tr key={voter._id} className="bot">
                    <td>
                      <h5>{voter.fullName}</h5>
                    </td>
                    <td>{voter.email}</td>
                    <td>{voter.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </menu>
          {isAdmin && (
            <button className="btn danger full" onClick={deleteElection}>
              Delete Election
            </button>
          )}
        </div>
      </section>

      {addCandidateModalShowing && <AddCandidateModal />}
    </>
  );
};

export default ElectionDetails;
