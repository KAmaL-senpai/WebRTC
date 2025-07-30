import "../App.css";
import MobileImage from "../assets/mobile.png";
import { Link, useNavigate } from "react-router-dom";
function LandingPage() {
  const router = useNavigate();
  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navHeader">
          <h2>WebRTC Connect</h2>
        </div>
        <div className="navList">
          <p onClick={()=> router("/hfrkjck")}>Join as Guest</p>
          <p onClick={()=> router("/auth")}>Register</p>
          <div role="button" onClick={()=> router("/auth")} >
            <p>Login</p>
          </div>
        </div>
      </nav>
      <div className="landingMainContainer">
        <div>
          <h1>
            {" "}
            <span style={{ color: "rgb(0,0,255)" }}>Connect</span> with your
            Loved Ones
          </h1>
          <p>Cover a distance by WebRTC Connect</p>
          <div role="button">
            <Link to={"/auth"}> Get Started</Link>
          </div>
        </div>
        <div>
          <img src={MobileImage} alt="Mobile_Image" />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
