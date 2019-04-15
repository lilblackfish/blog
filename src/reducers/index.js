import { combineReducers } from "redux";
import postsReducer from "./postsReducer";
import usersReducer from "./userReducers";

export default combineReducers({
  posts: postsReducer,
  users: usersReducer
});
