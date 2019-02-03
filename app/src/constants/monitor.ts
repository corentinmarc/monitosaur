import { fromMinutesToMs } from 'helpers/converters';

export const MONITORING_URL = 'http://localhost:3000/monitor';

export const MONITOR_INTERVAL = 10000; // 10 seconds
export const MONITOR_EVOLUTION_DURATION = fromMinutesToMs(1); // 1 minutes
export const MONITOR_EVOLUTION_HISTORY = fromMinutesToMs(60); // 1 hour

export enum MONITOR_PERIODS {
  '2 Minutes' = fromMinutesToMs(2),
  '10 Minutes' = fromMinutesToMs(10),
  '30 Minutes' = fromMinutesToMs(30),
  '1 Hour' = fromMinutesToMs(60),
}

// Action types
export const START_POLLING_MONITOR_KPI = 'START_POLLING_MONITOR_KPI';
export const FETCH_MONITOR_KPI_REQUEST = 'FETCH_MONITOR_KPI_REQUEST';
export const FETCH_MONITOR_KPI_SUCCESS = 'FETCH_MONITOR_KPI_SUCCESS';
export const FETCH_MONITOR_KPI_FAILURE = 'FETCH_MONITOR_KPI_FAILURE';
export const CHANGE_MONITOR_PERIOD = 'CHANGE_MONITOR_PERIOD';
