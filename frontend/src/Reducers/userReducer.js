import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

export const userReducer = createReducer(initialState, {
  LoginRequest: (state, action) => {
    state.isLoading = true;
  },
  LoginSuccess: (state, action) => {
    state.isLoading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  LoginFailure: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  RegisterRequest: (state, action) => {
    state.isLoading = true;
  },
  RegisterSuccess: (state, action) => {
    state.isLoading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  RegisterFailure: (state, action) => {
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  LoadUserRequest: (state, action) => {
    state.isLoading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.isLoading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  LoadUserFailure: (state, action) => {
    state.error = action.payload;
    state.isAuthenticated = false;
  },
  LogoutRequest: (state, action) => {
    state.isLoading = true;
  },
  LogoutSuccess: (state, action) => {
    state.isLoading = false;
    state.user = null;
    state.isAuthenticated = false;
  },
  LogoutFailure: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isAuthenticated = true;
  },
  ClearErrors: (state) => {
    state.error = null;
  },
});

export const followingPostsReducer = createReducer(
  { posts: [] },
  {
    FollowingPostsRequest: (state, action) => {
      state.isLoading = true;
    },
    FollowingPostsSuccess: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    FollowingPostsFailure: (state, action) => {
      state.isLoading = false;
      state.erros = action.payload;
    },
  }
);

export const allUsersReducer = createReducer(initialState, {
  AllUsersRequest: (state, action) => {
    state.isLoading = true;
  },
  AllUsersSuccess: (state, action) => {
    state.isLoading = false;
    state.users = action.payload;
  },
  AllUsersFailure: (state, action) => {
    state.isLoading = false;
    state.erros = action.payload;
  },
});

export const getUserReducer = createReducer(initialState, {
  GetUserRequest: (state, action) => {
    state.isLoading = true;
  },
  GetUserSuccess: (state, action) => {
    state.isLoading = false;
    state.posts = action.payload;
  },
  GetUserFailure: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
});

export const getUserProfileReducer = createReducer(initialState, {
  GetUserProfileRequest: (state, action) => {
    state.isLoading = true;
  },
  GetUserProfileSuccess: (state, action) => {
    state.isLoading = false;
    state.user = action.payload;
  },
  GetUserProfileFailure: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
});
