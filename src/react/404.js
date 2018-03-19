import React from "react";
import { Link } from "react-router-dom";

const Error404 = ({ location }) => {
  return (
    <div className="con-404" style={styles.div}>
      <Link to="/" className="home-link">
        digi0ps
      </Link>
      <h1 style={styles.header}>404</h1>
      <p style={styles.para}>
        Oopsie Doopsie...{" "}
        <span role="img" aria-label="bandage face">
          🤕
        </span>
        <br />
        The page your requested is missing for a long long time. :[{" "}
      </p>
    </div>
  );
};

const styles = {
  div: {
    margin: "20vh auto",
    width: "60%",
    textAlign: "center",
  },
  header: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: 40,
  },
  para: {
    fontFamily: "'Open Sans', sans-serif",
    fontSize: 20,
  },
};
export default Error404;
