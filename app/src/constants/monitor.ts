export const MONITORING_URL = 'http://localhost:3000/monitor';

export const MONITOR_INTERVAL = 10000; // 10 seconds
export const MONITOR_EVOLUTION_DURATION = 60 * 1000; // 1 minutes
export const MONITOR_EVOLUTION_HISTORY = 60 * 60 * 1000; // 1 hour

export enum MONITOR_PERIODS {
  '2 Minutes' = 2 * 60 * 1000,
  '10 Minutes' = 10 * 60 * 1000,
  '30 Minutes' = 30 * 60 * 1000,
  '1 Hour' = 60 * 60 * 1000,
}

// Action types
export const START_POLLING_MONITOR_KPI = 'START_POLLING_MONITOR_KPI';
export const FETCH_MONITOR_KPI_REQUEST = 'FETCH_MONITOR_KPI_REQUEST';
export const FETCH_MONITOR_KPI_SUCCESS = 'FETCH_MONITOR_KPI_SUCCESS';
export const CHANGE_MONITOR_PERIOD = 'CHANGE_MONITOR_PERIOD';
