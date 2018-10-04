import React, { Component } from 'react';
import { SafeAreaView, View, Text, ListView, RefreshControl, ActivityIndicator } from 'react-native';
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
    this.setState({ currentPageIndex: 1 });
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

        <View style={{ justifyContent: 'flex-start', width: '100%', height: '15%' }}>
          <Search ref="search_box" onSearch={(text) => this._onSearch(text)} onCancel={() => this._onCancel()} />
        </View>

        <View style={{ backgroundColor: 'greeen', justifyContent: 'flex-start', width: '100%', height: '80%' }}>
          <ListView
            renderScrollComponent={props => <InfiniteScrollView {...props} />}
            distanceToLoadMore={5}
            dataSource={this.state.dataSource}
            renderRow={(rowData, rowID) => (
              <View key={Math.random() + rowID} style={styles.articleListView}>
                <View style={{ width: '25%', alignItems: 'center', justifyContent: 'center' }}>
                  <Image
                    source={{ uri: rowData.urlToImage }}
                    indicator={ProgressCircle}
                    style={styles.articleListImage} />
                </View>
                <View style={{ width: '75%', alignItems: 'flex-start', justifyContent: 'center' }}>
                  <Text style={styles.listItemTitleText}>{rowData.title}</Text>
                </View>
              </View>
            )}
            refreshControl={this._renderRefreshControl()}
            canLoadMore={!!this.props.newsArticles}
            onLoadMoreAsync={this._loadMoreContentAsync.bind(this)}
            onEndReachedThreshold={0.2}
            onEndReached={this.renderLoadMoreItems}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default connect()(HomeView);