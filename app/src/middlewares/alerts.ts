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
  ALERT_LOAD_THRESHOLD,
  ALERT_DURATION_THRESHOLD,
  ALERT_MESSAGE_TYPES,
} from 'constants/alerts';
import { evolutionLoadAverageForPeriodSelector } from 'selectors/monitor';
import { currentAlertSelector } from 'selectors/alerts';
import okIcon from 'assets/images/ok.png';
import warnIcon from 'assets/images/warn.png';
import { fromMsToMinutes } from 'helpers/converters';

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
          title: 'High CPU load',
          body: `Load average during last ${
            fromMsToMinutes(ALERT_DURATION_THRESHOLD)
          } minutes: ${loadAvg.toFixed(2)}`,
          icon: warnIcon,
        }));
        if (!currentAlert) {
          // We set a current alert
          store.dispatch(
            setCurrentAlert({ loadAvg, startedAt: Date.now() }),
          );
        } else {
          // We update current alert loadAvg
          store.dispatch(
            setCurrentAlert({ loadAvg, startedAt: currentAlert.startedAt }),
          );
        }
      } else if (currentAlert) {
          // We set current alert to null and add an alert stop message
        const duration = (Date.now() - currentAlert.startedAt); // Duration in ms
        store.dispatch(setCurrentAlert(null));
        store.dispatch(addAlertMessage(ALERT_MESSAGE_TYPES.ALERT_STOP, { duration }));
        store.dispatch(displayNotification({
          title: 'Normal CPU Load',
          body: `Load average during last ${
            fromMsToMinutes(ALERT_DURATION_THRESHOLD)
          } minutes return below ${ALERT_LOAD_THRESHOLD}`,
          icon: okIcon,
        }));
      }
      break;
    default:
      return;
  }
};

export default alertsMiddleware;