import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';


import  authReducer from "./reducers/auth";
import  navReducer from "./reducers/nav";
import  errorReducer from "./reducers/error";
import  listReducer from "./reducers/list";
import  sessionReducer from "./reducers/session";
import  tagsReducer from "./reducers/tags";

const configureMiddleware = ({ ...thunkExtraArgument }) => {
  const middlewares = [
    thunkMiddleware.withExtraArgument(thunkExtraArgument),
  ];
  if (process.env.NODE_ENV === 'development') {
    const loggerMiddleware = createLogger();
    middlewares.push(loggerMiddleware);
  }
  return middlewares;
};


const lastActionReducerEnhancer = reducer => (
  { lastAction, ...state },
  action,
) => ({
  ...reducer(state, action),
  lastAction: action,
});



const createRootReducer = compose(lastActionReducerEnhancer, combineReducers)







export const configureStore = config => preloadedState => {
  const middlewares = configureMiddleware(config);
  const composeEnhancers = composeWithDevTools;

  const store = createStore(
    createRootReducer({
      session: sessionReducer,
      tags: tagsReducer,
      auth: authReducer,
      nav: navReducer,
      err: errorReducer,
      list: listReducer
    }),
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );


  
  return store;
};
