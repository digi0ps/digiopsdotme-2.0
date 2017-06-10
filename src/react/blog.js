import React from 'react';
import Axios from 'axios';
import TimeAgo from 'react-timeago';
import Helmet from 'react-helmet';
import {CSSTransitionGroup} from 'react-transition-group';
import {TweenLite} from 'gsap';
import HomeLink from './homelink.js';
import '../css/blog.css';


const ArticleBoxOnClick = (id, push, e) => {
	// The article box to animate
	const box = document.getElementById("abox"+id);
	// The url to navigate to
	const url = "/blog/" + id;
	// Animation parameters
	const height = window.innerHeight;
	const width = window.innerWidth;
	const top = box.offsetTop, left = box.offsetLeft;
	// This changes the color of all the title and short to white
	// So that they don't be an interference in the animation
	// I so wish jquery was here, this could have been so much better
	const all_text = document.querySelectorAll(".article-box-body");
	for (let i = 0; i < all_text.length; i++)
		all_text[i].style.color = "white";

	const t = TweenLite.fromTo(box, 0.2, {position:"absolute", top: top, left: left, color: "white"}, {top: "-10px", bottom: "100px", left: 0, width: width, height: height});
	t.eventCallback("onComplete", push, [url]);
}


const Article = (props) => {
	const {id, title, short, posted_time} = props.article;
	const html = {__html: short};
	const d = new Date(posted_time);
	return (
		<div className="article-box"
			onClick={ArticleBoxOnClick.bind(null,id, props.push)}
			id={"abox"+id}>
		<div>
		<h3>{title}</h3>
		<p className="article-box-body" dangerouslySetInnerHTML={html}></p>
		<div className="details">
		<small className="blog-time">
		<TimeAgo date={d}></TimeAgo>
		</small>
		</div>
		</div>
 		</div>
	);
}


class Blog extends React.Component {
 	constructor(props){
 		super(props);
 		this.state = {
 			loaded: false,
 			articles: null
 		}
 		this.renderAnimatedArticles = this.renderAnimatedArticles.bind(this);
 	}

 	componentDidMount() {
 		this.fetchArticles();
 	}

 	fetchArticles() {
 		const endpoint = "http://digiops.me/blog/api/articles/";
 		Axios.get(endpoint)
 			.then((response) => {
 				const all_articles = response.data;
 				this.setState({
 					loaded: true,
 					articles: all_articles
 				});
 			});
 	}

 	renderArticles() {
 		if (!this.state.loaded)
 			return <div className="load">Loading...</div>;

 		const all = this.state.articles;
 		const all_art = all.map((article) => {
 			// am passing the history.go funciton to make 
 			// a redirect
 			return (
 				<Article article={article} key={article.id}
 					push={this.props.history.push}/>
 			);
 		});
 		
 		return all_art;
 	}

 	renderAnimatedArticles() {
 		if (this.state.loaded)
 			return (
 				<CSSTransitionGroup
 					transitionName="falldown"
 					transitionAppear={true}
 					transitionAppearTimeout={250}
 					transitionEnter={false}
 					transitionLeave={false}>
 				{ this.renderArticles() }
 				</CSSTransitionGroup>
 			);
 		else 
 			return this.renderArticles();
 	}

 	render() {
 		return (
 			<div className="blog-con">
 				<Helmet>
 				<title>Blog</title>
 				<meta name="description" content="A tiny exhibition of my musings and ramblings." />
 				</Helmet>
 				<HomeLink />
 				<div className="blog center">
 				<div className="blog header">
 				<h2> Blog </h2>
 				<p> A few of my musings and ramblings.</p>
 				</div>
 				<div className="articles">
 					{this.renderAnimatedArticles()}
 				</div>
 				</div>
 			</div>
 		);
 	}
 }

export default Blog;
