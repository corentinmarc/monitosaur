import { FETCH_MONTITOR_KPI_SUCCESS } from 'constants/monitor';
import { AllActions } from 'actions';
import { MonitorResponse } from 'entities/monitor';

export interface MonitorState {
  cpus: Maybe<number>;
  loadAvg: Maybe<number>;
  freemem: Maybe<number>;
  totalmem: Maybe<number>;
  evolutionLoadAvg: any; // @todo
}

export const defaultState: MonitorState = {
  cpus: null,
  loadAvg: null,
  freemem: null,
  totalmem: null,
  evolutionLoadAvg: [],
};

const updateMonitorKPIs = (
  state: MonitorState,
  payload: MonitorResponse,
): MonitorState => ({
  ...state,
  ...payload,
});

export default (state: MonitorState = defaultState, action: AllActions): MonitorState => {
  switch (action.type) {
    case FETCH_MONTITOR_KPI_SUCCESS:
      return updateMonitorKPIs(state, action.payload.monitorKPIs);
    default:
      return state;
  }
};
