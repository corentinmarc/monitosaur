import {
  MONITOR_EVOLUTION_HISTORY,
  MONITOR_INTERVAL,
  FETCH_MONITOR_KPI_SUCCESS,
  FETCH_MONITOR_KPI_FAILURE,
  MONITOR_PERIODS,
  CHANGE_MONITOR_PERIOD,
} from 'constants/monitor';
import { AllActions } from 'actions';
import { MonitorResponse, MonitorEvolutionPoint } from 'entities/monitor';
import { getEvolutionLoadAvgFixture } from 'fixtures/monitors';
import { shouldUseFixture } from 'helpers/fixtures';

export interface MonitorState {
  cpus: Maybe<number>;
  loadAvg: Maybe<number>;
  freemem: Maybe<number>;
  totalmem: Maybe<number>;
  evolutionLoadAvg: MonitorEvolutionPoint[];
  periodToDisplay: MONITOR_PERIODS;
}

export const defaultState: MonitorState = {
  cpus: null,
  loadAvg: null,
  freemem: null,
  totalmem: null,
  evolutionLoadAvg: shouldUseFixture() ?
    getEvolutionLoadAvgFixture(MONITOR_EVOLUTION_HISTORY / MONITOR_INTERVAL) : [],
  periodToDisplay: MONITOR_PERIODS['10 Minutes'],
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
  // Store the last numberOfEvolutionPoints in accordance with
  // history duration and not much to avoid memory leaks
  const evolutionLoadAvg = [
    { loadAvg, timestamp },
    ...state.evolutionLoadAvg,
  ].slice(0, numberOfEvolutionPoints);

  return ({
    ...state,
    cpus,
    loadAvg,
    freemem,
    totalmem,
    evolutionLoadAvg,
  });
};

const updateMonitorStateWithFailure = (state: MonitorState): MonitorState => {
  return updateMonitorState(
    state,
    {
      cpus: null,
      loadAvg: null,
      freemem: null,
      totalmem: null,
      timestamp: Date.now(),
    },
  );
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
      break;
    case FETCH_MONITOR_KPI_FAILURE:
      return updateMonitorStateWithFailure(state);
      break;
    case CHANGE_MONITOR_PERIOD:
      return changeMonitorPeriod(state, action.payload.period);
      break;
    default:
      return state;
  }
};
