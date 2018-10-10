/* import libraries */
import { StyleSheet } from 'react-native';
import { Colors } from '../../theme/css/Common';
import * as CommonFunctions from '../../theme/js/CommonFunctions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: Colors._FFFFFF,
    justifyContent: 'center',
    alignItems: 'center',
    width: CommonFunctions.screenWidth(100, 0),
    height: CommonFunctions.screenHeight(100, 0),
  },
  articleListView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 200,
    width: '90%',
    marginTop: 10,
    marginLeft: 20,
    backgroundColor: Colors._FFFFFF,
    borderRadius: 5,
  },
  articleListImage: {
    height: 50,
    width: 50
  },
  listItemTitleText: {
    color: 'white',
    fontSize: 16,
    padding: 5,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.90)',
    textShadowOffset: {width: -2, height: 2},
    textShadowRadius: 20
  },
  source: {
    backgroundColor : '#ff0040',
    borderRadius: 5,
    padding : 5
  },
  shadowView:{
    shadowColor: 'rgba(0, 0, 0, 0.75)',
    shadowOffset : {width: -1, height: 1},
    shadowRadius : 20,
    shadowOpacity : 1
  },
  TouchableOpacityStyle: {
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'steelblue',
    height: 40,
  }
});

/* export the styling */
export default styles;