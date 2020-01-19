import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from "react-redux";

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {configureStore} from "./store";
import LocalStorage from './utils/Storage';

// cargamos la session que hubiese en localStorage
const session = LocalStorage.readLocalStorage() || undefined;

const store = configureStore()(session);


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
