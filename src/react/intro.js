import React from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router-dom';
import '../css/intro.css';

const Footer = () => {
	return (
		<div className="footer">
		<a href="https://github.com/digi0ps/digiopsdotme-2.0" target="blank">view source</a>
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
		{viewers}{sub} visitor
		</div>
	);
}


class Intro extends React.Component {

	render() {
		//Dynamically set the height of the container
		const style = {
			height: window.innerHeight
		}
		return (
			<div className="intro-con" style={style}>
				<Helmet>
				<meta name="description" content="Sriram's online hideout."/>
				</Helmet>
				<div className="logo"></div>
				<div className="title">digi0ps</div>
				<div className="moto">Just a <code>random</code> guy who codes.</div>
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
