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
                experience in it. You can find out more about my professional
                experiences in{" "}
                <a href="https://www.linkedin.com/in/digi0ps/" target="_blank">
                  LinkedIn
                </a>
                .
              </p>
              <p className="para">
                <span className="bold">brief </span> I'm a student currenty
                doing my bachelors in Computer Science Engineering at Vellore
                Insitute of Technology, Chennai. Having spent most of my life in
                Chennai, I did my schooling in Chennai Public School.
              </p>
              <p className="para">
                I started coding young when I was in 9th grade but only became
                serious after I started university. I love Open Source and have
                been contributing on{" "}
                <a href="https://github.com/digi0ps" target="_blank">
                  Github
                </a>{" "}
                since 2013. I'm passionate about the web and get super excited
                when new technologies come out.
              </p>
              <p className="para">
                I get curious about science, the universe and mankind often
                watching countless videos in a pursuit to unravel the mysteries
                of the universe. I like to be fit so I put my best in
                maintaining a healthy diet and working out regularly.
              </p>
              <p className="para">
                If you wanna have a few words with me drop me{" "}
                <a href="mailto:sriru1998@gmail.com">mail</a>. I also actively
                share a few memes and sometimes rant on{" "}
                <a href="https://twitter.com/_digi0ps" target="_blank">
                  twitter
                </a>
                .
              </p>
            </div>
          </CSSTransitionGroup>
        </div>
        <div className="top right none">
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
