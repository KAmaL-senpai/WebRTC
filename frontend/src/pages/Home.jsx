import { useNavigate } from "react-router";
import { useState, useEffect, useContext } from "react";
import "../App.css";
import { IconButton, TextField } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import Button from "@mui/material/Button";
import axios from "axios";
import logo from "../assets/logo3.png";
// import { addToHistory } from "../../../backend/controllers/AuthControllers";
import { AuthContext } from "../contexts/AuthContext";

const Home = () => {
  const [meetingCode, setMeetingCode] = useState("");
  const navigate = useNavigate();

  const { addToUserHistory } = useContext(AuthContext);
  const handleJoinvideoCall =async () => {
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get("http://localhost:8000/home", {
          withCredentials: true,
        });

        if (!res.data.user) {
          navigate("/auth");
        }
      } catch (err) {
        console.log("Not Cookie", err);
        navigate("/auth");
      }
    };

    verifyUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/api/v1/users/logout", {
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <>
      <div className="navBar">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2>WebRTC Connect</h2>
        </div>
        <div className="menu" style={{ display: "flex", alignItems: "center" }}>
          <div className="history" onClick={() => navigate("/history")}>
            <IconButton>
              <RestoreIcon />
            </IconButton>
            <p>History</p>
          </div>
          <Button size="small" variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      <div className="meetContainer">
        <div className="leftPanel">
          <div>
            <h2>Providing Quality video Call</h2>
            <div style={{ display: "flex", gap: "10px" }}>
              <TextField
                onChange={(e) => setMeetingCode(e.target.value)}
                id="outlined-basic"
                label="Meeting Code"
                variant="outlined"
              ></TextField>
              <Button
                onClick={handleJoinvideoCall}
                variant="contained"
                size="medium"
                style={{paddingInline:"1.5rem", fontSize:"1rem"}}
              >
                Join
              </Button>
            </div>
          </div>
        </div>
        <div className="rightPanel">
          <img src={logo} alt="Logo_image" />
        </div>
      </div>
    </>
  );
};

export default Home;
