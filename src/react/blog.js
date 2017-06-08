import React from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import TimeAgo from 'react-timeago';
import Helmet from 'react-helmet';
import {CSSTransitionGroup} from 'react-transition-group';
import HomeLink from './homelink.js';
import '../css/blog.css';


const Article = (props) => {
	const {id, title, short, posted_time} = props.article;
	const html = {__html: short};
	const url = "/blog/" + id;
	const d = new Date(posted_time);
	return (
		<div className="article-box">
		<Link to={url}>
		<h3>{title}</h3>
		<p className="article-box-body" dangerouslySetInnerHTML={html}></p>
		<div className="details">
		<small className="blog-time">
		<TimeAgo date={d}></TimeAgo>
		</small>
		</div>
		</Link>
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
 			return (
 				<Article article={article} key={article.id}/>
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
