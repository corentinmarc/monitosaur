import React, { SFC } from 'react';

import styles from './Metric.m.scss';

interface Props {
  label: string;
  value: Maybe<string | number>;
}

const renderValue = (value: Props['value']) => {
  if (typeof value === undefined || typeof value === null) {
    return 'N/A';
  }
  return value;
};

const Metric: SFC<Props> = ({
  label,
  value,
}) => (
  <div className={styles.container}>
    <h3 className={styles.label}>{label}</h3>
    <div className={styles.value}>{renderValue(value)}</div>
  </div>
);

export default Metric;
