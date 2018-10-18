import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import HomeView from './HomeView';

export default connect(
  state => ({
    loading: state.getIn(['appReducer', 'loading']),
    newsList: state.getIn(['newsReducer', 'newsList']),
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
    };
  }
)(HomeView);
