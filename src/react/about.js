import React from "react";
import Helmet from "react-helmet";
import { CSSTransitionGroup } from "react-transition-group";
import { Link } from "react-router-dom";
import HomeLink from "./homelink.js";
import "../css/about.css";

class About extends React.Component {
  render() {
    return (
      <div className="portfolio-con">
        <Helmet>
          <title>About me</title>
          <meta name="description" content="About Sriram." />
        </Helmet>
        <HomeLink />
        <div className="portfolio">
          <CSSTransitionGroup
            transitionName="fade"
            transitionAppear
            transitionAppearTimeout={1000}
            transitionEnter={false}
            transitionLeaveTimeout={500}
          >
            <div className="header center" id="top">
              <h1>About</h1>
            </div>
            <div className="toolazy center">
              Looking for my{" "}
              <a
                target="blank"
                href="https://drive.google.com/file/d/1uMyFaM7TDQOSrssSWZvksSrUlJcE47td/view?usp=sharing"
                className="resume-link"
              >
                Résumé
              </a>{" "}
              ?
            </div>
            <div className="body center">
              <p className="para">
                <span className="bold">tl;dr </span> I'm Sriram, a full stack
                developer from Chennai, India. I'm a passionate coder who loves
                to write code in Python and Javascript. In the recent years, I
                have become a huge fan of React and have garnered considerable
                experience in it. You can find me on LinkedIn{" "}
                <a href="https://www.linkedin.com/in/digi0ps/" target="_blank">
                  here
                </a>
                .
              </p>
            </div>
          </CSSTransitionGroup>
        </div>
        <div className="top right">
          <a href="#top">
            Back to top{" "}
            <span role="img" aria-label="pointing up finger">
              👆
            </span>
          </a>
        </div>
      </div>
    );
  }
}

export default About;
