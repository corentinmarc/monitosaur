import { AppThunkMiddleware } from 'entities/thunk';
import { AllActions } from 'actions';
import { DISPLAY_NOTIFICATION } from 'constants/notifications';

let canDisplayNotification = false;

Notification.requestPermission((permission) => {
  if (permission === 'granted') {
    canDisplayNotification = true;
  }
});

const notificationsMiddleware: AppThunkMiddleware = _ => next => (action: AllActions) => {
  next(action);

  switch (action.type) {
    case DISPLAY_NOTIFICATION:
      canDisplayNotification && new Notification(
        action.payload.title,
        {
          body: action.payload.body,
          icon: action.payload.icon,
        },
      );
      break;
    default:
      return;
  }
};

export default notificationsMiddleware;
