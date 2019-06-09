import React, { Component } from 'react';

import { Metrics } from 'components/Metrics';
import { Alerts } from 'components/Alerts';
import { Evolution } from 'components/Evolution';

import { DispatchProps } from './AppContainer';
import styles from './App.mscss';

class App extends Component<DispatchProps> {
  render() {
    return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <Metrics />
      </div>
      <div className={styles.contentPanel}>
        <Evolution />
      </div>
      <div className={styles.rightPanel}>
      <Alerts />
      </div>
    </div>
    );
  }
}

export default App;
