import { AppGlobalState } from 'reducers';

export const monitorRootSelector = (state: AppGlobalState) => state.monitor;

export const cpusSelector = (state: AppGlobalState) => monitorRootSelector(state).cpus;
export const loadAverageSelector = (state: AppGlobalState) => monitorRootSelector(state).loadAvg;
export const freememSelector = (state: AppGlobalState) => monitorRootSelector(state).freemem;
export const totalmemSelector = (state: AppGlobalState) => monitorRootSelector(state).totalmem;
export const evolutionLoadAverageSelector = (state: AppGlobalState) => monitorRootSelector(state).evolutionLoadAvg;