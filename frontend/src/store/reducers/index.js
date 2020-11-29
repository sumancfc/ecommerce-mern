import { combineReducers } from "redux";
import {
  categoryCreateReducer,
  categoryListReducer,
  categoryDeleteReducer,
} from "./categoryReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  userList: userReducer,
  categoryCreate: categoryCreateReducer,
  categoryList: categoryListReducer,
  categoryDelete: categoryDeleteReducer,
});

export default rootReducer;
