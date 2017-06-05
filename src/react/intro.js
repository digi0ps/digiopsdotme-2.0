import React from 'react';
import {Link} from 'react-router-dom';
import '../css/intro.css';

const Footer = () => {
	return (
		<div className="footer">
		by <a href="https://github.com/digi0ps">digi0ps</a>
		</div>
	);
}


class Intro extends React.Component {

	render() {
		return (
			<div className="intro-con">
				<div className="logo"></div>
				<div className="title">digi0ps</div>
				<div className="moto">Just a <code>random</code> guy who can code.</div>
				<div className="links">
					<Link to="/blog">Blog</Link>
					<a href="https://github.com/digi0ps">Github</a>
					<Link to="/portfolio">Portfolio</Link>
				</div>
				<Footer />
			</div>
		);
	}
}


export default Intro;
