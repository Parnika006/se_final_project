import "./About.css";
import about_image from "../../assets/about_image.webp";

function About() {
  return (
    <section className="about">
      <div className="about__container">
        <img className="about__image" src={about_image} alt="image of author" />

        <div className="about__content">
          <h3 className="about__heading"> About the author</h3>
          <p className="about__paragraph">
            My name is Parnika Singh, and I am a Full-Stack Software Developer
            with hands-on experience in JavaScript, HTML, CSS, React, Node.js,
            and Express. Through my work on various projects with TripleTen, I
            gained extensive practical knowledge and honed my technical skills,
            which are showcased in my GitHub portfolio.
          </p>

          <p className="about__paragraph">
            As a mother of two, I’ve mastered the art of multitasking,
            organization, and time management—qualities that complement my
            ability to deliver robust and user-friendly applications. I
            specialize in creating scalable solutions and bringing ideas to life
            with precision and creativity, ensuring I meet and exceed customer
            expectations.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
