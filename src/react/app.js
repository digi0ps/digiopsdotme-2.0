import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Intro from './intro.js';
import Blog from './blog.js';
import Article from './article.js';
import About from './about.js';
import Error404 from './404.js';
import '../css/app.css';


class App extends React.Component {
	render() {
		return (
			<Router>
			<div className="app-container">
			<Switch>
				<Route exact path="/" component={Intro} />
				<Route path="/about" component={About} />
				<Route exact path="/blog" component={Blog} />
				<Route path="/blog/:id" component={Article} />
				<Route component={Error404} />
			</Switch>
			</div>
			</Router>
		);
	}
}


export default App;
