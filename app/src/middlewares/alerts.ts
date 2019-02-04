import { AppThunkMiddleware } from 'entities/thunk';
import { MonitorEvolutionPoint } from 'entities/monitor';
import { AllActions } from 'actions';
import {
  setCurrentAlert,
  addAlertMessage,
} from 'actions/alerts';
import { displayNotification } from 'actions/notifications';
import { FETCH_MONITOR_KPI_SUCCESS } from 'constants/monitor';
import {
  NOTIFICATION_ALERT_TITLE,
  NOTIFICATION_ALERT_BODY,
  NOTIFICATION_ALERT_STOP_TITLE,
  NOTIFICATION_ALERT_STOP_BODY,
} from 'constants/notifications';
import {
  ALERT_LOAD_THRESHOLD,
  ALERT_DURATION_THRESHOLD,
  ALERT_MESSAGE_TYPES,
} from 'constants/alerts';
import { evolutionLoadAverageForPeriodSelector } from 'selectors/monitor';
import { currentAlertSelector } from 'selectors/alerts';
import okIcon from 'assets/images/ok.png';
import warnIcon from 'assets/images/warn.png';

const getLoadAverage = (evolution: MonitorEvolutionPoint[]) =>
  evolution.reduce((total, point) => total + point.loadAvg, 0) / evolution.length;

const alertsMiddleware: AppThunkMiddleware = store => next => (action: AllActions) => {
  next(action);

  switch (action.type) {
    case FETCH_MONITOR_KPI_SUCCESS:
      const state = store.getState();
      const evolutionForDurationThreshold =
        evolutionLoadAverageForPeriodSelector(state, ALERT_DURATION_THRESHOLD);
      const currentAlert = currentAlertSelector(state);

      const loadAvg = getLoadAverage(evolutionForDurationThreshold);

      if (loadAvg > ALERT_LOAD_THRESHOLD) {
        // Add a alert message
        store.dispatch(
          addAlertMessage(ALERT_MESSAGE_TYPES.ALERT, { loadAvg }),
        );
        store.dispatch(displayNotification({
          title: NOTIFICATION_ALERT_TITLE,
          body: NOTIFICATION_ALERT_BODY(loadAvg),
          icon: warnIcon,
        }));
        if (!currentAlert) {
          // We set a current alert
          store.dispatch(
            setCurrentAlert({ loadAvg, startedAt: action.payload.monitorKPIs.timestamp }),
          );
        } else {
          // We update current alert loadAvg
          store.dispatch(
            setCurrentAlert({ loadAvg, startedAt: currentAlert.startedAt }),
          );
        }
      } else if (currentAlert) {
          // We set current alert to null and add an alert stop message
        const duration = (action.payload.monitorKPIs.timestamp - currentAlert.startedAt);
        store.dispatch(setCurrentAlert(null));
        store.dispatch(addAlertMessage(ALERT_MESSAGE_TYPES.ALERT_STOP, { duration }));
        store.dispatch(displayNotification({
          title: NOTIFICATION_ALERT_STOP_TITLE,
          body: NOTIFICATION_ALERT_STOP_BODY,
          icon: okIcon,
        }));
      }
      break;
    default:
      return;
  }
};

export default alertsMiddleware;
