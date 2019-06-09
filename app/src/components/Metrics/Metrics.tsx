import React, { SFC } from 'react';

import { Title } from 'components/Title';
import { Metric } from 'components/Metrics/Metric';
import { fromBToGB } from 'helpers/converters';

import { StateProps } from './MetricsContainer';
import styles from './Metrics.mscss';

const convertToFixed = (value: Maybe<number>): Maybe<string> => {
  if (typeof value !== 'number') {
    return value;
  }
  return `${value.toFixed(2)}`;
};

const convertToGB = (value: Maybe<number>): Maybe<string> => {
  if (typeof value !== 'number') {
    return value;
  }
  return `${(fromBToGB(value)).toFixed(1)}GB`;
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
        <Metric label="CPUs Load" value={convertToFixed(loadAvg)} />
        <Metric label="Free RAM" value={convertToGB(freeMem)} />
        <Metric label="Total RAM" value={convertToGB(totalmem)} />
      </div>
    </div>
  );
};

export default Metrics;
