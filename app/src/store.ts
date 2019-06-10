import { createStore, applyMiddleware, compose, Middleware } from 'redux';
import thunk from 'redux-thunk';

import monitorServiceFactory from 'services/monitorService';
import { AppThunkServices } from 'entities/thunk';
import monitorMiddleware from 'middlewares/monitor';
import alertsMiddleware from 'middlewares/alerts';
import notificationsMiddleware from 'middlewares/notifications';
import reducers, { defaultState } from 'reducers';
import { MonitorResponse } from 'entities/monitor';

export default (getMetrics?: () => Promise<MonitorResponse>) => {
  const isDevTool: boolean = process.env.NODE_ENV !== 'production'
    && typeof window === 'object'
    && (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

  const composeEnhancers: Function = isDevTool
    ? (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ serialize: true })
    : compose;

  const monitorService = monitorServiceFactory(getMetrics);
  const services: AppThunkServices = {
    monitorService,
  };

  const thunkWithServices: Middleware = thunk.withExtraArgument(services);

  const middlewares: Middleware[] = [
    monitorMiddleware,
    alertsMiddleware,
    notificationsMiddleware,
    thunkWithServices,
  ];

  const preloadedState = defaultState;

  const store = createStore(
    reducers,
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  return store;
};
