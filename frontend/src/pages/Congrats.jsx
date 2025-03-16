import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Congrats = () => {
  const token = useSelector((state) => state?.vote?.currentVoter?.token);
  const isAdmin = useSelector((state) => state?.vote?.currentVoter?.isAdmin);
  const navigate = useNavigate();
  //access control
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });

  return (
    <section className="congrats">
      <div className="container congrats_container">
        <h2>Thanks for your vote</h2>
        <p>
          Your vote is now added your candidates vote count.you will be
          redirected shortly to see the new result.
        </p>
      </div>
    </section>
  );
};

export default Congrats;
