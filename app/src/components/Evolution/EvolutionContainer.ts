import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { AppGlobalState } from 'reducers';
import {
  evolutionLoadAverageForPeriodSelector,
  periodToDisplaySelector,
 } from 'selectors/monitor';
import { changePeriod } from 'actions/monitor';

import Evolution from './Evolution';

export interface StateProps {
  periodToDisplay: AppGlobalState['monitor']['periodToDisplay'];
  evolutionLoadAverage: AppGlobalState['monitor']['evolutionLoadAvg'];
}

export interface DispatchProps {
  changePeriod: typeof changePeriod;
}

const mapStateToProps = (state: AppGlobalState): StateProps => {
  const periodToDisplay = periodToDisplaySelector(state);
  return {
    periodToDisplay,
    evolutionLoadAverage: evolutionLoadAverageForPeriodSelector(state, periodToDisplay),
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => bindActionCreators(
  { changePeriod },
  dispatch,
 );

export default connect<StateProps, DispatchProps, {}, AppGlobalState>(
  mapStateToProps,
  mapDispatchToProps,
)(Evolution);
