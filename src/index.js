/* Global imports */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

/* Local imports */
import './index.css';
import Logout from './components/Logout';
import Todo from './components/Todo';
import { BrowserRouter, Route } from 'react-router-dom';
import myApp from './reducers/index';

let store = createStore(myApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function newRender() {
  ReactDOM.render(
    <BrowserRouter store={store}>
      <div>
        <Route exact path='/' component={Todo} />
        <Route path='/logout' component={Logout} />
      </div>
    </BrowserRouter>, document.getElementById('root'));
}
store.subscribe(newRender);
newRender();
store.subscribe(() => console.log(store.getState()));