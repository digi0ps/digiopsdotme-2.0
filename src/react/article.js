import React from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
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
		let body = "Loading..."
		if (this.state.loaded){
			const article = this.state.article;
			const html = {__html: article.content}
			body = (
				<div>
				<h3>{article.title}</h3>
				<small>{article.posted_time}</small>
				<small>{article.views}</small>
				<div className="article-body"
				dangerouslySetInnerHTML={html}>
				</div>
				</div>
			);
		}
		return(
			<div className="article">
			<Close />
			{body}
			</div>
		);
	}
}


export default Article;
