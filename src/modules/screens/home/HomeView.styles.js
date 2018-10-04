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
    height: 100,
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
    color: Colors._000000,
    fontSize: 16,
    padding: 5,
    fontWeight: 'bold'
  },
});

/* export the styling */
export default styles;