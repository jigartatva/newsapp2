/* import libraries */
import { StyleSheet } from 'react-native';
import { Colors } from '../../theme/styles/Common';
import * as CommonFunctions from '../../theme/functions/CommonFunctions';

const LIST_ITEM_TITLE_TEXT1 = 'rgba(0, 0, 0, 0.90)';
const WHITE_COLOR = 'white';
const SOURCE = "#ff0040";
const SHADOW = 'rgba(0, 0, 0, 0.75)';
const PUBLISH = 'rgba(0, 0, 0, 0.90)';
const BORDER = 'black';
const BORDER_BACK = 'steelblue';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color: WHITE_COLOR,
    fontSize: 16,
    padding: 5,
    fontWeight: 'bold',
    textShadowColor: LIST_ITEM_TITLE_TEXT1,
    textShadowOffset: {width: -2, height: 2},
    textShadowRadius: 20
  },
  source: {
    backgroundColor : SOURCE,
    borderRadius: 5,
    padding : 5
  },
  shadowView:{
    shadowColor: SHADOW,
    shadowOffset : {width: -1, height: 1},
    shadowRadius : 20,
    shadowOpacity : 1
  },
  TouchableOpacityStyle: {
    borderColor: BORDER,
    borderWidth: 1,
    backgroundColor: BORDER_BACK,
  },
  activityIndicator:{
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1000
  },
  searchBox:{
    justifyContent: 'flex-start',
    flexDirection : 'row',
    width: '100%', 
    flex:1 
  },
  subSearchBox:{
    flex: 10
  },
  gridview: {
    backgroundColor: WHITE_COLOR, justifyContent: 'flex-start', flex:10 ,width:'100%',paddingRight:20
  },
  cardview: {
    width: '75%', alignItems: 'flex-start',alignContent:'flex-end', justifyContent: 'flex-end' ,position:'absolute',bottom:5 
  },
  publish:{
    color:WHITE_COLOR,textShadowColor: PUBLISH,textShadowOffset: {width: -2, height: 2},textShadowRadius: 20
  },
  image:{
    height:'100%' , width: '100%'
  },
  actionbutton:{
    color : "rgba(231,76,60,1)"
  }
});

/* export the styling */
export default styles;