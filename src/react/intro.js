import React from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import{Motion, spring} from 'react-motion';
import Typing from 'react-typing-animation';
import Axios from 'axios';
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
			codes.
			<Typing.Delay ms={800} />
			<Typing.Backspace count={6}/>
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


class QOTD extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			qotd: {}
		}
	}

	componentDidMount() {
		if (this.state.loaded)
			return;
		// Using this free quotes API for now.
		// Need to change in future
		const endpoint = "https://favqs.com/api/qotd";
		Axios.get(endpoint, {"content-type": "application/json"})
			.then((response) => response.data)
			.then((qjson) => {
				console.log(qjson);
				// Trim to avoid unnecessary spaces
				/*
				const quote = qjson.thought.quote.trim();
				const author = qjson.thought.thoughtAuthor.name;
				const qotd = Object.assign({}, null, {quote: quote, author: author})
				this.setState({
					loaded: true,
					qotd: qotd
				})
				*/
			})
	}

	render() {
		if (!this.state.loaded){
			return <div></div>
		}
		return (
			<div className="qotd" title="Favourite quote of the day :)">
			<div className="quote">
			{this.state.qotd.quote}
			</div>
			<div className="author">
			~{this.state.qotd.author}
			</div>
			</div>
		)
	}
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
			{ /* QOTD falldown animatoin */ }
				<CSSTransitionGroup
					transitionName="falldown"
					transitionAppear={true}
					transitionAppearTimeout={500}
					transitionEnter={false}
					transitionLeave={false}>
				<QOTD />
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
