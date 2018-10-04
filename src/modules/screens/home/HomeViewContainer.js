import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import HomeView from './HomeView';

export default connect(
  state => ({
    // props
    // loading: state.getIn(['newsAuth', 'loading']),
    // errorMsg: state.getIn(['newsAuth', 'errorMsg']),
    // newsArticles: state.getIn(['newsAuth', 'newsArticles']),
    // getTopHeadlinesSuccess: state.getIn(['newsAuth', 'getTopHeadlinesSuccess']),

    loading: state.getIn(['appReducer', 'loading']),
    newsList: state.getIn(['newsReducer', 'newsList']),
    newsSources: state.getIn(['newsReducer', 'newsSources'])
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
    };
  }
)(HomeView);
