import { ALERT_DURATION_THRESHOLD, ALERT_LOAD_THRESHOLD } from 'constants/alerts';
import { fromMsToMinutes } from 'helpers/converters';

// actionTypes
export const DISPLAY_NOTIFICATION = 'DISPLAY_NOTIFICATION';

// Labels
export const NOTIFICATION_ALERT_TITLE = 'High CPU load';
export const NOTIFICATION_ALERT_BODY = (loadAvg: number) => `Load average during last ${
  fromMsToMinutes(ALERT_DURATION_THRESHOLD)
} minutes: ${loadAvg.toFixed(2)}`;

export const NOTIFICATION_ALERT_STOP_TITLE = 'Normal CPU Load';
export const NOTIFICATION_ALERT_STOP_BODY = `Load average during last ${
  fromMsToMinutes(ALERT_DURATION_THRESHOLD)
} minutes return below ${ALERT_LOAD_THRESHOLD}`;
