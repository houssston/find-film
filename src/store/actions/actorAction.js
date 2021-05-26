import * as type from '../types/actorType';
import {tmdbAPI} from "../../api/api";

// Thunks //


export const getActorData = (actor)  => async (dispatch) =>  {
  let actorData = actor;
  actorData['cast'] = await tmdbAPI.getListFilms(actor.id);
  dispatch(setActorData(actorData));
};


// Action creators //

export const setActorData  = (actorData) => ({
  type: type.SET_ACTOR_DATA,
  actorData
});

export const removeActorData  = (actorId) => ({
  type: type.REMOVE_ACTOR_DATA,
  actorId
});



