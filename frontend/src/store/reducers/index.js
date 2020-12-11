import { combineReducers } from "redux";
import {
  categoryCreateReducer,
  categoryListReducer,
  categoryDeleteReducer,
  categoryUpdateReducer,
  categorySingleReducer,
} from "./categoryReducer";
import {
  productDetailReducer,
  productReducer,
  productReviewReducer,
} from "./productReducer";
import { searchReducer } from "./searchReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  userList: userReducer,
  categoryCreate: categoryCreateReducer,
  categoryList: categoryListReducer,
  categorySingle: categorySingleReducer,
  categoryUpdate: categoryUpdateReducer,
  categoryDelete: categoryDeleteReducer,
  productList: productReducer,
  productDetail: productDetailReducer,
  productReview: productReviewReducer,
  search: searchReducer,
});

export default rootReducer;
