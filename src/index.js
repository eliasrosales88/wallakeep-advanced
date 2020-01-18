import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from "react-redux";

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {configureStore} from "./store";


import  authReducer from "./store/reducers/auth";
import  navReducer from "./store/reducers/nav";
import  errorReducer from "./store/reducers/error";
import  listReducer from "./store/reducers/list";



const store = configureStore({
  auth: authReducer,
  nav: navReducer,
  err: errorReducer,
  list: listReducer
})();

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
