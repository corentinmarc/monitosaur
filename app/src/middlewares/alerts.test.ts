import 'jest';

import { fetchMonitorKPISuccess } from 'actions/monitor';
import { setCurrentAlert, addAlertMessage } from 'actions/alerts';
import { displayNotification } from 'actions/notifications';
import { MONITOR_PERIODS, MONITOR_INTERVAL } from 'constants/monitor';
import {
  ALERT_MESSAGE_TYPES,
  ALERT_DURATION_THRESHOLD,
} from 'constants/alerts';
import {
  NOTIFICATION_ALERT_TITLE,
  NOTIFICATION_ALERT_BODY,
  NOTIFICATION_ALERT_STOP_TITLE,
  NOTIFICATION_ALERT_STOP_BODY,
} from 'constants/notifications';
import okIcon from 'assets/images/ok.png';
import warnIcon from 'assets/images/warn.png';

import alertsMiddleware from './alerts';

// Mocking Date.now used to genereate timestamps
const now = 123;
global.Date = {
  now: () => now,
};

const getFetchMonitorKPISuccessAction = (loadAvg: number = 1, timestamp: number = 1) =>
  fetchMonitorKPISuccess({
    loadAvg,
    timestamp,
    cpus: 1,
    freemem: 12,
    totalmem: 50,
  });

const monitorState = {
  cpus: 4,
  loadAvg: 1.3,
  freemem: 3,
  totalmem: 16,
  evolutionLoadAvg: [],
  periodToDisplay: MONITOR_PERIODS['2 Minutes'],
};

const alertsState = {
  messages: [],
  currentAlert: null,
};

const numberOfEvolutionPoints = ALERT_DURATION_THRESHOLD / MONITOR_INTERVAL;

