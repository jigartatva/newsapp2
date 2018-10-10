import {
  createTabNavigator,
  createStackNavigator
} from 'react-navigation';

import HomeViewContainer from '../screens/home/HomeViewContainer';
import SearchViewContainer from '../screens/search/SearchViewContainer';
import FilterViewContainer from '../screens/Filter/FilterViewContainer';

// MainStack is nested inside StackNavigator
export const MainScreenNavigator = createStackNavigator({
  HomeView: {
    screen: HomeViewContainer
  },
  SearchView: {
    screen: SearchViewContainer
  },
  Filter: {
    screen: FilterViewContainer
  }
}, {
  headerMode: 'screen'
}, {
  initialRouteName: 'HomeView'
});

// Root navigator is a StackNavigator
const AppNavigator = createStackNavigator({
  MainScreenNavigator: {
    screen: MainScreenNavigator,
    navigationOptions: {
      header: null
    },

  },

});

export default AppNavigator;