import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import { Alert } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import * as AppActions from '../services/Services';
import * as NewsActions from '../redux/NewsAuthAPI';
import * as apiEndpoints from '../services/ApiConfig';

const API_ROOT = apiEndpoints.api;
const API_KEY = apiEndpoints.key;
var requestUrl ='';

function* getNewsListWatcher() {
  yield takeEvery(NewsActions.GET_NEWSLIST, getNewsListHandler);
}

function* getNewsListBySearchWatcher() {
  yield takeLatest(NewsActions.GET_NEWSLIST_SEARCH, getNewsListBySearchHandler);
}

function* getNewsListBySourcesWatcher() {
  yield takeLatest(NewsActions.GET_NEWSLIST_SOURCES, getNewsListBySourcesHandler);
}

function* getNewsListBySourcesOnTopHeadlinesWatcher() {
  yield takeLatest(NewsActions.GET_NEWSLIST_SOURCES_TOPHEADLINES, getNewsListBySourcesOnTopHeadlinesHandler);
}

function* getNewsSourcesWatcher() {
  yield takeEvery(NewsActions.GET_NEWS_SOURCES, getNewsSourcesHandler);
}

function* getNewsListHandler(value) {
  yield put(AppActions.setLoader(true));
  try {
    // const requestUrl='';
    if(value.payload.sourceby){
      requestUrl = `${API_ROOT}/top-headlines?sources=${value.payload.sourceby}&page=${value.payload.page}&pagesize=${value.payload.pagesize}&apiKey=${API_KEY}`;
    }else{
      requestUrl = `${API_ROOT}/top-headlines?country=us&page=${value.payload.page}&pagesize=${value.payload.pagesize}&apiKey=${API_KEY}`;
    }
   
    let result = yield fetch(requestUrl)
      .then(response => response.json());
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
    requestUrl = `${API_ROOT}/everything?q=${value.payload.searchby}&sources=${value.payload.sourceby}&page=${value.payload.page}&pagesize=${value.payload.pagesize}&sortBy=relevancy&apiKey=${API_KEY}`;
    let result = yield fetch(requestUrl)
      .then(response => response.json());
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
    requestUrl =`${API_ROOT}/sources?apiKey=${API_KEY}`;
    
    let result = yield fetch(requestUrl)
      .then(response => response.json());
      // console.log("results==>",result);
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

function* getNewsListBySourcesHandler(value) {
  yield put(AppActions.setLoader(true));
  try {
    requestUrl =`${API_ROOT}/everything?sources=${value.payload.sourceby}&page=${value.payload.page}&pagesize=${value.payload.pagesize}&sortBy=relevancy&apiKey=${API_KEY}`;
    let result = yield fetch(requestUrl)
      .then(response => response.json());
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

function* getNewsListBySourcesOnTopHeadlinesHandler(value) {
  yield put(AppActions.setLoader(true));
  try {
    requestUrl =`${API_ROOT}/top-headlines?sources=${value.payload.sourceby}&page=${value.payload.page}&pagesize=${value.payload.pagesize}&apiKey=${API_KEY}`;
    let result = yield fetch(requestUrl)
      .then(response => response.json());
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

export default [
  getNewsListWatcher,
  getNewsListBySearchWatcher,
  getNewsSourcesWatcher,
  getNewsListBySourcesWatcher,
  getNewsListBySourcesOnTopHeadlinesWatcher
];