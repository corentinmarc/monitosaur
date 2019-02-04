import 'jest';

import { fetchMonitorKPISuccess } from 'actions/monitor';

import alertsMiddleware from './alerts';

const fetchMonitorKPISuccessAction = fetchMonitorKPISuccess({
  cpus: 1,
  loadAvg: 3,
  freemem: 12,
  totalmem: 50,
  timestamp: 123,
});

describe('middlewares/alerts', () => {
  it('should call next', () => {
    const store = {
      getState: () => {
        monitor:
      },
      dispatch: jest.fn(),
    };

    const next = jest.fn();

    alertsMiddleware(store)(next)(fetchMonitorKPISuccessAction);

    expect(next).toBeCalledTimes(1);
  });

  it('should dispatch addAlertMessage action with ALERT_MESSAGE_TYPES.ALERT', () => {
    const store = {
      getState: () => ({
        evolutionLoadAvg: [
          { loadAvg: 1.5 },
          { loadAvg: 3 },
          { loadAvg: 1.5 },
          { loadAvg: 3 },
          { loadAvg: 1.5 },
          { loadAvg: 3 },
          { loadAvg: 1.5 },
          { loadAvg: 3 },
          { loadAvg: 1.5 },
          { loadAvg: 3 },
          { loadAvg: 1.5 },
          { loadAvg: 3 },
        ],
      }),
      dispatch: jest.fn(),
    };

    const next = jest.fn();

    alertsMiddleware(store)(next)(fetchMonitorKPISuccessAction);

    expect(store.dispatch).toHaveBeenCalledWith({});
  });
});
