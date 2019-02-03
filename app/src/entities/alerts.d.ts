import { ALERT_MESSAGE_TYPES } from 'constants/alerts';

export interface AlertMessage {
  id: string;
  type: ALERT_MESSAGE_TYPES;
  timestamp: number;
  loadAvg?: number;
  duration?: number;
}

export interface Alert {
  startedAt: number;
  loadAvg: number;
}
