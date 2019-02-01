import React, { SFC } from 'react';

import { Title } from 'components/Title';

import { EvolutionChart } from './EvolutionChart';
import { StateProps } from './EvolutionContainer';
import styles from './Evolution.m.scss';

const Content: SFC<StateProps> = ({ evolutionLoadAverage }) => {
  return (
    <div className={styles.container}>
      <Title label="CPUs Average Load Evolution" />
      <div className={styles.chart}>
        <EvolutionChart
          data={evolutionLoadAverage}
        />
      </div>
    </div>
  );
};

export default Content;
