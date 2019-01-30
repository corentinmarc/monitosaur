import { connect } from 'react-redux';

import { AppGlobalState } from 'reducers';

import Metrics from './Metrics';

export interface StateProps {
  cpus: Maybe<number>;
  loadAvg: Maybe<number>;
  freeMem: Maybe<number>;
  totalmem: Maybe<number>;
}

const mapStateToProps = (state: AppGlobalState): StateProps => ({
  cpus: state.monitor.cpus,
  loadAvg: state.monitor.loadAvg,
  freeMem: state.monitor.freemem,
  totalmem: state.monitor.totalmem,
});

export default connect<StateProps, {}, {}, AppGlobalState>(
  mapStateToProps,
  {},
)(Metrics);
