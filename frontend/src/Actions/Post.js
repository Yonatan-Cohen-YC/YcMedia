import axios from "axios";

// Like a post **********************************
export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "LikeRequest",
    });
    const { data } = await axios.get(`/api/v1/post/${id}`);
    dispatch({
      type: "LikeSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "LikeFailure",
      payload: error.response.data.message,
    });
  }
};
// Add a comment **********************************
export const addComment = (id, comment) => async (dispatch) => {
  try {
    dispatch({
      type: "CommentRequest",
    });
    const { data } = await axios.put(`/api/v1/post/comment/${id}`, comment, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: "CommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "CommentFailure",
      payload: error.response.data.message,
    });
  }
};

// Delete a comment **********************************
export const deleteComment = (id, commentId) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteCommentRequest",
    });

    const { data } = await axios.delete(`/api/v1/post/comment/${id}`, {
      data: commentId,
    });
    dispatch({
      type: "DeleteCommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "DeleteCommentFailure",
      payload: error.response.data.message,
    });
  }
};

// Create new post **********************************
export const createNewPost = (caption, image) => async (dispatch) => {
  try {
    dispatch({
      type: "NewPosttRequest",
    });

    const { data } = await axios.post(
      `/api/v1/post/upload`,
      { caption, image },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "NewPosttSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "NewPosttFailure",
      payload: error.response.data.message,
    });
  }
};

// Delete a post **********************************
export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "DeletePostRequest",
    });

    const { data } = await axios.delete(`/api/v1/post/${id}`);
    dispatch({
      type: "DeletePostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "DeletePostFailure",
      payload: error.response.data.message,
    });
  }
};
