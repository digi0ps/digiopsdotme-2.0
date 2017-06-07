import React from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import TimeAgo from 'react-timeago';
import Helmet from 'react-helmet';
import '../css/blog.css';

 class Blog extends React.Component {
 	constructor(props){
 		super(props);
 		this.state = {
 			loaded: false,
 			articles: null
 		}
 		this.renderArticles = this.renderArticles.bind(this);
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
 			return "Loading...";

 		const all = this.state.articles;
 		const all_art = all.map((article) => {
 			const html = {__html: article.short};
 			const url = "/blog/" + article.id;
 			const d = new Date(article.posted_time);
 			return (
 				<div className="article-box" key={article.id}>
 				<Link to={url}>
 				<h3>{article.title}</h3>
 				<p className="article-box-body" dangerouslySetInnerHTML={html}></p>
 				<div className="details">
 				<small className="blog-time">
 				<TimeAgo date={d}></TimeAgo>
 				</small>
 				</div>
 				</Link>
 				</div>
 			);
 		});
 		
 		return all_art;
 	}

 	render() {
 		return (
 			<div className="blog-con">
 				<Helmet>
 				<title>Blog</title>
 				<meta name="description" content="A tiny exhibition of my musings and ramblings." />
 				</Helmet>
 				<Link to="/" className="home-link">digi0ps</Link>
 				<div className="blog center">
 				<div className="blog header">
 				<h2> Blog </h2>
 				<p> A few of my musings and ramblings.</p>
 				</div>
 				<div className="articles">
 				{ this.renderArticles() }
 				</div>
 				</div>
 			</div>
 		);
 	}
 }


export default Blog;
