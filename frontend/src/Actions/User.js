import axios from "axios";

// Login in a user ******************************
export const loginUser = (user) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequest",
    });

    const { data } = await axios.post("/api/v1/login", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: "LoginSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoginFailure",
      payload: error.response.data.message,
    });
  }
};

// Register a new user ******************************
export const registerUser = (user) => async (dispatch) => {
  try {
    dispatch({
      type: "RegisterRequest",
    });
    const { data } = await axios.post("/api/v1/register", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: "RegisterSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "RegisterFailure",
      payload: error.response.data.message,
    });
  }
};

// Logout ******************************
export const logoutUser = (user) => async (dispatch) => {
  try {
    dispatch({
      type: "LogoutRequest",
    });
    await axios.get("/api/v1/logout");
    dispatch({
      type: "LogoutSuccess",
    });
  } catch (error) {
    dispatch({
      type: "LogoutFailure",
      payload: error.response.data.message,
    });
  }
};

// Load logged user info ******************************
export const loadUser = (user) => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get("/api/v1/profile");
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFailure",
      payload: error.response.data.message,
    });
  }
};

// Load posts from followed users ******************
export const followingPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "FollowingPostsRequest",
    });
    const { data } = await axios.get("/api/v1/posts");
    dispatch({
      type: "FollowingPostsSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "FollowingPostsFailure",
      payload: error.response.data.message,
    });
  }
};

// Load all users ******************************
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: "AllUsersRequest",
    });
    const { data } = await axios.get("/api/v1/users");
    dispatch({
      type: "AllUsersSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "AllUsersFailure",
      payload: error.response.data.message,
    });
  }
};

// Get logged user posts **************************
export const getMyPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "MyPostsRequest",
    });

    const { data } = await axios.get("/api/v1/my/posts");
    dispatch({
      type: "MyPostsSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "MyPostsFailure",
      payload: error.response.data.message,
    });
  }
};

// Get user posts via profile ************************
export const getUserPosts = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "GetUserRequest",
    });

    const { data } = await axios.get(`/api/v1/user/posts/${id}`);
    dispatch({
      type: "GetUserSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "GetUserFailure",
      payload: error.response.data.message,
    });
  }
};

// Get user info via profile ************************
export const getUserProfile = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "GetUserProfileRequest",
    });

    const { data } = await axios.get(`/api/v1/user//${id}`);
    dispatch({
      type: "GetUserProfileSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "GetUserProfileFailure",
      payload: error.response.data.message,
    });
  }
};

// Update user info (email, password and avatar) ************************
export const updateUserProfile = (user) => async (dispatch) => {
  try {
    dispatch({
      type: "UpdateProfileRequest",
    });

    const { data } = await axios.put("/api/v1/update/profile", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: "UpdateProfileSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "UpdateProfileFailure",
      payload: error.response.data.message,
    });
  }
};

// Follow a user **************************
export const followUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "FollowUserRequest",
    });

    const { data } = await axios.get(`/api/v1/follow/${id}`);
    dispatch({
      type: "FollowUserSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "FollowUserFailure",
      payload: error.response.data.message,
    });
  }
};
