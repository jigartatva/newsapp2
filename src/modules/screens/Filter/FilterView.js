import React, { Component } from "react";
import { View, Text,TouchableOpacity } from "react-native";
import { connect } from "react-redux";
//styles
import styles from "./FilterViewStyles";
import MultiSelect from 'react-native-multiple-select';
import * as NewsAuthAPI from '../../../services/newsAuthAPI';
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
      currentPageIndex:1,
      allNews:[],
      searchedNews:[],
      items:[],
      searchQuery: '',
      isSearch:false,
     selectedItems:[],
      fruits : [{ label: 'Apples', value: 'appls' },
        { label: 'Oranges', value: 'orngs' },
        { label: 'Pears', value: 'pears' }]
    };
    this._onapplyFilter =this._onapplyFilter.bind(this);
    this._fetchSourcesList=this._fetchSourcesList.bind(this)
  }
  
  componentWillMount() {
    console.log("will mount")
    this._fetchSourcesList();
  }

  componentDidMount() {
   
    // console.log("source==>",this.props.newsSources);
   let sources =this.props.newsSources;
    if(CommonFunctions.isJson(this.props.newsSources)){
     
      let sources = JSON.parse(this.props.newsSources)
      // console.log("source==>",sources[0])
    var sourceArr =[];
      for(var i=0;i<sources.length;i++){

         sourceArr.push({value: sources[i].id,label: sources[i].name});
        
      }
      this.setState({items:sourceArr});
      // console.log("sources",this.state.selectedItems);

    }
    
  }

  

  componentWillReceiveProps(nextProps) {

    // console.log("nxtprops==>",nextProps.newsSources)
    if (nextProps.newsSources !== this.props.newsSources) {
      if (CommonFunctions.isJson(nextProps.newsSources)) {
        let sources = JSON.parse(nextProps.newsSources)
      this.setState({ items: sources });
       
      }
    } 

}

  onSelectedItemsChange = selectedItems => {
    
    this.setState({ selectedItems:selectedItems });
    // console.log("slected items",this.state.selectedItems)
  };
 
  _fetchSourcesList(){
    this.props.dispatch(NewsAuthAPI.getNewsSources());
      }

   _onapplyFilter(){
        console.log("filter",this.state.selectedItems[0].value);
        var sourceBy="";
        for(var i=0;i<this.state.selectedItems.length;i++){
          if(sourceBy){
            sourceBy =sourceBy.concat(",",this.state.selectedItems[i].value);
          }else{
          sourceBy =sourceBy.concat(this.state.selectedItems[i].value);
          }
        }
        console.log("filter",sourceBy);
        this.props.dispatch(NewsAuthAPI.getNewsListBySources(sourceBy));
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
