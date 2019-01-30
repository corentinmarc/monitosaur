import { combineReducers } from 'redux';
import monitor, { defaultState as monitorDefaultState, MonitorState } from 'reducers/monitor';

export interface AppGlobalState {
  monitor: MonitorState;
}

const rootReducer = combineReducers<AppGlobalState>({
  monitor,
});

export const defaultState: AppGlobalState = {
  monitor: monitorDefaultState,
};

export default rootReducer;
