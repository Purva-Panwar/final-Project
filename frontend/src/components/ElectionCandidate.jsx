import axios from "axios";
import React from "react";
import { IoMdTrash } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ElectionCandidate = ({ fullName, image, motto, _id: id }) => {
  const token = useSelector((state) => state?.vote?.currentVoter?.token);
  const isAdmin = useSelector((state) => state?.vote?.currentVoter?.isAdmin);
  const navigate = useNavigate();

  const deleteCandidate = async () => {
    if (!id) {
      console.error("Error: Candidate ID is missing.");
      return;
    }
    if (!token) {
      console.error("Error: Authorization token is missing or invalid.");
      return;
    }

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/candidates/${id}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token.trim()}` }, // Ensure no extra spaces
      });
      navigate(0); // Refresh the page
    } catch (error) {
      console.error(
        "Error deleting candidate:",
        error.response?.data || error.message
      );
    }
  };
  return (
    <li className="electionCandidate">
      <div className="electionCandidate_image">
        <img src={image} alt={fullName} />
      </div>
      <div>
        <h5>{fullName}</h5>
        <small>
          {motto?.length > 70 ? motto.substring(0, 70) + "..." : motto}
        </small>
        {isAdmin && (
          <button className="electionCandidate_btn" onClick={deleteCandidate}>
            <IoMdTrash />
          </button>
        )}
      </div>
    </li>
  );
};

export default ElectionCandidate;