describe('middlewares/alerts', () => {
  it('should call next', () => {
    const store = {
      getState: () => ({
        monitor: monitorState,
        alerts: alertsState,
      }),
      dispatch: jest.fn(),
    };

    const next = jest.fn();

    alertsMiddleware(store)(next)(getFetchMonitorKPISuccessAction());

    expect(next).toBeCalledTimes(1);
  });

  describe('There is no current alert', () => {

    const actionTimestamp = 32;

    const evolutionLoadAvgNoCurrentAlertState = [
      { loadAvg: 0.99, timestamp: 1 },
      { loadAvg: 0.99, timestamp: 2 },
      { loadAvg: 0.99, timestamp: 3 },
      { loadAvg: 0.99, timestamp: 4 },
      { loadAvg: 0.99, timestamp: 5 },
      { loadAvg: 0.99, timestamp: 6 },
      { loadAvg: 0.99, timestamp: 7 },
      { loadAvg: 0.99, timestamp: 8 },
      { loadAvg: 0.99, timestamp: 9 },
      { loadAvg: 0.99, timestamp: 10 },
      { loadAvg: 0.99, timestamp: 11 },
      { loadAvg: 0.99, timestamp: 12 },
      { loadAvg: 0.99, timestamp: 13 },
      { loadAvg: 0.99, timestamp: 14 },
      { loadAvg: 0.99, timestamp: 15 },
    ];

    describe('Load average just passed threshold', () => {

      const fetchMonitorKPISuccessAction = getFetchMonitorKPISuccessAction(3, actionTimestamp);

      const newEvolutionPointFromAction = {
        loadAvg: fetchMonitorKPISuccessAction.payload.monitorKPIs.loadAvg,
        timestamp: fetchMonitorKPISuccessAction.payload.monitorKPIs.timestamp,
      };

      const evolutionLoadAvgState = [
        newEvolutionPointFromAction,
        ...evolutionLoadAvgNoCurrentAlertState,
      ];

      // Mock redux store
      const store = {
        getState: () => ({
          monitor: {
            ...monitorState,
            evolutionLoadAvg: evolutionLoadAvgState,
          },
          alerts: alertsState,
        }),
        dispatch: jest.fn(),
      };

      // Mock next function
      const next = jest.fn();

      const expectedAlertLoadAvg = evolutionLoadAvgState
        .slice(0, numberOfEvolutionPoints)
        .reduce((total, point) => total + point.loadAvg, 0) / (numberOfEvolutionPoints);

      alertsMiddleware(store)(next)(fetchMonitorKPISuccessAction);

      it('should dispatch: 1.setCurrentAlert', () => {
        const expectedCurrentAlert = {
          loadAvg: expectedAlertLoadAvg,
          startedAt: actionTimestamp,
        };

        expect(store.dispatch).toHaveBeenCalledWith(setCurrentAlert(expectedCurrentAlert));
      });

      it('should dispatch: 2.displayNotification', () => {
        const expectedNotification = {
          title: NOTIFICATION_ALERT_TITLE,
          body: NOTIFICATION_ALERT_BODY(expectedAlertLoadAvg),
          icon: warnIcon,
        };

        expect(store.dispatch).toHaveBeenCalledWith(displayNotification(expectedNotification));
      });

      it('should dispatch: 3.addAlertMessage', () => {
        expect(store.dispatch).toHaveBeenCalledWith(
          addAlertMessage(ALERT_MESSAGE_TYPES.ALERT, { loadAvg: expectedAlertLoadAvg }),
        );
      });
    });

    describe('Load average stays under threshold', () => {

      const fetchMonitorKPISuccessAction = getFetchMonitorKPISuccessAction(0.99);

      const newEvolutionPointFromAction = {
        loadAvg: fetchMonitorKPISuccessAction.payload.monitorKPIs.loadAvg,
        timestamp: fetchMonitorKPISuccessAction.payload.monitorKPIs.timestamp,
      };

      const evolutionLoadAvgState = [
        newEvolutionPointFromAction,
        ...evolutionLoadAvgNoCurrentAlertState,
      ];

      // Mock redux store
      const store = {
        getState: () => ({
          monitor: {
            ...monitorState,
            evolutionLoadAvg: evolutionLoadAvgState,
          },
          alerts: alertsState,
        }),
        dispatch: jest.fn(),
      };

      // Mock next function
      const next = jest.fn();

      alertsMiddleware(store)(next)(fetchMonitorKPISuccessAction);

      it('should dispatch nothing', () => {
        expect(store.dispatch).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('There is a current alert', () => {

    const actionTimestamp = 10;
    const currentAlertStartedAt = 1;

    const currentAlert = {
      loadAvg: 1.01,
      startedAt: currentAlertStartedAt,
    };

    const evolutionLoadAvgWithCurrentAlertState = [
      { loadAvg: 1.01, timestamp: 1 },
      { loadAvg: 1.01, timestamp: 2 },
      { loadAvg: 1.01, timestamp: 3 },
      { loadAvg: 1.01, timestamp: 4 },
      { loadAvg: 1.01, timestamp: 5 },
      { loadAvg: 1.01, timestamp: 6 },
      { loadAvg: 1.01, timestamp: 7 },
      { loadAvg: 1.01, timestamp: 8 },
      { loadAvg: 1.01, timestamp: 9 },
      { loadAvg: 1.01, timestamp: 10 },
      { loadAvg: 1.01, timestamp: 11 },
      { loadAvg: 1.01, timestamp: 12 },
      { loadAvg: 1.01, timestamp: 13 },
      { loadAvg: 1.01, timestamp: 14 },
      { loadAvg: 1.01, timestamp: 15 },
    ];

    describe('Load average just passed under threshold', () => {

      const fetchMonitorKPISuccessAction = getFetchMonitorKPISuccessAction(0.5, actionTimestamp);

      const newEvolutionPointFromAction = {
        loadAvg: fetchMonitorKPISuccessAction.payload.monitorKPIs.loadAvg,
        timestamp: fetchMonitorKPISuccessAction.payload.monitorKPIs.timestamp,
      };

      const evolutionLoadAvgState = [
        newEvolutionPointFromAction,
        ...evolutionLoadAvgWithCurrentAlertState,
      ];

       // Mock redux store
      const store = {
        getState: () => ({
          monitor: {
            ...monitorState,
            evolutionLoadAvg: evolutionLoadAvgState,
          },
          alerts: {
            ...alertsState,
            currentAlert,
          },
        }),
        dispatch: jest.fn(),
      };

      // Mock next function
      const next = jest.fn();

      alertsMiddleware(store)(next)(fetchMonitorKPISuccessAction);

      it('should dispatch: 1.setCurrentAlert to null', () => {
        expect(store.dispatch).toHaveBeenCalledWith(setCurrentAlert(null));
      });

      it('should dispatch: 2.displayNotification ', () => {
        const expectedNotification = {
          title: NOTIFICATION_ALERT_STOP_TITLE,
          body: NOTIFICATION_ALERT_STOP_BODY,
          icon: okIcon,
        };

        expect(store.dispatch).toHaveBeenCalledWith(displayNotification(expectedNotification));
      });

      it('should dispatch: 3.addAlertMessage', () => {
        const duration = actionTimestamp - currentAlertStartedAt;
        expect(store.dispatch).toHaveBeenCalledWith(
          addAlertMessage(ALERT_MESSAGE_TYPES.ALERT_STOP, { duration }),
        );
      });
    });

    describe('Load average stays above threshold', () => {

      const fetchMonitorKPISuccessAction = getFetchMonitorKPISuccessAction(1.01, actionTimestamp);

      const newEvolutionPointFromAction = {
        loadAvg: fetchMonitorKPISuccessAction.payload.monitorKPIs.loadAvg,
        timestamp: fetchMonitorKPISuccessAction.payload.monitorKPIs.timestamp,
      };

      const evolutionLoadAvgState = [
        newEvolutionPointFromAction,
        ...evolutionLoadAvgWithCurrentAlertState,
      ];

       // Mock redux store
      const store = {
        getState: () => ({
          monitor: {
            ...monitorState,
            evolutionLoadAvg: evolutionLoadAvgState,
          },
          alerts: {
            ...alertsState,
            currentAlert,
          },
        }),
        dispatch: jest.fn(),
      };

      // Mock next function
      const next = jest.fn();

      alertsMiddleware(store)(next)(fetchMonitorKPISuccessAction);

      const expectedAlertLoadAvg = evolutionLoadAvgState
        .slice(0, numberOfEvolutionPoints)
        .reduce((total, point) => total + point.loadAvg, 0) / (numberOfEvolutionPoints);

      it('should dispatch: 1.setCurrentAlert to update loadAvg', () => {
        const expectedCurrentAlert = {
          loadAvg: expectedAlertLoadAvg,
          startedAt: currentAlertStartedAt,
        };

        expect(store.dispatch).toHaveBeenCalledWith(setCurrentAlert(expectedCurrentAlert));
      });

      it('should dispatch: 2.displayNotification ', () => {
        const expectedNotification = {
          title: NOTIFICATION_ALERT_TITLE,
          body: NOTIFICATION_ALERT_BODY(expectedAlertLoadAvg),
          icon: warnIcon,
        };

        expect(store.dispatch).toHaveBeenCalledWith(displayNotification(expectedNotification));
      });

      it('should dispatch: 3.addAlertMessage', () => {
        expect(store.dispatch).toHaveBeenCalledWith(
          addAlertMessage(ALERT_MESSAGE_TYPES.ALERT, { loadAvg: expectedAlertLoadAvg }),
        );
      });
    });
  });
});
