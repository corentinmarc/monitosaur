import React, { SFC } from 'react';

import { Title } from 'components/Title';

import { AlertMessage } from './AlertMessage';
import { StateProps, DispatchProps } from './AlertsContainer';
import styles from './Alerts.m.scss';

const Alerts: SFC<StateProps & DispatchProps> = ({
  alertMessages,
  removeAlertMessage,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Title label="Alerts" />
      </div>
      <div className={styles.alertsContainer}>
        {
          alertMessages.map(message => <AlertMessage
            {...message}
            key={message.id}
            onClose={removeAlertMessage}
          />)
        }
      </div>
    </div>
  );
};

export default Alerts;
