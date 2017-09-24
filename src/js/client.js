import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Main from './components/Main';
import HomePage from './components/HomePage';

ReactDom.render(
	<Router history={browserHistory}>
		<Route path="/" component={Main}>
			<IndexRoute component={HomePage}></IndexRoute>
		</Route>
	</Router>,
	document.getElementById("app")
);