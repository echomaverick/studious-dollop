import React from "react";
import "../styles/about.css";
import { Link } from "react-router-dom";
import About1 from "../images/welcome.svg";
import About3 from "../images/about.svg";

const About = (props) => {
  const appName = "VigilentEye";

  const welcomeText = `Mirë se vini në ${appName}, platforma juaj e alarmit për incidentet e krimit të drejtuar nga komuniteti. Misioni ynë është të fuqizojmë lagjet dhe komunitetet për të qëndruar të lidhur, të informuar dhe të sigurt. Me ${appName}, ju keni fuqinë për të krijuar një mjedis të sigurt dhe vigjilent për të gjithë.`;

  const visionText = `Në ${appName}, ne parashikojmë një botë ku çdo anëtar i një komuniteti është pjesëmarrës aktiv në krijimin e një mjedisi të sigurt dhe vigjilent. Qëllimi ynë është të lehtësojmë komunikimin e shpejtë dhe efikas midis banorëve dhe autoriteteve lokale, duke nxitur një ndjenjë përgjegjësie dhe bashkëpunimi. Ne besojmë se përmes ${appName}, komunitetet mund të arrijnë një nivel të ri sigurie dhe mirëqenieje.`;

  const contactText = `Gati për të bërë një ndryshim? Na kontaktoni për të mësuar më shumë rreth ${appName} dhe se si mund të kontribuoni në ndërtimin e një komuniteti më të sigurt dhe më të lidhur. Përfshirja juaj është thelbësore për ta bërë ${appName} një mjet të fuqishëm për sigurinë e komunitetit. Së bashku, ne mund të krijojmë një ndikim pozitiv dhe t'i bëjmë lagjet tona më të sigurta.`;

  return (
    <div
      className="about-container"
      style={{ maxWidth: "1700px", margin: "0 auto" }}
    >
      <div className="welcome-about">
        <h1 className="about-header">{`Welcome to ${appName}`}</h1>
      </div>
      <div className="welcome-text">
        <p className="about-welcome-text">{welcomeText}</p>
        <img src={About1} alt="" className="photo-welcome" />
      </div>
      <div className="vision-content">
        <div className="vision-text">
          <h2 className="vision-head">{`Vizioni ynë në ${appName}`}</h2>
          <p className="vision-text">{visionText}</p>
        </div>
      </div>
      <div className="contact-content">
        <img src={About3} alt="" className="photo-contact" />
        <div className="contact-text">
          <h2 className="contact-head">{`Kontakto ${appName}`}</h2>
          <p className="contact-text">{contactText}</p>
          <Link to={"/contact"}>
            <button className="btn-register-contact">
              {`Përfshihuni me ${appName}`}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
