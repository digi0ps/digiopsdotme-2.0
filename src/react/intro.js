import React from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router-dom';
import '../css/intro.css';

const Footer = () => {
	return (
		<div className="footer">
		by <a href="https://github.com/digi0ps">digi0ps</a>
		</div>
	);
}


const Viewers = () => {
	const viewers = document.getElementById("viewers").value;
	const n = viewers.length - 1;
	let sub;
	switch(viewers[n]){
		case '1':
			sub = 'st';
			break;
		case '2':
			sub = 'nd';
			break;
		case '3':
			sub = 'rd';
			break;
		default:
			sub = 'th';
	}
	
	const last2 = viewers.substr(n-1);
	if (last2 === '11' || last2 === '12' || last2 === '13')
		sub = 'th';

	return (
		<div className="viewers">
		{viewers}{sub} viewer
		</div>
	);
}


class Intro extends React.Component {

	render() {
		return (
			<div className="intro-con">
				<Helmet>
				<meta name="description" content="Sriram's online hideout."/>
				</Helmet>
				<div className="logo"></div>
				<div className="title">digi0ps</div>
				<div className="moto">Just a <code>random</code> guy who can code.</div>
				<div className="links">
					<Link to="/blog">Blog</Link>
					<a href="https://github.com/digi0ps">Github</a>
					<Link to="/about">About</Link>
				</div>
				<Viewers />
				<Footer />
			</div>
		);
	}
}


export default Intro;
