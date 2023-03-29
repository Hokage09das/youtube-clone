import { createStore, applyMiddleware, combineReducers } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";

import { authReducer } from "./reducers/auth.reducer";
import { channelDetailsReducer } from "./reducers/channel.reducer";
import { commentListReducer } from "./reducers/comments.reducer";
import {
  homeVideosReducer,
  relatedVideoReducer,
  searchedVideosReducer,
} from "./reducers/video.reducer";
import { selectedVideoReducer } from "./reducers/video.reducer";

const rootReducers = combineReducers({
  auth: authReducer,
  homeVideos: homeVideosReducer,
  commentList: commentListReducer,
  relatedVideos: relatedVideoReducer,
  selectedVideo: selectedVideoReducer,
  channelDetails: channelDetailsReducer,
  searchedVideos: searchedVideosReducer,
});

const store = createStore(
  rootReducers,
  {},
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
