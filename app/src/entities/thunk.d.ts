import { ThunkAction, ThunkMiddleware, ThunkDispatch } from 'redux-thunk';
import { Action, AnyAction } from 'redux';

import { AppGlobalState } from 'reducers';
import { MonitorService } from 'services/monitorService'; 

export type AppThunkServices = {
  monitorService: MonitorService,
};
export type AppThunkAction<R> = ThunkAction<R, AppGlobalState, AppThunkServices, Action>;
export type AppThunkDispatch = ThunkDispatch<AppGlobalState, AppThunkServices, Action>;
export type AppThunkMiddleware = ThunkMiddleware<AppGlobalState, AnyAction, AppThunkServices>;
