import { Actions as MonitorActions } from 'actions/monitor';
import { Actions as AlertsActions } from 'actions/alerts';
import { Actions as NotificationsActions } from 'actions/notifications';

export type AllActions = MonitorActions | AlertsActions | NotificationsActions;
