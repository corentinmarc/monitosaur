import React, { SFC } from 'react';

import { AlertMessage } from 'entities/alerts';
import { ALERT_MESSAGE_TYPES } from 'constants/alerts';

import styles from './AlertMessage.m.scss';

type Props = {
  id: string;
  type: ALERT_MESSAGE_TYPES;
  timestamp: number;
  loadAvg?: number;
  duration?: number;
  onClose: (id: string) => void 
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
        High load generated an alert <br/> -  <br/> load = {loadAvg.toFixed(2)}, triggered at {new Date(timestamp).toLocaleTimeString()}
      </h3>
    }
    {
      (type === ALERT_MESSAGE_TYPES.ALERT_STOP) && <h3 className={styles.alertStop}>
        Load returned to normal at after {(duration / 1000 / 60).toFixed(1)} minutes.
      </h3>
    }
    <div className={styles.close} onClick={() => onClose(id)}>x</div>
  </div>
);

export default AlertMessage;
