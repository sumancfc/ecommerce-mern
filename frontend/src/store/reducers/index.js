import { combineReducers } from "redux";
import {
  categoryCreateReducer,
  categoryListReducer,
  categoryDeleteReducer,
  categoryUpdateReducer,
  categorySingleReducer,
} from "./categoryReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  userList: userReducer,
  categoryCreate: categoryCreateReducer,
  categoryList: categoryListReducer,
  categorySingle: categorySingleReducer,
  categoryUpdate: categoryUpdateReducer,
  categoryDelete: categoryDeleteReducer,
});

export default rootReducer;
