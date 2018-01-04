/* Global imports */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

/* Local imports */
import './index.css';
import Login from './components/Login';
import Todo from './components/Todo';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import myApp from './reducers/index';
import PrivateRoute from './components/PrivateRoute';

const middleware = applyMiddleware(createLogger());
let store = createStore(myApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), middleware);


  ReactDOM.render(
    <Provider store={store}> 
      <BrowserRouter>
        <div>
          <Route exact path='/' component={Login}/>
          <PrivateRoute exact path='/todo' component={Todo} />
          
        </div>
      </BrowserRouter>
    </Provider>, document.getElementById('root'));
    