import React, { Component } from 'react';

import { Metrics } from 'components/Metrics';
import { RightPanel } from 'components/RightPanel';
import { Content } from 'components/Content';
import { MONITOR_INTERVAL } from 'constants/monitor';

import { DispatchProps } from './AppContainer';
import styles from './App.m.scss';

class App extends Component<DispatchProps> {
  componentDidMount() {
    const { getMonitorKPI } = this.props;

    getMonitorKPI();
    setInterval(getMonitorKPI, MONITOR_INTERVAL);
  }

  render() {
    return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <Metrics />
      </div>
      <div className={styles.contentPanel}>
        <Content />
      </div>
      <div className={styles.rightPanel}>
        <RightPanel />
      </div>
    </div>
    );
  }
}

export default App;
