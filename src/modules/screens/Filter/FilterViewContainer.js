import { connect } from "react-redux";
import FilterView from "./FilterView";
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';

export default connect(
    state => ({
      
      loading: state.getIn(['appReducer', 'loading']),
      newsSources: state.getIn(['newsReducer', 'newsSources']),
      newsList: state.getIn(['newsReducer', 'newsList']),
      
    }),
    dispatch => {
      return {
        navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      };
    }
  )(FilterView);
  

  