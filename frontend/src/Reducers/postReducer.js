import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

export const likeReducer = createReducer(initialState, {
  LikeRequest: (state) => {
    state.isLoading = true;
  },
  LikeSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  LikeFailure: (state, action) => {
    state.isLoading = false;
    state.erros = action.payload;
  },
  CommentRequest: (state) => {
    state.isLoading = true;
  },
  CommentSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  CommentFailure: (state, action) => {
    state.isLoading = false;
    state.erros = action.payload;
  },
  DeleteCommentRequest: (state) => {
    state.isLoading = true;
  },
  DeleteCommentSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  DeleteCommentFailure: (state, action) => {
    state.isLoading = false;
    state.erros = action.payload;
  },
  NewPosttRequest: (state) => {
    state.isLoading = true;
  },
  NewPosttSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  NewPosttFailure: (state, action) => {
    state.isLoading = false;
    state.erros = action.payload;
  },
  DeletePostRequest: (state) => {
    state.isLoading = true;
  },
  DeletePostSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  DeletePostFailure: (state, action) => {
    state.isLoading = false;
    state.erros = action.payload;
  },
  UpdateProfileRequest: (state) => {
    state.isLoading = true;
  },
  UpdateProfileSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  UpdateProfileFailure: (state, action) => {
    state.isLoading = false;
    state.erros = action.payload;
  },
  FollowUserRequest: (state) => {
    state.isLoading = true;
  },
  FollowUserSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  FollowUserFailure: (state, action) => {
    state.isLoading = false;
    state.erros = action.payload;
  },
  ClearMessages: (state) => {
    state.message = null;
  },
  ClearErrors: (state) => {
    state.error = null;
  },
});

export const myPostsReducer = createReducer(
  { myPosts: [] },
  {
    MyPostsRequest: (state) => {
      state.isLoading = true;
    },
    MyPostsSuccess: (state, action) => {
      state.isLoading = false;
      state.myPosts = action.payload;
      state.message = action.payload.message;
    },
    MyPostsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    ClearErrors: (state) => {
      state.error = null;
    },
  }
);
