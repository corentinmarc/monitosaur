import React, { SFC } from 'react';

import { Title } from 'components/Title';

import styles from './Content.m.scss';

const Content: SFC<{}> = () => {
  return (
    <div className={styles.container}>
      <Title label="CPUs Average Evolution" />
    </div>
  );
};

export default Content;
