import { connect } from "react-redux";
import FilterView from "./FilterView";
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';

export default connect(
    state => ({
      // props
      // loading: state.getIn(['newsAuth', 'loading']),
      // errorMsg: state.getIn(['newsAuth', 'errorMsg']),
      // newsArticles: state.getIn(['newsAuth', 'newsArticles']),
      // getTopHeadlinesSuccess: state.getIn(['newsAuth', 'getTopHeadlinesSuccess']),
  
      loading: state.getIn(['appReducer', 'loading']),
      newsSources: state.getIn(['newsReducer', 'newsSources']),
      newsList: state.getIn(['newsReducer', 'newsList'])
    }),
    dispatch => {
      return {
        navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      };
    }
  )(FilterView);
  

  