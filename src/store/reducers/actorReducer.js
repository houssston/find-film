import * as type from '../types/actorType';

const initActorsState = {
  list: [],
  isLoading: false,
  isFetching: false,
};

export const actorsReducer = (state = initActorsState, action) => {
  switch (action.type) {
    case type.SET_ACTOR_DATA: {
      return {
        ...state,
        list: [...state.list, action.actorData],
      }
    }
   /* case type.SET_ACTOR_CAST: {
      return {
        ...state,
        list: state.list.map(u => {
          if(u.id === action.cast.id){
            return {...u, cast:action.cast.cast}
          }
        }),// Костыль, думаю можно сдлать как-то по-другому (нормально)

      }
    }*/
    case type.TOGGLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching,
      }
    }
    default:
      return state;
  }
};


