import { AppGlobalState } from 'reducers';

export const alertsRootSelector = (state: AppGlobalState) => state.alerts;

export const alertMessagesSelector = (state: AppGlobalState) => alertsRootSelector(state).messages;
export const currentAlertSelector = (state: AppGlobalState) => alertsRootSelector(state).currentAlert;
