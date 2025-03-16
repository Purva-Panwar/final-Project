import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = process.env.REACT_APP_API_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [voterData, setVoterData] = useState(false);

  const getAuthstate = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/voters/is-auth");
      if (data.success) {
        setIsLoggedin(true);
        getUserData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data");
      data.success && setVoterData(data.voterData);
    } catch (error) {}
  };

  useEffect(() => {
    getAuthstate();
  });
  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    getUserData,
    voterData,
    setVoterData,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
