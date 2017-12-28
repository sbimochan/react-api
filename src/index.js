/* Global imports */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

/* Local imports */
import './index.css';
import Logout from './components/Logout';
import Todo from './components/Todo';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import myApp from './reducers/index';

const middleware = applyMiddleware(createLogger());
let store = createStore(myApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), middleware);


  ReactDOM.render(
    <Provider store={store}> 
      <BrowserRouter>
        <div>
          <Route exact path='/' component={Todo} />
          <Route path='/logout' component={Logout} />
        </div>
      </BrowserRouter>
    </Provider>, document.getElementById('root'));
    