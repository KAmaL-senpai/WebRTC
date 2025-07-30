import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { IconButton } from "@mui/material";

function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const route = useNavigate();

  useEffect(() => {
    const fecthHistory = async () => {
      try {
        const res = await getHistoryOfUser();
        console.log(res);
        setMeetings(res);
      } catch (error) {
        console.log(error);
      }
    };

    fecthHistory();
  }, []);

  let formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };
  return (
    <div style={{ height: "100vh" }}>
      <IconButton onClick={() => route("/home")}>
        <HomeIcon style={{ fontSize: "2.5rem" }} />
      </IconButton>
      <h2 style={{ textAlign: "center" }}>History</h2>
      {meetings.length > 0 ? (
        meetings.map((e, i) => (
          <Card key={e._id || e.meetingCode || i} variant="outlined">
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.primary"
                gutterBottom
              >
                CODE : <i>{e.meetingCode}</i>
              </Typography>
              <Typography color="text.secondary">
                DATE : <i>{formatDate(e.date)}</i>
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <div style={{ textAlign: "center", fontSize: "5rem" }}>
          <p>
            No History Available{" "}
            <i className="fa fa-exclamation-circle fa-1x"></i>
          </p>
        </div>
      )}
    </div>
  );
}

export default History;
