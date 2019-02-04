import { range } from 'd3';

import { MonitorEvolutionPoint } from 'entities/monitor';

export const getEvolutionLoadAvgFixture = (nbPoint: number): MonitorEvolutionPoint[] => {
  let value = 0.5;
  return range(0, nbPoint).map((index) => {
    value = value + (0.5 - Math.random()) * 0.1;
    return {
      timestamp: index,
      loadAvg: Math.max(value, 0),
    };
  });
};
