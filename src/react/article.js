import React from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import TimeAgo from 'react-timeago';
import '../css/article.css';


const Close = () => {
	return (
		<div className="close">
		<Link to="/blog">X</Link>
		</div>
	);
}


class Article extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			loaded: false,
			article: null
		}
	}

	componentDidMount(){
		const a_id = this.props.match.params.id;
		this.fetchArticle(a_id);
	}

	fetchArticle(id){
		const endpoint = "http://127.0.0.1:8000/blog/api/article/" + id;
		Axios.get(endpoint)
			.then((response) => {
				const arty = response.data;
				this.setState({
					loaded: true,
					article: arty
				})
			});
	}

	render() {
		const width = window.outerWidth;
		let body = "Loading...";
		if (this.state.loaded){
			const article = this.state.article;
			const html = {__html: article.content}
			const d = new Date(article.posted_time);

			body = (
				<div>
				<h1 className="article-header center">{article.title}</h1>
				<div className="article-details">
				<small className="time">
				<TimeAgo date={d}></TimeAgo>
				</small>
				<small className="views">{article.views} Views</small>
				</div>
				<div className="article-body"
				dangerouslySetInnerHTML={html} />
				</div>
			);
		}
		return(
			<div className="article"
			height="auto" width={width}>
			<Close />
			{body}
			</div>
		);
	}
}


export default Article;