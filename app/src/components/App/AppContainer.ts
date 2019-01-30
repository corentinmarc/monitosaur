import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { getMonitorKPI } from 'actions/monitor';
import { AppGlobalState } from 'reducers';

import App from './App';

export interface DispatchProps {
  getMonitorKPI: typeof getMonitorKPI;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => bindActionCreators(
  { getMonitorKPI },
  dispatch,
 );

export default connect<{}, DispatchProps, {}, AppGlobalState>(
  null,
  mapDispatchToProps,
)(App);
