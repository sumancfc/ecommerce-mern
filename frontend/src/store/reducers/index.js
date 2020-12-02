import { combineReducers } from "redux";
import {
  categoryCreateReducer,
  categoryListReducer,
  categoryDeleteReducer,
  categoryUpdateReducer,
  categorySingleReducer,
} from "./categoryReducer";
import productReducer from "./productReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  userList: userReducer,
  categoryCreate: categoryCreateReducer,
  categoryList: categoryListReducer,
  categorySingle: categorySingleReducer,
  categoryUpdate: categoryUpdateReducer,
  categoryDelete: categoryDeleteReducer,
  productList: productReducer,
});

export default rootReducer;
