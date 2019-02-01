import { connect } from 'react-redux';

import { AppGlobalState } from 'reducers';
import {
  evolutionLoadAverageSelector,
 } from 'selectors/monitor';

import Evolution from './Evolution';

export interface StateProps {
  evolutionLoadAverage: AppGlobalState['monitor']['evolutionLoadAvg'];
}

const mapStateToProps = (state: AppGlobalState): StateProps => ({
  evolutionLoadAverage: evolutionLoadAverageSelector(state),
});

export default connect<StateProps, {}, {}, AppGlobalState>(
  mapStateToProps,
  {},
)(Evolution);
