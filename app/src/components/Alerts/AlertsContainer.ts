import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { AppGlobalState } from 'reducers';
import { alertMessagesSelector } from 'selectors/alerts';
import { removeAlertMessage } from 'actions/alerts';

import Alerts from './Alerts';

export interface StateProps {
  alertMessages: AppGlobalState['alerts']['messages'];
}

export interface DispatchProps {
  removeAlertMessage: typeof removeAlertMessage;
}

const mapStateToProps = (state: AppGlobalState): StateProps => ({
  alertMessages: alertMessagesSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => bindActionCreators(
  {
    removeAlertMessage,
  },
  dispatch,
);

export default connect<StateProps, DispatchProps, {}, AppGlobalState>(
  mapStateToProps,
  mapDispatchToProps,
)(Alerts);
