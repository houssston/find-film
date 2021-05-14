import * as type from '../types/actorType';

const initActorsState = {
  list: [],
  isLoading: false
};

export const actorsReducer = (state = initActorsState, action) => {
  switch (action.type) {
    case type.SET_DATA_ACTOR: {
      return {
        ...state,
        list: [...state.list, action.actor],
      }
    }
    default:
      return state;
  }
};


