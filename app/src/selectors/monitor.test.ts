import 'jest';

import { MONITOR_INTERVAL } from 'constants/monitor';

import {
  evolutionLoadAverageForPeriodSelector,
} from './monitor';

describe('selectors/monitor', () => {
  it('should retrieve loadAverage evolution for a period', () => {
    const state = {
      monitor: {
        evolutionLoadAvg: [
          { loadAverage: 3 },
          { loadAverage: 7 },
          { loadAverage: 2 },
          { loadAverage: 8 },
          { loadAverage: 2 },
          { loadAverage: 1 },
          { loadAverage: 2.4 },
        ],
      },
    };
    const period = 4 * MONITOR_INTERVAL;

    const evolution = evolutionLoadAverageForPeriodSelector(state, period);

    const expectedEvolution = [
      { loadAverage: 3 },
      { loadAverage: 7 },
      { loadAverage: 2 },
      { loadAverage: 8 },
    ];

    expect(evolution).toEqual(expectedEvolution);
  });
});
