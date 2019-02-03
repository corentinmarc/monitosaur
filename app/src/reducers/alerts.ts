import {
  SET_CURRENT_ALERT,
  ADD_ALERT_MESSAGE,
  REMOVE_ALERT_MESSAGE,
} from 'constants/alerts';
import {
  AlertMessage,
  Alert,
} from 'entities/alerts';
import { AllActions } from 'actions';
import { shouldUseFixture } from 'helpers/fixtures';
import { getAlertMessagesFixture } from 'fixtures/alerts';

export interface AlertsState {
  messages: AlertMessage[];
  currentAlert: Maybe<Alert>;
}

export const defaultState: AlertsState = {
  messages: shouldUseFixture() ? getAlertMessagesFixture(20) : [],
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
