import React, { SFC } from 'react';

import { Title } from 'components/Title';

import styles from './Alerts.m.scss';

const RightPanel: SFC<{}> = () => {
  return (
    <div className={styles.container}>
      <Title label="Alerts" />
    </div>
  );
};

export default RightPanel;
