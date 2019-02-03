export const ADD_ALERT_MESSAGE = 'ADD_ALERT_MESSAGE';
export const REMOVE_ALERT_MESSAGE = 'REMOVE_ALERT_MESSAGE';

export const SET_CURRENT_ALERT = 'SET_CURRENT_ALERT';

export enum ALERT_MESSAGE_TYPES {
  'ALERT',
  'ALERT_STOP',
}

export const ALERT_DURATION_THRESHOLD = 120000; // 2 minutes in ms
export const ALERT_LOAD_THRESHOLD = 1;