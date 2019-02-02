import { createAction, ActionsUnion } from 'actions/typedActions';
import {
  START_POLLING_MONITOR_KPI,
  FETCH_MONITOR_KPI_REQUEST,
  FETCH_MONITOR_KPI_SUCCESS,
  CHANGE_MONITOR_PERIOD,
  MONITOR_PERIODS,
} from 'constants/monitor';
import { AppThunkAction } from 'entities/thunk';
import { MonitorResponse } from 'entities/monitor';

export const getMonitorKPI = (): AppThunkAction<Promise<void>> => (
  dispatch,
  _,
  thunkServices,
) => {
  const { monitorService } = thunkServices;
  dispatch(fetchMonitorKPIRequest());

  return monitorService.getMonitorKPI()
    .then((data) => {
      dispatch(fetchMonitorKPISuccess(data));
    })
    .catch((error) => { console.error(error); });
};

export const startPollingMonitorKPI = () => createAction(START_POLLING_MONITOR_KPI);
export const fetchMonitorKPIRequest = () => createAction(FETCH_MONITOR_KPI_REQUEST);
export const fetchMonitorKPISuccess = (monitorKPIs: MonitorResponse) =>
  createAction(FETCH_MONITOR_KPI_SUCCESS, { monitorKPIs });

export const changePeriod = (period: MONITOR_PERIODS) => createAction(CHANGE_MONITOR_PERIOD, { period });

// Only redux Actions, no thunks
export const Actions = {
  startPollingMonitorKPI,
  fetchMonitorKPIRequest,
  fetchMonitorKPISuccess,
  changePeriod,
};

export type Actions = ActionsUnion<typeof Actions>;
