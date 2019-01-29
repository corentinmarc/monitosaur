import React, { SFC } from 'react';

import { Title } from 'components/Title';

import styles from './LeftPanel.m.scss';

const LeftPanel: SFC<{}> = () => {
  return (
    <div className={styles.container}>
      <Title label="Metrics" />
    </div>
  );
};

export default LeftPanel;
