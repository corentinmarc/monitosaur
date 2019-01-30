import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize-css';

import { App } from 'components/App';
import {  startPollingMonitorKPI } from 'actions/monitor';
import store from 'store';

// Start polling the monitoring KPIs
store.dispatch(startPollingMonitorKPI());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
