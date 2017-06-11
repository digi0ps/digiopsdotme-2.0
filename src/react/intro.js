import React from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import{Motion, spring} from 'react-motion';
import Typing from 'react-typing-animation';
import Quote from './quote.js';
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
		<Motion defaultStyle={{x:0}}
			style={{
				x:spring(parseInt(viewers,10))
			}}>
		{value => <div className="viewers">{Math.floor(value.x)}{sub} visitor</div>}
		</Motion>
	);
}


const TypingAnimation= () => {
	return (
		<Typing className="typing" cursor={false}>
			<Typing.Delay ms={1000} />
			captures.
			<Typing.Delay ms={800} />
			<Typing.Backspace count={9}/>
			designs.
			<Typing.Delay ms={800} />
			<Typing.Backspace count={8}/>
			writes.
			<Typing.Delay ms={800} />
			<Typing.Backspace count={7}/>
			codes.
		</Typing>
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
			{ /* Quote falldown animatoin */ }
				<CSSTransitionGroup
					className="qotd"
					transitionName="quote"
					transitionAppear={true}
					transitionAppearTimeout={500}
					transitionEnter={false}
					transitionLeaveTimeout={250}>
				<Quote storeId="digiops6"/>
				</CSSTransitionGroup>
				<CSSTransitionGroup
					transitionName="fade"
					transitionAppear={true}
					transitionAppearTimeout={500}
					transitionEnter={false}
					transitionLeave={false}>
				<div className="logo"></div>
				<div className="title">digi0ps</div>
				<div className="moto">Just a random guy who
				<TypingAnimation />
				</div>
				<div className="links">
					<Link to="/blog" className="link">Blog</Link>
					<a href="https://github.com/digi0ps" className="link">Github</a>
					<Link to="/about" className="link">About</Link>
				</div>
				</CSSTransitionGroup>
				<Viewers />
				<Footer />
			</div>
		);
	}
}


export default Intro;
