import { Map } from 'immutable';

/* action types */
export const GET_NEWSLIST = 'GET_NEWSLIST';
export const GET_NEWSLIST_SEARCH = 'GET_NEWSLIST_SEARCH';
export const GET_NEWS_SOURCES = 'GET_NEWS_SOURCES';
export const GET_NEWSLIST_SOURCES = 'GET_NEWSLIST_SOURCES';
export const GET_NEWSLIST_SOURCES_TOPHEADLINES='GET_NEWSLIST_SOURCES_TOPHEADLINES'

const GET_NEWSLIST_SUCCESS = 'GET_NEWSLIST_SUCCESS';
const GET_NEWSLIST_FAILURE = 'GET_NEWSLIST_FAILURE';

const GET_NEWS_SOURCES_SUCCESS = 'GET_NEWS_SOURCES_SUCCESS';
const GET_NEWS_SOURCES_FAILURE = 'GET_NEWS_SOURCES_FAILURE';



export const getNewsList = (page, pagesize,sourceby) => ({
  type: GET_NEWSLIST,
  payload: { page: page, pagesize: pagesize , sourceby:sourceby}
});

export const getNewsSources = () => ({
  type: GET_NEWS_SOURCES,
 
});

export const getNewsListBySources = (sourceby,page, pagesize) => ({
  type: GET_NEWSLIST_SOURCES,
  payload: { sourceby: sourceby,page: page, pagesize: pagesize }
});

export const getNewsListBySourcesOnTopHeadlines = (sourceby,page, pagesize) => ({
  type: GET_NEWSLIST_SOURCES_TOPHEADLINES,
  payload: { sourceby: sourceby,page: page, pagesize: pagesize }
});

export const getNewsListSuccess = (value) => ({
  type: GET_NEWSLIST_SUCCESS,
  payload: JSON.stringify(value)
});

export const getNewsListFail = (value) => ({
  type: GET_NEWSLIST_FAILURE,
  payload: JSON.stringify(value)
});

export const getNewsBySearch = (searchby, page, pagesize,sourceby) => ({
  type: GET_NEWSLIST_SEARCH,
  payload: { page: page, pagesize: pagesize, searchby: searchby ,sourceby:sourceby}
});

export const getNewsSourcesSuccess = (value) => ({
  type: GET_NEWS_SOURCES_SUCCESS,
  payload: JSON.stringify(value)
});

export const getNewsSourcesFailure = (value) => ({
  type: GET_NEWS_SOURCES_FAILURE,
  payload: JSON.stringify(value)
});

// export const isFilter = () => ({
//   type: IS_FILTER,
 
// });
/* Initial state */
const initialState = Map({
  newsList: "",
  newsSources: ""
});

/* Reducer */
export default function newsReducer(state = initialState, action) {
 
  switch (action.type) {
    case GET_NEWSLIST:
      return state;

    case GET_NEWS_SOURCES:
      return state;

      case GET_NEWSLIST_SOURCES:
      return state;

      case GET_NEWSLIST_SOURCES_TOPHEADLINES:
      return state;

    case GET_NEWSLIST_SUCCESS:
      return state.set('newsList', action.payload);

    case GET_NEWSLIST_FAILURE:
      return state;

    case GET_NEWSLIST_SEARCH:
      return state;

    case GET_NEWS_SOURCES_SUCCESS:
      return state.set('newsSources',action.payload);

    case GET_NEWS_SOURCES_FAILURE:
      return state;

    default:
      return state;
  }
}