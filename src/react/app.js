import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Intro from './intro.js';
import Blog from './blog.js';
import Portfolio from './portfolio.js';
import Error404 from './404.js';
import '../css/app.css';

class App extends React.Component {
	render() {
		return (
			<Router>
			<div className="app-container">
			<Switch>
				<Route exact path="/" component={Intro} />
				<Route path="/blog" component={Blog} />
				<Route path="/portfolio" component={Portfolio} />
				<Route component={Error404} />
			</Switch>
			</div>
			</Router>
		);
	}
}


export default App;
