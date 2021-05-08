import { combineReducers } from 'redux';

import * as type from 'actionCreators';

const initNewsState = {
  list: [],
  isLoading: false
};

const news = (state = initNewsState, action) => {
  switch (action.type) {
    case type.NEWS_FETCH_REQUEST:
      return Object.assign({}, state, { isLoading: true });
    case type.NEWS_FETCH_SUCCESS:
      return Object.assign({}, state, { list: action.payload, isLoading: false });
    case type.NEWS_FETCH_FAIL:
      return Object.assign({}, state, { isLoading: false });
    default:
      return state;
  }
};

const notifications = (state = [], action) => {
  switch (action.type) {
    case type.NOTIFICATION_POSITIVE_ADD:
      return [...state, { value: action.payload }];
    case type.NOTIFICATION_ERROR_ADD:
      return [...state, { value: action.payload, isError: true }];
    case type.NOTIFICATION_REMOVE_BY_INDEX:
      return state.filter((el, index) => index !== action.payload);
    default:
      return state;
  }
};

