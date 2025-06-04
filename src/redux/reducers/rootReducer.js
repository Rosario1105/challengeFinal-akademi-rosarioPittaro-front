import { combineReducers } from "redux";
import userReducer from "./userReducer";
import authReducer from "./authReducer";
import courseReducer from "./courseReducer";

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  course: courseReducer,
});

export default rootReducer;
