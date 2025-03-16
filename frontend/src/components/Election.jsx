import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UiActions } from "../store/ui-slice";
import { voteActions } from "../store/vote-slice";

const Election = ({
  _id: id,
  title,
  description,
  startDate,
  endDate,
  thumbnail,
}) => {
  const dispatch = useDispatch();
  dispatch(voteActions.changeIdOfElectionToUpdate(id));

  const isAdmin = useSelector((state) => state?.vote?.currentVoter?.isAdmin);

  // Convert startDate and endDate to JavaScript Date objects
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Check if the election is active
  const isActive = now >= start && now <= end;

  // Open update election modal
  const handleClick = () => {
    dispatch(UiActions.openUpdateElectionModal());
  };

  return (
    <article className={`election ${isActive ? "active" : "inactive"}`}>
      <div className="election_image">
        <img src={thumbnail} alt={title} />
      </div>
      <div className="election_info">
        <Link to={`/elections/${id}`}>
          <h4>{title}</h4>
        </Link>
        <p>
          {description?.length > 255
            ? description.substring(0, 255) + "..."
            : description}
        </p>
        <br />

        <p>
          <b>Start Date:</b> {startDate}
        </p>
        <p>
          <b>End date:</b> {endDate}
        </p>
        <br />

        {/* Election Status */}
        <p className={`status ${isActive ? "active" : "inactive"}`}>
          <b>Status:</b> {isActive ? " ✅ Active " : "🚫 Inactive"}
        </p>

        <div className="election_cta">
          <Link to={`/elections/${id}`} className="btn sm">
            View
          </Link>

          <Link
            to={`/elections/${id}/candidates`}
            className={`btn danger sm ${!isActive ? "disabled" : ""}`}
            style={{
              pointerEvents: isActive ? "auto" : "none",
              opacity: isActive ? 1 : 0.5,
            }}
          >
            Enter Election
          </Link>

          {isAdmin && (
            <button className="btn sm primary" onClick={handleClick}>
              Edit
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default Election;

// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { UiActions } from "../store/ui-slice";
// import { voteActions } from "../store/vote-slice";

// const Election = ({ _id: id, title, description, thumbnail }) => {
//   const dispatch = useDispatch();
//   dispatch(voteActions.changeIdOfElectionToUpdate(id));

//   //  const voterId = useSelector((state) => state?.vote?.currentVoter?.id);
//   const token = useSelector((state) => state?.vote?.currentVoter?.token);

//   //open update election modal
//   const handleClick = () => {
//     dispatch(UiActions.openUpdateElectionModal());
//     // alert("Hiii")
//   };

//   const isAdmin = useSelector((state) => state?.vote?.currentVoter?.isAdmin);

//   return (
//     <article className="election">
//       <div className="election_image">
//         <img src={thumbnail} alt={title} />
//       </div>
//       <div className="election_info">
//         <Link to={`/elections/${id}`}>
//           <h4>{title}</h4>
//         </Link>
//         <p>
//           {description?.length > 255
//             ? description.substring(0, 255) + "..."
//             : description}
//         </p>
//         <div className="election_cta">
//           <Link to={`/elections/${id}`} className="btn sm">
//             View
//           </Link>

//           <Link to={`/elections/${id}/candidates`} className="btn  danger sm">
//             Enter Election
//           </Link>
//           {isAdmin && (
//             <button className="btn sm primary" onClick={handleClick}>
//               Edit
//             </button>
//           )}
//         </div>
//       </div>
//     </article>
//   );
// };

// export default Election;
