import {
  MONITOR_EVOLUTION_DURATION,
  MONITOR_INTERVAL,
  FETCH_MONTITOR_KPI_SUCCESS,
} from 'constants/monitor';
import { AllActions } from 'actions';
import { MonitorResponse } from 'entities/monitor';

export interface MonitorState {
  cpus: Maybe<number>;
  loadAvg: Maybe<number>;
  freemem: Maybe<number>;
  totalmem: Maybe<number>;
  evolutionLoadAvg: MonitorState['loadAvg'][];
}

export const defaultState: MonitorState = {
  cpus: null,
  loadAvg: null,
  freemem: null,
  totalmem: null,
  evolutionLoadAvg: [],
};

const updateMonitorState = (
  state: MonitorState,
  payload: MonitorResponse,
): MonitorState => {
  const { 
    cpus,
    loadAvg,
    freemem,
    totalmem,
   } = payload;

   const numberOfEvolutionPoints = MONITOR_EVOLUTION_DURATION / MONITOR_INTERVAL;
   // Store the last numberOfEvolutionPoints and not much to avoid memory leaks
   const evolutionLoadAvg = [loadAvg, ...state.evolutionLoadAvg].slice(0, numberOfEvolutionPoints);

  return ({
    ...state,
    cpus,
    loadAvg,
    freemem,
    totalmem,
    evolutionLoadAvg,
  })
};

export default (state: MonitorState = defaultState, action: AllActions): MonitorState => {
  switch (action.type) {
    case FETCH_MONTITOR_KPI_SUCCESS:
      return updateMonitorState(state, action.payload.monitorKPIs);
    default:
      return state;
  }
};
