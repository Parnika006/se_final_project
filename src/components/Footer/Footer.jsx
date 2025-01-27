import "./Footer.css";
import github from "../../assets/github.png";
import facebook from "../../assets/facebook.png";

function Footer() {
  return (
    <div className="footer">
      <p className="footer__year"> © 2024 Supersite, Powered by News API </p>
      <div className="footer__content">
        <div className="footer__nav-buttons">
          <button type="text" className="footer__button">
            Home
          </button>
          <button type="text" className="footer__button">
            {" "}
            Triple Ten
          </button>
        </div>
        <div className="footer__logo-button">
          <img className="footer__github" src={github} alt="github logo" />
          <img
            className="footer__facebook"
            src={facebook}
            alt="facebook logo"
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
