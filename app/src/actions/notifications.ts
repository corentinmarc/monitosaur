import {
  createAction,
  ActionsUnion
} from 'actions/typedActions';
import { DISPLAY_NOTIFICATION } from 'constants/notifications';
import { Notification } from 'entities/notifications';


export const displayNotification = (notification: Notification) => createAction(DISPLAY_NOTIFICATION, { ...notification });

// Only redux Actions, no thunks
export const Actions = {
  displayNotification,
};

export type Actions = ActionsUnion<typeof Actions>;
