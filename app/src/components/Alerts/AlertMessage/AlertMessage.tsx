import React, { SFC } from 'react';

import { AlertMessage } from 'entities/alerts';
import {
  ALERT_MESSAGE_TYPES,
  ALERT_DURATION_THRESHOLD,
  ALERT_LOAD_THRESHOLD,
} from 'constants/alerts';
import { fromMsToMinutes } from 'helpers/converters';

import styles from './AlertMessage.m.scss';

interface Props {
  id: string;
  type: ALERT_MESSAGE_TYPES;
  timestamp: number;
  loadAvg?: number;
  duration?: number;
  onClose: (id: string) => void;
}

const AlertMessage: SFC<Props> = ({
  id,
  type,
  timestamp,
  onClose,
  loadAvg,
  duration, // in ms
}) => (
  <div className={styles.container}>
    {
      (type === ALERT_MESSAGE_TYPES.ALERT) && <h3 className={styles.alertStart}>
        High CPU load for the last {
          fromMsToMinutes(ALERT_DURATION_THRESHOLD) } minutes generated an alert
        <br/> -  <br/>
        load = {loadAvg.toFixed(2)}, triggered at {new Date(timestamp).toLocaleTimeString()}
      </h3>
    }
    {
      (type === ALERT_MESSAGE_TYPES.ALERT_STOP) && <h3 className={styles.alertStop}>
        CPU load returned to normal (&lt;&nbsp;{ALERT_LOAD_THRESHOLD})
        at&nbsp;{new Date(timestamp).toLocaleTimeString()} after&nbsp;
        {(fromMsToMinutes(duration)).toFixed(1)} minutes.
      </h3>
    }
    <div className={styles.close} onClick={() => onClose(id)}>x</div>
  </div>
);

export default AlertMessage;
