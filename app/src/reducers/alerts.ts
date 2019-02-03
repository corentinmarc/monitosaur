import { range } from 'd3';

import {
  SET_CURRENT_ALERT,
  ADD_ALERT_MESSAGE,
  REMOVE_ALERT_MESSAGE,
  ALERT_MESSAGE_TYPES,
} from 'constants/alerts';
import {
  AlertMessage,
  Alert,
} from 'entities/alerts';
import { AllActions } from 'actions';
import { fromMinutesToMs } from 'helpers/converters';

export interface AlertsState {
  messages: AlertMessage[];
  currentAlert: Maybe<Alert>;
}

const alertMessagesFixture = (nbAlert: number): AlertMessage[] => {
  return range(0, nbAlert * 2).map((index) => {
    const type = index % 5 ? ALERT_MESSAGE_TYPES.ALERT : ALERT_MESSAGE_TYPES.ALERT_STOP;
    const timestamp = Date.now() - index * 10 * 1000;
    const id = `${type}-${timestamp}`;

    if (type === ALERT_MESSAGE_TYPES.ALERT) {
      return {
        id,
        timestamp,
        type,
        loadAvg: 1 + Math.random() * 3,
      };
    }

    if (type === ALERT_MESSAGE_TYPES.ALERT_STOP) {
      return {
        id,
        timestamp,
        type,
        duration: fromMinutesToMs(2 + Math.random() * 10),
      };
    }
  });
};

export const defaultState: AlertsState = {
  // messages: [],
  messages: alertMessagesFixture(10),
  currentAlert: null,
};

const addAlertMessage = (state: AlertsState, alertMessage: AlertMessage): AlertsState => ({
  ...state,
  messages: [alertMessage, ...state.messages],
});

const removeAlertMessage = (
  state: AlertsState,
  alertMessageID: AlertMessage['id'],
): AlertsState => ({
  ...state,
  messages: state.messages.filter(message => message.id !== alertMessageID),
});

const setCurrentAlert = (state: AlertsState, currentAlert: Alert): AlertsState => ({
  ...state,
  currentAlert,
});

export default (state: AlertsState = defaultState, action: AllActions): AlertsState => {
  switch (action.type) {
    case ADD_ALERT_MESSAGE:
      return addAlertMessage(state, action.payload);
      break;
    case REMOVE_ALERT_MESSAGE:
      return removeAlertMessage(state, action.payload.alertMessageID);
      break;
    case SET_CURRENT_ALERT:
      return setCurrentAlert(state, action.payload.alert);
      break;
    default:
      return state;
  }
};
