import * as apiEndpoints from '../services/ApiConfig';

const API_ROOT = apiEndpoints.api;
const API_KEY = apiEndpoints.key;
const COUNTRY = apiEndpoints.country;

export function getTopHeadlines(params) {
    var requestUrl = '';
    if(params.sourceby)
    {
      requestUrl = `${API_ROOT}/top-headlines?sources=${params.sourceby}&page=${params.page}&pagesize=${params.pagesize}&apiKey=${API_KEY}`;
    }
    else{
      requestUrl = `${API_ROOT}/top-headlines?country=${COUNTRY}&page=${params.page}&pagesize=${params.pagesize}&apiKey=${API_KEY}`;
    }   
    return fetch(requestUrl)
        .then(response => response.json());
}

export function getSearchResults(params) {
    var requestUrl = `${API_ROOT}/everything?q=${params.payload.searchby}&sources=${params.payload.sourceby}&page=${params.payload.page}&pagesize=${params.payload.pagesize}&sortBy=relevancy&apiKey=${API_KEY}`;
    return fetch(requestUrl)
        .then(response => response.json());
}

export function getNewsSources() {
    const requestUrl = `${API_ROOT}/sources?apiKey=${API_KEY}`;
    return fetch(requestUrl)
        .then(response => response.json());
}