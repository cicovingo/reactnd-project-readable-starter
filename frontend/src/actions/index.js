import { addingComment, addingPost, decScoreForPost, deletingComment, deletingPost, editingComment, editingPost, getCategories, getComments, getPosts, incScoreForPost } from '../readableapi.js'
export const addingForComment = (data) => async (dispatch) => {
  try {
    await addingComment(data)
    dispatch({
      type: 'ADDING_COMMENT',
      comment: data
    });
  }
  catch(err) {
    console.error("Error", err)
  }
}
export const addingForPost = (data) => async (dispatch) => {
  try {
    await addingPost(data)
    dispatch({
      type: 'ADDING_POST',
      post: data
    });
  }
  catch(err) {
    console.error("Error", err)
  }
}
export const changeOrder = (sort) => ({
  type: 'CHANGE_ORDER',
  sort: sort
});
export const decPostScore = (id) => async (dispatch) => {
  try {
    await decScoreForPost(id)
    dispatch({
      type: 'DEC_SCORE',
      id
    })
  }
  catch(err) {
    console.error("Error", err)
  }
}
export const deletingForComment = (id) => async (dispatch) => {
  try {
    await deletingComment(id)
    dispatch({
      type: 'DELETING_COMMENT',
      id
    })
  }
  catch(err) {
    console.error("Error", err)
  }
}
export const deletingForPost = (id) => async (dispatch) => {
  try {
    await deletingPost(id)
    dispatch({
      type: 'DELETING_POST',
      id
    });
  }
  catch(err) {
    console.error("Error", err)
  }
}
export const editingForComment = (data) => async (dispatch) => {
  try {
    await editingComment(data)
    dispatch({
      type: 'EDITING_COMMENT',
      comment: data
    });
  }
  catch(err) {
    console.error("Error", err)
  }
}
export const editingForPost = (data) => async (dispatch) => {
  try {
    await editingPost(data)
    dispatch({
      type: 'EDITING_POST',
      post: data
    });
  }
  catch(err) {
    console.error("Error", err)
  }
}
export const getAllCategory = () => (dispatch) => {
  getCategories()
  .then(data => {
    dispatch(getAllCategories(data.categories))
  })
  .catch(err => console.error(err))
}

export const getAllComment = (postId) => async (dispatch) => {
  try {
    const comments = await getComments(postId);
    dispatch(getAllComments(comments, postId))
  } catch(err) {
    console.error("Error", err)
  }
}
export const getAllPost = () => async (dispatch) => {
  try {
    const posts = await getPosts()
    dispatch(getAllPosts(posts))

    posts.forEach((p) => {
      dispatch(getComments(p.id))
    })
  } catch(err) {
    console.error("Error", err)
  }
}
export const incPostScore = (id, posts) => async (dispatch) => {
  try {
    await incScoreForPost(id)
    dispatch({
      type: 'INC_SCORE',
      id
    })
  }
  catch(err) {
    console.error("Error increasing post voteScore", err)
  }
}
export const filterCategory = (category) => ({
  type: 'FILTER_FOR_CATEGORY',
  filter: category
});
const getAllCategories = (categories) => ({
  type: 'GET_ALL_CATEGORIES',
  categories
});
const getAllComments = (comments, postId) =>  ({
  type: 'GET_ALL_COMMENTS',
  comments,
  postId
});
const getAllPosts = (posts) => ({
  type: 'GET_ALL_POSTS',
  posts
});