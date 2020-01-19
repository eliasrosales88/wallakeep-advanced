import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from "react-redux";

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {configureStore} from "./store";
import LocalStorage from './utils/Storage';

import * as types from './store/types'

// cargamos la session que hubiese en localStorage
const session = LocalStorage.readLocalStorage() || {};

const store = configureStore()(session);


store.subscribe(() => {

  console.log(store.getState());
  const { auth, lastAction } = store.getState();

  if (lastAction.type === types.SESSION_SAVE) {
    LocalStorage.saveLocalStorage({auth});
  }

  if (lastAction.type === types.SESSION_CLEAR) {
    LocalStorage.clearLocalStorage();
  }
})





ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));





// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
