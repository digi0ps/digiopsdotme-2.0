import React from 'react';
import {Link} from 'react-router-dom';

 class Blog extends React.Component {

 	render() {
 		return (
 			<div className="blog-con">
 				<h1> Blog </h1>
 				<Link to="/">Home</Link>
 			</div>
 		);
 	}
 }


export default Blog;
