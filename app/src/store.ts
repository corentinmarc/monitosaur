import { createStore, applyMiddleware, compose, Middleware } from 'redux';
import thunk from 'redux-thunk';

import { MONITORING_URL } from 'constants/monitor';
import monitorServiceFactory from 'services/monitorService';
import { ThunkServices } from 'entities/thunk';
import reducers, { defaultState } from 'reducers';

const isDevTool: boolean = process.env.NODE_ENV !== 'production'
    && typeof window === 'object'
    && (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancers: Function = isDevTool
  ? (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ serialize: true })
  : compose;

const monitorService = monitorServiceFactory(MONITORING_URL);
const services: ThunkServices = {
  monitorService,
};

const thunkWithServices: Middleware = thunk.withExtraArgument(services);

const middlewares: Middleware[] = [
  thunkWithServices,
];

const preloadedState = defaultState;

const store = createStore(
  reducers,
  preloadedState,
  composeEnhancers(applyMiddleware(...middlewares)),
);

export default store;