import React, { SFC } from 'react';

import { Title } from 'components/Title';

import styles from './Evolution.m.scss';

const Content: SFC<{}> = () => {
  return (
    <div className={styles.container}>
      <Title label="CPUs Average Load Evolution" />
    </div>
  );
};

export default Content;
