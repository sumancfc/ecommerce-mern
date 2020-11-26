import { combineReducers } from "redux";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  userList: userReducer,
});

export default rootReducer;
