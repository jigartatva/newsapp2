import React, { Component } from 'react';
import { SafeAreaView, View, Text, ListView, RefreshControl, ActivityIndicator,TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* styles and functions */
import styles from './HomeView.styles';
import { AllTexts } from '../../theme/css/Common';
import * as CommonFunctions from '../../theme/js/CommonFunctions';

/* external libraries */
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import Image from 'react-native-image-progress';
import ProgressCircle from 'react-native-progress/Circle';
import Search from 'react-native-search-box';
import GridView from 'react-native-super-grid';

/* API */
import * as NewsAuthAPI from '../../../services/newsAuthAPI';

const ITEMS_PER_PAGE = 10;
const { HomeViewTitle } = AllTexts;

class HomeView extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };
  static navigationOptions = ({ navigation }) => ({
    title: HomeViewTitle,
    gesturesEnabled: false
  });

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: this._rowHasChanged.bind(this),
      }),
      isLoadMore: false,
      currentPageIndex: 1,
      allNews: [],
      searchQuery: '',
    };
    this.renderLoadMoreItems = this.renderLoadMoreItems.bind(this);
  }

  componentWillMount() {
    this.setState({ allNews: [], searchQuery: '' });
    this._loadMoreContentAsync();
  }

  componentDidMount() {
    this.setState({ allNews: [], isLoadMore: false });
    if (CommonFunctions.isJson(this.props.newsList)) {
      let articles = JSON.parse(this.props.newsList).articles;
      this.setState({ allNews: [...this.state.allNews, ...articles] })
      this.state.dataSource = this.getUpdatedDataSource(this.state.allNews);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newsList !== this.props.newsList) {
      if (CommonFunctions.isJson(nextProps.newsList)) {
        let articles = JSON.parse(nextProps.newsList).articles;
        if (this.state.currentPageIndex == 1) {
          this.setState({ allNews: [articles] });
        } else {
          this.setState({ allNews: [...this.state.allNews, ...articles] });
        }
        this.setState({ dataSource: this.getUpdatedDataSource(this.state.allNews), isLoadMore: false });
      }
    }

  }

  getUpdatedDataSource(props) {
    let rows = props;
    let ids = rows.map((obj, index) => index);
    return this.state.dataSource.cloneWithRows(rows, ids);
  }

  _rowHasChanged(r1, r2) {
    return JSON.stringify(r1) !== JSON.stringify(r2);
  }

  _renderRefreshControl() {
 
    return (
      <RefreshControl
        refreshing={this.state.isLoadMore}
        onRefresh={this._loadMoreContentAsync.bind(this)}
      />
    );
  }


  _loadMoreContentAsync = async () => {
    this.setState({ isLoadMore: true });
    this.state.searchQuery ? this.props.dispatch(NewsAuthAPI.getNewsBySearch(this.state.searchQuery, this.state.currentPageIndex, ITEMS_PER_PAGE))
      : this.props.dispatch(NewsAuthAPI.getNewsList(this.state.currentPageIndex, ITEMS_PER_PAGE));
    this.setState({ isLoadMore: false });
  }

  renderLoadMoreItems() {
    let newsProps = JSON.parse(this.props.newsList);
    let maxItems = newsProps.totalResults;
    if (maxItems >= this.state.currentPageIndex * ITEMS_PER_PAGE) {
      this.state.searchQuery ? this.props.dispatch(NewsAuthAPI.getNewsBySearch(this.state.searchQuery, this.state.currentPageIndex, ITEMS_PER_PAGE))
        : this.props.dispatch(NewsAuthAPI.getNewsList(this.state.currentPageIndex + 1, ITEMS_PER_PAGE));
      this.setState({ currentPageIndex: this.state.currentPageIndex + 1, });
    }
  }

  _onSearch(text) {
    this.setState({ allNews: [], searchQuery: text });
    this.props.dispatch(NewsAuthAPI.getNewsBySearch(text, this.state.currentPageIndex, ITEMS_PER_PAGE));
  }

  _onCancel() {
    this.setState({ allNews: [], searchQuery: '' });
    this._loadMoreContentAsync();
  }

  render() {
    return (
      <SafeAreaView style={[styles.container]}>
        <View style={{ justifyContent: 'center', position: 'absolute', zIndex: 1000 }}>
          <ActivityIndicator size="large" color="#0000ff" animating={this.props.loading} />
        </View>

        <View style={{ justifyContent: 'flex-start',flexDirection : 'row', width: '100%', height: '15%' }}>
          
            <View style={{flex:7}}>
              <Search ref="search_box" onSearch={(text) => this._onSearch(text)} onCancel={() => this._onCancel()} />
            </View>
            <View style={{flex:1}}>
              <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={()=>this.props.navigation.navigate('Filter')} >
                <Text style={{ fontSize: 10, textAlign: 'center', paddingTop:10, color: 'black' }}> filter</Text>   
              </TouchableOpacity>
            </View>
        </View>

        <View style={{ backgroundColor: 'greeen', justifyContent: 'flex-start', width: '100%', height: '80%' }}>
        <GridView
          itemDimension={150}
          spacing={1}
          onEndReached = {this.renderLoadMoreItems}   
          refreshControl={this._renderRefreshControl()}         
          items={this.state.allNews}
          renderItem={item => (
            
                <View key={Math.random()} style={styles.articleListView}>
                  <Image source={{ uri: item.urlToImage}} style={{height:'100%' , width: '100%'}}>
                    <View style={{ width: '75%', alignItems: 'flex-start',alignContent:'flex-end', justifyContent: 'flex-end' ,position:'absolute',bottom:5 }}>
                      <View style={styles.source}>
                        <Text>{item.source.name  ? item.source.name : 'not available'}</Text>
                      </View>
                      <View style={styles.shadowView}>
                        <Text style={styles.listItemTitleText} numberOfLines={3} ellipsizeMode ={'tail'}>{item.title}</Text>
                      </View>
                      <Text style={{color:'white',textShadowColor: 'rgba(0, 0, 0, 0.90)',textShadowOffset: {width: -2, height: 2},textShadowRadius: 20}}>publish on: {item.publishedAt}</Text>                                                                                                                                                                                                                                                                                                                 
                    </View>
                  </Image>
                </View>
              
          )}
        />
        </View>
      </SafeAreaView>
    );
  }
}

export default connect()(HomeView);