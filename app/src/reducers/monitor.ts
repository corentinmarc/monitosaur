import { range } from 'd3';

import {
  MONITOR_EVOLUTION_HISTORY,
  MONITOR_INTERVAL,
  FETCH_MONITOR_KPI_SUCCESS,
  MONITOR_PERIODS,
  CHANGE_MONITOR_PERIOD
} from 'constants/monitor';
import { AllActions } from 'actions';
import { MonitorResponse, MonitorEvolutionPoint } from 'entities/monitor';

export interface MonitorState {
  cpus: Maybe<number>;
  loadAvg: Maybe<number>;
  freemem: Maybe<number>;
  totalmem: Maybe<number>;
  evolutionLoadAvg: MonitorEvolutionPoint[];
  periodToDisplay: MONITOR_PERIODS;
}

const evolutionLoadAvgFixture = (nbPoint: number): MonitorEvolutionPoint[] => {
  let lastValue = 0.5;
  return range(0, nbPoint).map(index => ({
    timestamp: index,
    loadAvg: lastValue + (1 - Math.random()) * 0.2 ,
  }))
}

export const defaultState: MonitorState = {
  cpus: null,
  loadAvg: null,
  freemem: null,
  totalmem: null,
  evolutionLoadAvg: evolutionLoadAvgFixture(MONITOR_EVOLUTION_HISTORY / MONITOR_INTERVAL),
  periodToDisplay: MONITOR_PERIODS["10 Minutes"],
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
    timestamp,
   } = payload;

   const numberOfEvolutionPoints = MONITOR_EVOLUTION_HISTORY / MONITOR_INTERVAL;
   // Store the last numberOfEvolutionPoints in accordance with history duration and not much to avoid memory leaks
   const evolutionLoadAvg = [{ loadAvg, timestamp }, ...state.evolutionLoadAvg].slice(0, numberOfEvolutionPoints);

  return ({
    ...state,
    cpus,
    loadAvg,
    freemem,
    totalmem,
    evolutionLoadAvg,
  })
};

const changeMonitorPeriod = (
  state: MonitorState,
  periodToDisplay: MONITOR_PERIODS,
): MonitorState => ({
  ...state,
  periodToDisplay,
});

export default (state: MonitorState = defaultState, action: AllActions): MonitorState => {
  switch (action.type) {
    case FETCH_MONITOR_KPI_SUCCESS:
      return updateMonitorState(state, action.payload.monitorKPIs);
    case CHANGE_MONITOR_PERIOD:
      return changeMonitorPeriod(state, action.payload.period)
    default:
      return state;
  }
};
