import React, { Component } from 'react';

import { MONITOR_PERIODS } from 'constants/monitor';

import styles from './EvolutionPeriodSelect.mscss';

interface Props {
  onSelect: (period: MONITOR_PERIODS) => void;
  selectedPeriod: MONITOR_PERIODS;
}

class EvolutionPeriodSelect extends Component<Props> {
  render() {
    const {
      selectedPeriod,
      onSelect,
    } = this.props;

    return (
      <select
        className={styles.select}
        value={selectedPeriod}
        onChange={event => onSelect(Number(event.target.value))}
      >
        {
          Object.keys(MONITOR_PERIODS)
            .filter((key: any) => typeof MONITOR_PERIODS[key] === 'number')
            .map((key: any) => <option key={key} value={MONITOR_PERIODS[key]}>{key}</option>)
        }
      </select>
    );
  }
}

export default EvolutionPeriodSelect;
