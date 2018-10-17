import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import { Alert } from 'react-native';
import * as AppActions from '../redux/Services';
import * as NewsActions from '../redux/NewsAuthAPI';
import * as apiEndpoints from '../services/ApiConfig';
import { getTopHeadlines, getSearchResults, getNewsSources } from '../services/News'

const API_ROOT = apiEndpoints.api;
const API_KEY = apiEndpoints.key;
var requestUrl ='';

function* getNewsListWatcher() {
  yield takeEvery(NewsActions.GET_NEWSLIST, getNewsListHandler);
}

function* getNewsListBySearchWatcher() {
  yield takeLatest(NewsActions.GET_NEWSLIST_SEARCH, getNewsListBySearchHandler);
}


function* getNewsSourcesWatcher() {
  yield takeEvery(NewsActions.GET_NEWS_SOURCES, getNewsSourcesHandler);
}


function* getNewsListHandler(value) {
  yield put(AppActions.setLoader(true));
  var searchParams = value.payload;
  try {
    let result = yield getTopHeadlines(searchParams);
    console.log("result ==>", result)
    if (result.status === "ok") {
      yield put(NewsActions.getNewsListSuccess(result));
    } else {
      Alert.alert(result.code, result.message);
      yield put(NewsActions.getNewsListFail(""));
    }
  } catch (error) {
    yield put(NewsActions.getNewsListFail(""));
  }
  yield put(AppActions.setLoader(false));
}

function* getNewsListBySearchHandler(value) {
  yield put(AppActions.setLoader(true));
  try {
    
    let result = yield getSearchResults(value);
    // console.log('result', result);
    if (result.status === "ok") {
      yield put(NewsActions.getNewsListSuccess(result));
    } else {
      Alert.alert(result.code, result.message);
      yield put(NewsActions.getNewsListFail(""));
    }

  } catch (error) {
    yield put(NewsActions.getNewsListFail(""));
  }
  yield put(AppActions.setLoader(false));
}

function* getNewsSourcesHandler() {
  yield put(AppActions.setLoader(true));
  try {
    
      let result = yield getNewsSources();
    if (result.status === "ok") {
      yield put(NewsActions.getNewsSourcesSuccess(result.sources));
    } else {
      yield put(NewsActions.getNewsSourcesFailure(""));
    }

  } catch (error) {
    yield put(NewsActions.getNewsSourcesFailure(""));
  }
  yield put(AppActions.setLoader(false));
}



export default [
  getNewsListWatcher,
  getNewsListBySearchWatcher,
  getNewsSourcesWatcher,
 
];