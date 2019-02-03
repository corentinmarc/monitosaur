import { combineReducers } from 'redux';
import monitor, { defaultState as monitorDefaultState, MonitorState } from 'reducers/monitor';
import alerts, { defaultState as alertsDefaultState, AlertsState } from 'reducers/alerts';

export interface AppGlobalState {
  monitor: MonitorState;
  alerts: AlertsState;
}

const rootReducer = combineReducers<AppGlobalState>({
  monitor,
  alerts,
});

export const defaultState: AppGlobalState = {
  monitor: monitorDefaultState,
  alerts: alertsDefaultState,
};

export default rootReducer;
