import "./Footer.css";
import github from "../../assets/github.png";
import linkedin from "../../assets/linkedin.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <p className="footer__year"> © 2024 Supersite, Powered by News API </p>
      <div className="footer__content">
        <div className="footer__nav-links">
          <Link to="/">
            <button className="footer__link"> Home</button>
          </Link>

          <a
            href="https://tripleten.com/"
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Triple Ten
          </a>
        </div>
        <div className="footer__social-link">
          <a
            href="https://github.com/Parnika006"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="footer__social-icon-github"
              src={github}
              alt="github logo"
            />
          </a>

          <a
            href="https://www.linkedin.com/in/parnikasingh006/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="footer__social-icon-linkedin"
              src={linkedin}
              alt="linkedin logo"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
