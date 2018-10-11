import React, { Component } from "react";
import { View, Text,TouchableOpacity } from "react-native";
import { connect } from "react-redux";
//styles
import styles from "./FilterViewStyles";

import * as NewsAuthAPI from '../../../redux/newsAuthAPI'
import * as CommonFunctions from '../../theme/js/CommonFunctions';
import SelectMultiple from 'react-native-select-multiple'


class FilterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // dataSource: new ListView.DataSource({
      //   rowHasChanged: this._rowHasChanged.bind(this),
      // }),
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
   
  this.setState({selectedItems : []});
   
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
    var isFilter = true
    console.log("isFilter==>",isFilter);
        
        var sourceBy="";
        for(var i=0;i<this.state.selectedItems.length;i++){
          if(sourceBy){
            sourceBy =sourceBy.concat(",",this.state.selectedItems[i].value);
          }else{
          sourceBy =sourceBy.concat(this.state.selectedItems[i].value);
          }
        }
        console.log("filter",sourceBy);
        this.props.dispatch(NewsAuthAPI.getNewsListBySources(sourceBy,1,10));
        this.props.navigation.navigate({routeName:'HomeView',params:{sourceBy:sourceBy,isFilter:isFilter}})
        // this.props.dispatch(NewsAuthAPI.getNewsListBySources(sourceBy));
      }

  render() {
   console.log("items==>",this.state.items) 
    return (
      <View style={styles.container}>
        <SelectMultiple
          items={this.state.items}
          selectedItems={this.state.selectedItems}
          onSelectionsChange={this.onSelectedItemsChange} />
        <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this._onapplyFilter} >
           <Text style={{ fontSize: 20, textAlign: 'center', paddingTop:10, color: 'black' }}> apply</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect()(FilterView);
