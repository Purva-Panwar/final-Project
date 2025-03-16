import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Terms.css";
// import votingImage from "./voting.jpg"; // Replace with your image path
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faGithub,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Terms = () => {
  const [show, setShow] = useState(false);
  const [isAccountVerified, setIsAccountVerified] = useState(false);
  const navigate = useNavigate();
  const voterId = useSelector((state) => state?.vote?.currentVoter?.id);
  const token = useSelector((state) => state?.vote?.currentVoter?.token);
  const email = useSelector((state) => state?.vote?.currentVoter?.email);

  const sendVerificationOtp = async (voterId, token) => {
    if (!voterId) {
      console.error("Voter email is missing.");
      alert("Your email is missing. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/voters/send-otp`,
        { voterId },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        console.log(response.data.message);
        navigate("/email-verify");
      }
    } catch (error) {
      console.error(
        "Error sending OTP:",
        error.response?.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    const fetchVerificationStatus = async () => {
      try {
        if (!token || !voterId) {
          console.log("Token or Voter ID not found");
          return;
        }

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/voters/${voterId}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setIsAccountVerified(response.data.isAccountVerified);
      } catch (error) {
        console.error("Error fetching verification status:", error);
      }
    };

    fetchVerificationStatus();
  }, [token, voterId]);
  return (
    <>
      <div className="terms-container">
        <div className="terms-image">
          <img
            src="https://img.freepik.com/premium-vector/electronic-contract-online-contract-concept-with-character-e-contract-document-sign-via-smartphone_269730-261.jpg?ga=GA1.1.346386233.1742042256&semt=ais_hybrid"
            alt="Online Voting System"
          />
        </div>
        <div className="terms-content">
          <h2>Terms and Conditions of Online Voting System</h2>
          <ul>
            <li>
              <strong>1. Eligibility:</strong> Only registered voters with valid
              identification are allowed to participate. Users must not vote on
              behalf of others or use fraudulent methods.
            </li>
            <li>
              <strong>2. Voting Process:</strong> Each voter is allowed only one
              vote per election. Manipulation or tampering with votes is
              strictly prohibited. Once submitted, a vote cannot be changed or
              revoked.
            </li>
            <li>
              <strong>3. Data Privacy & Security:</strong> Personal voter data
              (such as name, email, voter ID) is securely stored and encrypted.
              Voting choices remain confidential.
            </li>
            <li>
              <strong>4. Prohibited Activities:</strong> Unauthorized access,
              hacking, and disruption of the system are illegal. Users must not
              spread false information.
            </li>
            <li>
              <strong>5. System Availability:</strong> The voting system aims to
              remain operational, but in case of technical issues, the election
              authority may extend or reschedule voting.
            </li>
            <li>
              <strong>6. Compliance with Laws:</strong> Users must follow
              election laws. Violations may lead to legal action or
              disqualification.
            </li>
            <li>
              <strong>7. Amendments to Terms:</strong> The election authority
              can modify these terms at any time, and users will be notified of
              major changes.
            </li>
            <li>
              <strong>8. Contact Information:</strong> For issues or assistance,
              users can contact the election authority through official
              channels.
            </li>
          </ul>
          <div className="buttons">
            {!isAccountVerified && token && (
              <NavLink
                className="btn btn-primary"
                to="/email-verify"
                onClick={(e) => {
                  e.preventDefault();
                  sendVerificationOtp(voterId, token);
                  // setShowNav(false);
                }}
              >
                Start Now
              </NavLink>
            )}
            {isAccountVerified && (
              <a href="elections">
                <button className="btn btn-primary">Start now</button>
              </a>
            )}
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>Products</h3>
            <ul>
              <li>
                🗳️
                <a href="/home"> Online Voting</a>
              </li>
              <li>
                {" "}
                ⚙️
                <a href="/works"> How it works!</a>
              </li>
              <li>
                🔒
                <a href="/privacy">Privacy Policy</a>
              </li>
              <li>
                {" "}
                📜
                <a href="/terms">Terms and Condition</a>
              </li>
              <li>
                <span>📞 </span>
                <a href="/contact">Contact Us</a>
              </li>
            </ul>
          </div>

          <div className="footer-section follow">
            <h3>Follow Us</h3>
            <div className="flex logo space-x-4">
              <a
                href="https://www.instagram.com/purvi.rajput17/?utm_source=qr&r=nametag"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  size="3x"
                  style={{ color: "#E4405F" }}
                />
              </a>
              <br />
              <a
                href="https://github.com/Purva-Panwar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faGithub}
                  size="3x"
                  style={{ color: "#333" }}
                />
              </a>
              <br />
              <a
                href="https://www.linkedin.com/in/purva-panwar-797931293?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faLinkedin}
                  size="3x"
                  style={{ color: "#0077B5" }}
                />
              </a>
              <br />
              <a
                href="https://youtube.com/@purvapanwar4273?si=VFG410iNRKscqVvc"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faYoutube}
                  size="3x"
                  style={{ color: "#0088CC" }}
                />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Our certificates</h3>
            <div className="certificates ">
              <img
                className="image1"
                src="https://www.polyas.com/wp-content/uploads/2024/07/BSI-certificate-online-voting.png"
                alt="Certificate 1"
              />
              <img
                src="https://www.polyas.com/wp-content/uploads/2024/11/ISO-Logo-neu-freigestellt-2024.png"
                alt="Certificate 2"
              />
            </div>
          </div>

          <div className=" ftr">
            <img
              src="https://img.freepik.com/premium-vector/vote-india-general-election-political-background-with-hand-finger-lineart-design_586724-494.jpg?ga=GA1.1.346386233.1742042256&semt=ais_hybrid"
              alt=""
            />
            <br />
          </div>
        </div>

        <div className="footer-bottom">
          <p>@panwarwpurva394@gmail.com</p>
        </div>
      </footer>
    </>
  );
};

export default Terms;
