import _ from "lodash";
import jasonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  _.chain(getState().posts)
    .map("userId")
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value();
};

export const fetchPosts = () => async dispatch => {
  const response = await jasonPlaceholder.get("/posts");

  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

export const fetchUser = id => async dispatch => {
  const response = await jasonPlaceholder.get(`/users/${id}`);
  dispatch({ type: "FETCH_USER", payload: response.data });
};

//using memoize from lodash lib to prevent repetitive network req over a same user
//export const fetchUser = id => dispatch => _fetchUser(id, dispatch);
//const _fetchUser = _.memoize(async (id, dispatch) => {
//const response = await jasonPlaceholder.get(`/users/${id}`);

//dispatch({ type: "FETCH_USER", payload: response.data });
//});
