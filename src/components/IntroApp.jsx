import React from "react";
import { Link } from "react-router-dom";

function IntroApp() {
  return (
    <div className="intro flex">
      <div className="intro-des flex">
        <h1>Quizzical</h1>
        <p>How much do you know about Sport? Let's take a challenge!</p>
      </div>
      <Link className="intro-btn" to="quiz">
        Start quiz
      </Link>
    </div>
  );
}

export default IntroApp;
