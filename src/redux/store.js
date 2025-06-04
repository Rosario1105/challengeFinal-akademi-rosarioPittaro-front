import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import { thunk } from "redux-thunk";
import userReducer from "./reducers/userReducer";
import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
  users: userReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;