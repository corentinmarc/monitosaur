import React, { SFC } from 'react';

import { Title } from 'components/Title';

import { EvolutionChart } from './EvolutionChart';
import { EvolutionPeriodSelect } from './EvolutionPeriodSelect';
import { StateProps, DispatchProps } from './EvolutionContainer';
import styles from './Evolution.m.scss';

const Content: SFC<StateProps & DispatchProps> = ({
  evolutionLoadAverage,
  periodToDisplay,
  changePeriod,
}) => {
  return (
    <div className={styles.container}>
      <Title
        label="CPUs Average Load Evolution"
        renderAfter={() => <EvolutionPeriodSelect
          onSelect={changePeriod}
          selectedPeriod={periodToDisplay}
        />}
      />
      <div className={styles.chart}>
        <EvolutionChart
          periodToDisplay={periodToDisplay}
          data={evolutionLoadAverage}
        />
      </div>
    </div>
  );
};

export default Content;
