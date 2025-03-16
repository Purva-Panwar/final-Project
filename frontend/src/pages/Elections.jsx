import React, { useEffect, useState } from "react";
// import { elections as dummyElections } from "../data";
import Election from "../components/Election";
import AddElectionModal from "../components/AddElectionModal";
import { useDispatch, useSelector } from "react-redux";
import { UiActions } from "../store/ui-slice";
import UpdateElectionModal from "../components/UpdateElectionModal";
import axios from "axios";
import Loader from "./../components/Loader";
import { useNavigate } from "react-router-dom";

const Elections = () => {
  const token = useSelector((state) => state?.vote?.currentVoter?.token);
  const navigate = useNavigate();
  //access control
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  // open add election modal
  const openModal = () => {
    dispatch(UiActions.openElectionModal());
  };
  // const token = useSelector((state) => state?.vote?.currentVoter?.token);
  const isAdmin = useSelector((state) => state?.vote?.currentVoter?.isAdmin);

  const electionModalShowing = useSelector(
    (state) => state.ui.electionModalShowing
  );

  const updateElectionModalShowing = useSelector(
    (state) => state.ui.updateElectionModalShowing
  );

  const getElections = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/elections`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setElections(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getElections();
  }, []);
  return (
    <>
      <section className="elections">
        <div className="container elections_container">
          <header className="elections_header ">
            <h1>Ongoing Elections</h1>
            {isAdmin && (
              <button className="btn primary" onClick={openModal}>
                Create New Election
              </button>
            )}
          </header>
          {loading ? (
            <Loader />
          ) : (
            <menu className="elections_menu">
              {elections.map((election, index) => (
                <Election key={(election._id, index)} {...election} />
              ))}
            </menu>
          )}
        </div>
      </section>

      {electionModalShowing && <AddElectionModal />}
      {updateElectionModalShowing && <UpdateElectionModal />}
    </>
  );
};

export default Elections;
