import { connect } from "react-redux";
import FilterView from "./FilterView";
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';

export default connect(
    state => ({
      loading: state.getIn(['appReducer', 'loading']),
      newsSources: state.getIn(['newsReducer', 'newsSources']),
    }),
    dispatch => {
      return {
        navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      };
    }
  )(FilterView);
  

  