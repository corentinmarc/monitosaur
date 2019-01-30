import { AppThunkMiddleware, AppThunkDispatch } from 'entities/thunk';
import { AllActions } from 'actions';
import { getMonitorKPI } from 'actions/monitor';
import { START_POLLING_MONITOR_KPI, MONITOR_INTERVAL } from 'constants/monitor';

const dispatchGetMonitorKPI = (dispatch: AppThunkDispatch) => () => dispatch(getMonitorKPI());

const monitorMiddleware: AppThunkMiddleware = store => next => (action: AllActions) => {
  next(action);

  switch (action.type) {
    case START_POLLING_MONITOR_KPI:
      setInterval(dispatchGetMonitorKPI(store.dispatch), MONITOR_INTERVAL);
      break;
    default:
      return;
  }
};

export default monitorMiddleware;
