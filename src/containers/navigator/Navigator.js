import {
  createStackNavigator
} from 'react-navigation'

import HomeViewContainer from '../screens/home/HomeViewContainer'
import FilterViewContainer from '../screens/filter/FilterViewContainer'
import {createNavigationContainer} from 'react-navigation'

// MainStack is nested inside StackNavigator
 const MainScreenNavigator = createStackNavigator({
  HomeView: {
    screen: HomeViewContainer

  },
  Filter: {
    screen: FilterViewContainer

  }
}, {
  headerMode: 'screen'
}, {
  initialRouteName: 'HomeView'
})

// Root navigator is a StackNavigator
const AppNavigator = createStackNavigator({
  MainScreenNavigator: {
    screen: MainScreenNavigator,
    navigationOptions: {
      header: null
    }

  }

})

export default AppNavigator
