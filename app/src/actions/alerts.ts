import {
  createAction,
  ActionsUnion
} from 'actions/typedActions';
import {
  ADD_ALERT_MESSAGE,
  REMOVE_ALERT_MESSAGE,
  SET_CURRENT_ALERT,
} from 'constants/alerts';
import {
  Alert,
  AlertMessage,
} from 'entities/alerts';

export const addAlertMessage = (
  type: AlertMessage['type'],
  payload: { loadAvg?: number, duration?: number }
) => {
  const timestamp = Date.now();
  return createAction(ADD_ALERT_MESSAGE, {
    id: `${type}-${timestamp}`,
    type,
    timestamp,
    ...payload,
  })
};
export const removeAlertMessage = (alertMessageID: AlertMessage['id']) => createAction(REMOVE_ALERT_MESSAGE, { alertMessageID });
export const setCurrentAlert = (alert: Alert) => createAction(SET_CURRENT_ALERT, { alert });

// Only redux Actions, no thunks
export const Actions = {
  addAlertMessage,
  removeAlertMessage,
  setCurrentAlert,
};

export type Actions = ActionsUnion<typeof Actions>;
