import { range } from 'd3';

import { ALERT_MESSAGE_TYPES } from 'constants/alerts';
import { AlertMessage } from 'entities/alerts';
import { fromMinutesToMs } from 'helpers/converters';

export const getAlertMessagesFixture = (nbAlert: number): AlertMessage[] => {
  return range(0, nbAlert * 2).map((index) => {
    const type = index % 5 ? ALERT_MESSAGE_TYPES.ALERT : ALERT_MESSAGE_TYPES.ALERT_STOP;
    const timestamp = Date.now() - index * 10 * 1000;
    const id = `${type}-${timestamp}`;

    if (type === ALERT_MESSAGE_TYPES.ALERT) {
      return {
        id,
        timestamp,
        type,
        loadAvg: 1 + Math.random() * 3,
      };
    }

    if (type === ALERT_MESSAGE_TYPES.ALERT_STOP) {
      return {
        id,
        timestamp,
        type,
        duration: fromMinutesToMs(2 + Math.random() * 10),
      };
    }
  });
};
