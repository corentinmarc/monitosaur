import { createAction, ActionsUnion } from 'actions/typedActions';
import {
  FETCH_MONTITOR_KPI_REQUEST,
  FETCH_MONTITOR_KPI_SUCCESS,
} from 'constants/monitor';
import { ThunkAction } from 'entities/thunk';
import { MonitorResponse } from 'entities/monitor';

export const getMonitorKPI = (): ThunkAction<Promise<void>> => (
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

export const fetchMonitorKPIRequest = () => createAction(FETCH_MONTITOR_KPI_REQUEST);
export const fetchMonitorKPISuccess = (monitorKPIs: MonitorResponse) =>
  createAction(FETCH_MONTITOR_KPI_SUCCESS, { monitorKPIs });

// Only redux Actions, no thunks
export const Actions = {
  fetchMonitorKPIRequest,
  fetchMonitorKPISuccess,
};

export type Actions = ActionsUnion<typeof Actions>;
