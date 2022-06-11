import "./NotFound.css";
import Main from "../../img/404main.jpg";
import Board from "../../img/board.png";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="body">
      <div className="notFoundContainer">
        <div className="fof-images">
          <img src={Main} alt="" className="fof-image1" />
          <div className="swing">
            <img src={Board} alt="" className="fof-image2" />
          </div>
        </div>
        <h1>PAGE NOT FOUND</h1>
        <p>
          The Page you are looking night have been removed
          <br />
          or temparorily unavailable.
        </p>
        <button className="home-btn">
          <Link to="/">
            <i className="fa-solid fa-house-chimney"></i> GO TO HOMEPAGE
          </Link>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
