import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

import { UiActions } from "../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateElectionModal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state?.vote?.currentVoter?.token);
  const idOfElectionToUpdate = useSelector(
    (state) => state?.vote?.idOfElectionToUpdate
  );

  //close Update election modal
  const closeModal = () => {
    dispatch(UiActions.closeUpdateElectionModal());
  };
  const fetchElection = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/elections/${idOfElectionToUpdate}`,

        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const election = await response.data;
      setTitle(election.title);
      setDescription(election.description);
      setStartDate(election.startDate);
      setEndDate(election.endDate);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchElection();
  }, []);

  const updateElection = async (e) => {
    e.preventDefault();
    try {
      const electionData = new FormData();
      electionData.set("title", title);
      electionData.set("description", description);
      electionData.set("thumbnail", thumbnail);
      electionData.set("startDate", startDate);
      electionData.set("endDate", endDate);
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/elections/${idOfElectionToUpdate}`,
        electionData,

        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      closeModal();
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="modal">
      <div className="modal_content">
        <header className="modal_header">
          <h4>Edit Election</h4>
          <button className="modal_close" onClick={closeModal}>
            <IoMdClose />
          </button>
        </header>
        <form onSubmit={updateElection}>
          <div>
            <h6>Election Title:</h6>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
            />
          </div>
          <div>
            <h6>Election Description:</h6>
            <input
              type="text"
              value={description}
              name="description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <h6>Election StartDate:</h6>
            <input
              type="date"
              value={startDate}
              name="startDate"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <h6>Election EndDate:</h6>
            <input
              type="date"
              value={endDate}
              name="endDate"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div>
            <h6>Election thumbnail:</h6>
            <input
              type="file"
              onChange={(e) => setThumbnail(e.target.files[0])}
              accept="png, jpg, jpeg, webp , avif"
            />
          </div>
          <button type="submit" className="btn primary">
            Update Election
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdateElectionModal;
