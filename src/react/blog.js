import React from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';


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
 		const endpoint = "http://127.0.0.1:8000/blog/api/articles/";
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

 		const articleBoxStyle = {
 			backgroundColor: "white",
 			width: "80%",
 			margin: "10px auto",
 			color: "black"
 		}

 		const all = this.state.articles;
 		const all_art = all.map((article) => {
 			const html = {__html: article.content.substr(0,49)};
 			const url = "/blog/" + article.id;
 			return (
 				<div className="article-box"
 					key={article.id}
 					style={articleBoxStyle}
 					>
 				<Link to={url}><h3>{article.title}</h3></Link>
 				<p className="article-body" dangerouslySetInnerHTML={html}></p>
 				</div>
 			);
 		});
 		
 		return all_art;
 	}

 	render() {
 			console.log(this.renderArticles());
 		return (
 			<div className="blog-con">
 				<Link to="/" className="home-link">digi0ps</Link>
 				<div className="blog center">
 				<div className="blog-header">
 				<h2> Mera Blog </h2>
 				<p> A few of musings and scriblings.</p>
 				</div>
 				<div className="articles">
 				{
 					this.state.loaded?this.renderArticles():"Loading..."
 				}
 				</div>
 				</div>
 			</div>
 		);
 	}
 }


export default Blog;
