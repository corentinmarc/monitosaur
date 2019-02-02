import { AppGlobalState } from 'reducers';
import {
  MONITOR_PERIODS,
  MONITOR_INTERVAL,
} from 'constants/monitor';

export const monitorRootSelector = (state: AppGlobalState) => state.monitor;

export const cpusSelector = (state: AppGlobalState) => monitorRootSelector(state).cpus;
export const loadAverageSelector = (state: AppGlobalState) => monitorRootSelector(state).loadAvg;
export const freememSelector = (state: AppGlobalState) => monitorRootSelector(state).freemem;
export const totalmemSelector = (state: AppGlobalState) => monitorRootSelector(state).totalmem;
export const evolutionLoadAverageSelector = (state: AppGlobalState) =>
  monitorRootSelector(state).evolutionLoadAvg;
export const periodToDisplaySelector = (state: AppGlobalState) =>
  monitorRootSelector(state).periodToDisplay;

export const evolutionLoadAverageForPeriodSelector = (
  state: AppGlobalState,
  period: MONITOR_PERIODS,
) => {
  const evolutionLoadAverage = evolutionLoadAverageSelector(state);
  const numberOfEvolutionPoints = period / MONITOR_INTERVAL;

  return evolutionLoadAverage.slice(0, numberOfEvolutionPoints);
};
