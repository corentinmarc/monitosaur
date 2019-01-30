import React, { SFC } from 'react';

import { Title } from 'components/Title';
import { Metric } from 'components/Metric';

import { StateProps } from './MetricsContainer';
import styles from './Metrics.m.scss';

const convertToPercent = (value: Maybe<number>): Maybe<string> => {
  if (typeof value !== 'number') {
    return value;
  }
  return `${(value * 100).toFixed(1)}%`;
};

const convertToGB = (value: Maybe<number>): Maybe<string> => {
  if (typeof value !== 'number') {
    return value;
  }
  return `${(value / 1000000000).toFixed(1)}GB`;
};

const Metrics: SFC<StateProps> = ({
  cpus,
  loadAvg,
  freeMem,
  totalmem,
}) => {
  return (
    <div className={styles.container}>
      <Title label="Metrics" />
      <div className={styles.metrics}>
        <Metric label="Number of CPUs" value={cpus} />
        <Metric label="CPUs Load" value={convertToPercent(loadAvg)} />
        <Metric label="Free RAM" value={convertToGB(freeMem)} />
        <Metric label="Total RAM" value={convertToGB(totalmem)} />
      </div>
    </div>
  );
};

export default Metrics;
