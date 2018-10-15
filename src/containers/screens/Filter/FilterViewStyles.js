import { StyleSheet, Platform } from "react-native";
const BLACK = 'black';
const GREY = 'grey';
const styles = StyleSheet.create({
  container: {
    flex: 1
  },TouchableOpacityStyle: {
  
    marginBottom: 0,
    borderColor: BLACK,
    borderWidth: 1,
    backgroundColor: GREY,
    height: 40,
    width: '100%',
   },
  applyBtn : {
    fontSize: 20, textAlign: 'center', paddingTop:10, color: BLACK
  } 
});
export default styles;
