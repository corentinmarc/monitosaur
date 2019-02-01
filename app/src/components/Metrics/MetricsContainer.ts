import { connect } from 'react-redux';

import { AppGlobalState } from 'reducers';
import {
  cpusSelector,
  loadAverageSelector,
  freememSelector,
  totalmemSelector,
 } from 'selectors/monitor';

import Metrics from './Metrics';

export interface StateProps {
  cpus: AppGlobalState['monitor']['cpus'];
  loadAvg: AppGlobalState['monitor']['loadAvg'];
  freeMem: AppGlobalState['monitor']['freemem'];
  totalmem: AppGlobalState['monitor']['totalmem'];
}

const mapStateToProps = (state: AppGlobalState): StateProps => ({
  cpus: cpusSelector(state),
  loadAvg: loadAverageSelector(state),
  freeMem: freememSelector(state),
  totalmem: totalmemSelector(state),
});

export default connect<StateProps, {}, {}, AppGlobalState>(
  mapStateToProps,
  {},
)(Metrics);
