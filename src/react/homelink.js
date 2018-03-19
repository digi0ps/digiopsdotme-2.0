import React from "react";
import { CSSTransitionGroup } from "react-transition-group";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Link to="/" className="home-link">
      digi0ps
    </Link>
  );
};

const HomeLink = () => {
  return (
    <CSSTransitionGroup
      transitionName="falldown"
      transitionAppear={true}
      transitionAppearTimeout={300}
      transitionEnter={false}
      transitionLeave={false}
    >
      <Home key="home" />
    </CSSTransitionGroup>
  );
};

export default HomeLink;
