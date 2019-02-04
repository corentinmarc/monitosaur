import 'jest';

import {
  getMonitorKPI,
  fetchMonitorKPIRequest,
  fetchMonitorKPISuccess,
  fetchMonitorKPIFailure,
} from './monitor';

describe('actions/monitor', () => {
  it('should dispatch fetchMonitorKPIRequest then fetchMonitorKPIRequest', async () => {
    const data = { loadAvg: 'loadAvg' };
    const dispatch = jest.fn();
    const thunkServices = {
      monitorService: {
        getMonitorKPI: jest.fn(() => Promise.resolve(data)),
      },
    };
    await getMonitorKPI()(dispatch, null, thunkServices);

    expect(dispatch).toHaveBeenNthCalledWith(1, fetchMonitorKPIRequest());
    expect(dispatch).toHaveBeenNthCalledWith(2, fetchMonitorKPISuccess(data));
  });

  it('should dispatch fetchMonitorKPIRequest then fetchMonitorKPIFailure', async () => {
    global.console = { error: jest.fn() };

    const dispatch = jest.fn();
    const thunkServices = {
      monitorService: {
        getMonitorKPI: jest.fn(() => Promise.reject()),
      },
    };
    await getMonitorKPI()(dispatch, null, thunkServices);

    expect(dispatch).toHaveBeenNthCalledWith(1, fetchMonitorKPIRequest());
    expect(dispatch).toHaveBeenNthCalledWith(2, fetchMonitorKPIFailure());
  });
});
