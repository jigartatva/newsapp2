/* eslint-enable */
import React, { Component } from 'react';
import { SafeAreaView, View, Text, ListView, RefreshControl, ActivityIndicator,ToastAndroid, StatusBar} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* styles and functions */
import styles from './HomeView.styles';
import { AllTexts } from '../../theme/styles/Common';
import * as CommonFunctions from '../../theme/functions/CommonFunctions';

/* external libraries */
import Image from 'react-native-image-progress';
import Search from 'react-native-search-box';
import GridView from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button';

/* API */
import * as NewsAuthAPI from '../../../redux/NewsAuthAPI';

const ITEMS_PER_PAGE = 10;
const { HomeViewTitle } = AllTexts;
const ACTION_BUTTON_COLOR = "rgba(231,76,60,1)";

class HomeView extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };
  static navigationOptions = () => ({
    title: HomeViewTitle,
    gesturesEnabled: false,
  });

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: this._rowHasChanged.bind(this),
      }),
      isLoadMore: false,
      currentPageIndex:1,
      allNews: [],
      searchQuery:'',
      isSearch:false,
      sourceBy:""
    };
    this.renderLoadMoreItems = this.renderLoadMoreItems.bind(this);
    this._onFilter =this._onFilter.bind(this);
    this._onLoading =this._onLoading.bind(this);
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
          this.setState({ allNews: articles });
        } else {
          this.setState({ allNews: [...this.state.allNews, ...articles] });
        }
        this.setState({ dataSource: this.getUpdatedDataSource(this.state.allNews), isLoadMore: false });
      }
    }
    if(nextProps.navigation.getParam('sourceBy') !== this.state.sourceBy)
    {
      this.setState({sourceBy : nextProps.navigation.getParam('sourceBy')});
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
    this.state.searchQuery ? this.props.dispatch(NewsAuthAPI.getNewsBySearch(this.state.searchQuery, this.state.currentPageIndex, ITEMS_PER_PAGE,this.state.sourceBy))
      : this.props.dispatch(NewsAuthAPI.getNewsList(this.state.currentPageIndex, ITEMS_PER_PAGE,this.state.sourceBy));
    this.setState({ isLoadMore: false });
  }

  renderLoadMoreItems() {
    let newsProps = JSON.parse(this.props.newsList);
    let maxItems = newsProps.totalResults;
    if (maxItems >= this.state.currentPageIndex * ITEMS_PER_PAGE) {
        this.state.searchQuery ? this.props.dispatch(NewsAuthAPI.getNewsBySearch(this.state.searchQuery, this.state.currentPageIndex +1, ITEMS_PER_PAGE,this.state.sourceBy))
        : this.props.dispatch(NewsAuthAPI.getNewsList(this.state.currentPageIndex + 1, ITEMS_PER_PAGE,this.state.sourceBy));
        this.setState({ currentPageIndex: this.state.currentPageIndex + 1 });
    }
  }

  _onSearch(text) {
    this.setState({ allNews: [], searchQuery: text });
    this.props.dispatch(NewsAuthAPI.getNewsBySearch(text, this.state.currentPageIndex, ITEMS_PER_PAGE,this.state.sourceBy));
  }

  _onCancel() {
    this.setState({ allNews: [], searchQuery: '' ,currentPageIndex: 1});
    this._loadMoreContentAsync();
  }

  _onFilter(){
    this.setState({currentPageIndex:1,})
    this.props.navigation.navigate({routeName:"Filter",params:{search:this.state.searchQuery,sourceBy:this.state.sourceBy}})
  }

  _onLoading() {
    ToastAndroid.show("please wait",ToastAndroid.SHORT);
  }

  render() { 
    return (
      <SafeAreaView style={[styles.container]}>
      <StatusBar barStyle="dark-content"/>
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" color={"#0000ff"} animating={this.props.loading} />
        </View>

        <View style={styles.searchBox}>          
          <View style={styles.subSearchBox}>
            <Search ref="search_box" onSearch={(text) => this._onSearch(text)} onCancel={() => this._onCancel()} />
          </View>
        </View>

        <View style={styles.gridview}>
          <GridView
            itemDimension={150}
            // staticDimension={130}
            spacing={0}
            onEndReached = {this.renderLoadMoreItems}
            refreshControl={this._renderRefreshControl()}         
            items={this.state.allNews}
            renderItem={item => (

                  <View key={Math.random()} style={styles.articleListView}>
                    <Image source={{ uri: item.urlToImage && item.urlToImage ? item.urlToImage : '' }} style={styles.image}>
                      <View style={styles.cardview}>
                        <View style={styles.source}>
                          <Text>{item.hasOwnProperty('source')  ? item.source.name : 'not available'}</Text>
                        </View>
                        <View style={styles.shadowView}>
                          <Text style={styles.listItemTitleText} numberOfLines={3} ellipsizeMode ={'tail'}>{item.title}</Text>
                        </View>
                        <Text style={styles.publish}>publish on: {item.publishedAt}</Text>                                                                                                                                                                                                                                                                                                                 
                      </View>
                    </Image>
                  </View>
            )}
          />
          
          <ActionButton
            buttonColor={ACTION_BUTTON_COLOR}
            icon={<Icon name='filter' size={35}/>}
            onPress={this.props.loading?this._onLoading:this._onFilter}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default connect()(HomeView);