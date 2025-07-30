import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

const client = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1/users`,
  withCredentials: true,
});

export const AuthProvider = ({ children }) => {
  const authContext = useContext(AuthContext);

  const [userData, setUserData] = useState(authContext);

  const router = useNavigate();

  const handleRegister = async (email, username, password) => {
    try {
      let request = await client.post("/signup", {
        email: email,
        username: username,
        password: password,
      });

      if (request.status === StatusCodes.CREATED) {
        console.log("User Signed up");
        router("/home");
        return request.data.message;
      }
    } catch (err) {
      throw err;
    }
  };

  const handleLogin = async (email, password) => {
    try {
      let request = await client.post("/login", {
        email: email,
        password: password,
      });

      console.log(email, password);
      console.log(request.data);

      if (request.status === StatusCodes.OK) {
        router("/home");
        return request.data.message;
      }
    } catch (err) {
      throw err;
    }
  };

 const getHistoryOfUser = async () => {
   try {
     const response = await client.get("/get_all_activity");
     console.log(response.data);
     return response.data;
   } catch (err) {
     throw err;
   }
 };

 const addToUserHistory = async (meetingCode) => {
   try {
     const response = await client.post("/add_to_activity", {
       meeting_code: meetingCode,
     });
     console.log(response.data);
     return response.data;
   } catch (err) {
     throw err;
   }
 };
  const data = {
    userData,
    setUserData,
    addToUserHistory,
    getHistoryOfUser,
    handleRegister,
    handleLogin,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
