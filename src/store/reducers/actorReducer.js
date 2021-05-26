import * as type from '../types/actorType';

const initActorsState = {
  list: [],
};

export const actorsReducer = (state = initActorsState, action) => {
  switch (action.type) {
    case type.SET_ACTOR_DATA: {
      return {
        ...state,
        list: [...state.list, action.actorData],
      }
    }
    case type.REMOVE_ACTOR_DATA:{
      return {
        ...state,
        list: state.list.filter(u => {
          if (u.id !== action.actorId) {
            return {...u}
          }
        })
      }
    }
    default:
      return state;
  }
};


