import React, { Component } from "react";
import { View, Text,TouchableOpacity,Alert } from "react-native";
import { connect } from "react-redux";
import * as NewsAuthAPI from '../../../redux/NewsAuthAPI'
import SelectMultiple from 'react-native-select-multiple'
/* styles and functions */
import styles from "./FilterViewStyles";
import * as CommonFunctions from '../../theme/functions/CommonFunctions';


class FilterView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Source List",
    gesturesEnabled: false,
  
  });
  constructor(props) {
    super(props);
    this.state = {
      isLoadMore: false,
      items:[],
     selectedItems:[],
     
    };
    this._onapplyFilter =this._onapplyFilter.bind(this);
    this._fetchSourcesList=this._fetchSourcesList.bind(this)
  }
  
  componentWillMount() {
    this._fetchSourcesList();
  }

  componentDidMount() {
   let sources =this.props.newsSources;
    if(CommonFunctions.isJson(this.props.newsSources)){
      let sources = JSON.parse(this.props.newsSources)
        var sourceArr =[];
          for(var i=0;i<sources.length;i++){
            sourceArr.push({value: sources[i].id,label: sources[i].name});
          }
      this.setState({items:sourceArr});
    }
  }

  componentWillReceiveProps(nextProps) {
    var sourceBy = this.props.navigation.getParam('sourceBy') ;
    if(sourceBy!=null){
    var preselectedItems= sourceBy.split(',');
    this.setState({selectedItems:preselectedItems})
    }
 if (nextProps.newsSources !== this.props.newsSources) {
      if (CommonFunctions.isJson(nextProps.newsSources)) {
        let sources = JSON.parse(nextProps.newsSources)
        this.setState({ items: sources });
      }
    } 
}

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems:selectedItems });
 };
 
  _fetchSourcesList(){
    this.props.dispatch(NewsAuthAPI.getNewsSources());
  }

   _onapplyFilter(){
     var isSearch =  this.props.navigation.getParam('search');
     if(this.state.selectedItems){
      var isFilter = true
      var sourceBy="";
        for(var i=0;i<this.state.selectedItems.length;i++){
          if(sourceBy){
            sourceBy =sourceBy.concat(",",this.state.selectedItems[i].value);
          }else{
          sourceBy =sourceBy.concat(this.state.selectedItems[i].value);
          }
        }
        if(isSearch){
           this.props.dispatch(NewsAuthAPI.getNewsBySearch(isSearch, 1, 10,sourceBy))
        }else{
          this.props.dispatch(NewsAuthAPI.getNewsList(1, 10,sourceBy));
        }
      this.props.navigation.navigate({routeName:'HomeView',params:{sourceBy:sourceBy,isFilter:isFilter,currentIndexPage:1}})
     }
  }

render() {
    return (
      <View style={styles.container}>
        <SelectMultiple
          items={this.state.items}
          selectedItems={this.state.selectedItems}
          onSelectionsChange={this.onSelectedItemsChange}/>
        <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this._onapplyFilter} >
           <Text style={styles.applyBtn}> Apply</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect()(FilterView);
