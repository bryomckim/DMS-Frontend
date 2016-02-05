import React from 'react';
import {Router, Route, Link, browserHistory, IndexRoute} from 'react-router';
import {render} from 'react-dom';
import App from './components/main.jsx';
import Documents from './components/document-list.jsx';
// import Docs from './components/doc-list.jsx';
require('./styles/style.css');

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Documents} />
    </Route>
  </Router> ), document.getElementById('container'));
