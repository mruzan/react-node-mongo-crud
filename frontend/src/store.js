import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import { rootReducer } from './reducers/index';

const createHistory = require("history").createBrowserHistory;

export const history = createHistory();

const enhancers = [];
const middleware = [
  thunk,
  logger,
  routerMiddleware(history)
];

const composedEnhancers = compose(
  composeWithDevTools(
    applyMiddleware(...middleware),
    ...enhancers
  )
);

const store = createStore(rootReducer,composedEnhancers);

export default store;
