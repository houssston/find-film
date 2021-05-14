import * as type from '../types/actorType';

// Thunks //


export const templateThunk = () => dispatch  => {
  return null
};


// Action creators //

export const setActor  = (actor) => ({
  type: type.SET_DATA_ACTOR,
  actor
});

