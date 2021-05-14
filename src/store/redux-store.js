import {combineReducers, createStore} from "redux";
import {actorsReducer} from "./reducers/actorReducer";



let reducers = combineReducers({
    actors: actorsReducer,
});
let store = createStore(reducers);

window.store = store;

export default store;
