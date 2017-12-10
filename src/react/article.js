import React from 'react';
import Axios from 'axios';
import Helmet from 'react-helmet';
import {Redirect} from 'react-router-dom';
import {CSSTransitionGroup} from 'react-transition-group';
import TweenLite from 'gsap';
import TimeAgo from 'react-timeago';

import '../css/article.css';

const Close = (props) => {
	return (
		<div className="close"
			onClick={CloseClick.bind(null, props.push)}
			title="Close this article">
		<img alt="Close this article" src="https://feathericons.com/node_modules/feather-icons/dist/icons/chevrons-down.svg" />
		</div>
	);
}

const CloseClick = (push) => {
	const box = document.getElementById("article");
	const height = window.innerHeight;
  	const translate ="translate(0," + height + "px)";
 	const t = TweenLite.to(box, 0.25, {transform: translate});
 	t.eventCallback("onComplete", push, ["/blog"]);
}

const TopButton = (props) => {
	return (
		<div className="gototop"
		onClick={function(){window.scrollTo(0,0)}}
		title="Scroll to top">
		<img alt="Close this article" src="https://feathericons.com/node_modules/feather-icons/dist/icons/chevrons-up.svg" /></div>
	)
}
class Article extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			loaded: false,
			article: null,
			error: false,
			scrolled: false
		}
		this.scrollHandler = this.scrollHandler.bind(this)
	}

	componentDidMount(){
		const a_id = this.props.match.params.id;
		this.fetchArticle(a_id);
		window.scrollTo(0,0);
	}

	scrollHandler() {
		if (window.scrollY > 50 && !this.state.scrolled)
			this.setState({scrolled: true});
		else if (window.scrollY < 50 && this.state.scrolled)
			this.setState({scrolled: false});
	}

	fetchArticle(id){
		const endpoint = "https://digiops.me/blog/api/article/" + id;
		Axios.get(endpoint)
			.then((response) => {
				const arty = response.data;
				this.setState({
					loaded: true,
					article: arty
				})
			})
			.catch((err) => {
				this.setState({
					error: err
				})
			});
	}

	render() {
		let body = (<center><br />Loading...</center>);
		window.onscroll = this.scrollHandler
		if (this.state.loaded){
			const article = this.state.article;
			const html = {__html: article.content}
			const d = new Date(article.posted_time);
			body = (
				<div className="article_" key={article.id}>

				<Helmet>
				<title>{article.title}</title>
				<meta name="description" content={article.short} />
				<meta name="theme-color" content="#ffffff" />
				</Helmet>

				<div className="container article-main">
				<h1 className="article-title">{article.title}</h1>
				<p className="article-date">
				<TimeAgo date={d}></TimeAgo>
				</p>
				<div className="article-body"
				dangerouslySetInnerHTML={html} />
				</div>
				</div>
			);
		}
		else if (this.state.error){
			// If the article isn't found, redirect to 404 page
			body = <Redirect to="/article-not-found" push={false}/>
		}

		// Bug: While loading an article, .article doesn't fill the page.
		// Fix: If state isn't loaded, set .article height to page's height. If it gets loaded set it to auto.
		const style = {
			height: this.state.loaded?"auto":window.innerHeight
		}
		
		return(
			<div className="article" style={style} id="article">
			<Close push={this.props.history.push}/>
			<CSSTransitionGroup
					transitionName="fade"
					transitionAppear={true}
					transitionAppearTimeout={250}
					transitionEnterTimeout={500}
					transitionLeaveTimeout={500}
			>
			{body}
			</CSSTransitionGroup>
			{this.state.scrolled?<TopButton />:""}
			</div>
		);
	}
}

export default Article;
