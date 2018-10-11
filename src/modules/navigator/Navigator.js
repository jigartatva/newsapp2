import {
  createTabNavigator,
  createStackNavigator
} from 'react-navigation';

import HomeViewContainer from '../screens/home/HomeViewContainer';
import FilterViewContainer from '../screens/Filter/FilterViewContainer';


// MainStack is nested inside StackNavigator
export const MainScreenNavigator = createStackNavigator({
  HomeView: {
    screen: HomeViewContainer,
    
  },
  Filter: {
    screen: FilterViewContainer,
    navigationOptions: {
      title : "sources"
    },
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