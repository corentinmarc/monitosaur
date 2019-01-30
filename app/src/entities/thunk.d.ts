import { ThunkAction, ThunkMiddleware } from 'redux-thunk';
import { Action, AnyAction } from 'redux';

import { AppGlobalState } from 'reducers';
import { MonitorService } from 'services/monitorService'; 

export type ThunkServices = {
  monitorService: MonitorService,
};
export type ThunkAction<R> = ThunkAction<R, AppGlobalState, ThunkServices, Action>;
export type ThunkMiddleware = ThunkMiddleware<AppGlobalState, AnyAction, ThunkServices>;
