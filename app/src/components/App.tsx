import React, { SFC } from 'react';

import { LeftPanel } from 'components/LeftPanel';
import { RightPanel } from 'components/RightPanel';
import { Content } from 'components/Content';

import styles from './App.m.scss';

const App: SFC<{}> = () => (
  <div className={styles.container}>
    <div className={styles.leftPanel}>
      <LeftPanel />
    </div>
    <div className={styles.contentPanel}>
      <Content />
    </div>
    <div className={styles.rightPanel}>
      <RightPanel />
    </div>
  </div>
);

export default App;
