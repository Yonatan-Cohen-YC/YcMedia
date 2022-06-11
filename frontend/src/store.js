import { configureStore } from "@reduxjs/toolkit";
import { likeReducer, myPostsReducer } from "./Reducers/postReducer";
import {
  allUsersReducer,
  followingPostsReducer,
  getUserProfileReducer,
  getUserReducer,
  userReducer,
} from "./Reducers/userReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    followingPosts: followingPostsReducer,
    like: likeReducer,
    allUsers: allUsersReducer,
    myPosts: myPostsReducer,
    userProfile: getUserReducer,
    profile: getUserProfileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
