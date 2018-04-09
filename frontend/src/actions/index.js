import axios from 'axios';
import uuid from 'uuid/v1'
const URL = 'http://localhost:3001';
const generateToken = () => {
  const token = Math.random().toString(36).substr(-8);
  localStorage.setItem('token', token);
  return token;
};
const token = localStorage.getItem('token') || generateToken();
axios.defaults.headers.common['Authorization'] = token;
const axoisPages = {};

const addForComment = (comment) => ({type: 'ADD_COMMENT',comment});
export const addComment = (comment) => (dispatch) => {
  axoisPages.addPageComment(comment).then((comment) => dispatch(addForComment(comment)));
};
axoisPages.addPageComment = (comment) => {
  const id = uuid();
  comment = { ...comment, id };
  return axios.post(`${URL}/comments`, comment)
  .then((res) => res.data);
};

const addForPost = (post) => ({type: 'ADD_POST',post});
export const addPost = (post) => (dispatch) => {
  axoisPages.addPagePost(post).then((post) => dispatch(addForPost(post)));
};
axoisPages.addPagePost = (post) => {
  const id = uuid();
  const timestamp = Date.now();
  post = { ...post, id, timestamp };
  return axios.post(`${URL}/posts`, post).then((res) => res.data);
};

const deleteForComment = (comment) => ({type: 'DELETE_COMMENT',comment});
export const deleteComment = (commentId) => (dispatch) => {
  axoisPages.deletePageComment(commentId).then((comment) => dispatch(deleteForComment(comment)));
};
axoisPages.deletePageComment = (id) => axios.delete(`${URL}/comments/${id}`).then((res) => res.data);

const deleteForPost = (postId) => ({type: 'DELETE_POST',postId});
export const deletePost = (postId) => (dispatch) => {
  axoisPages.deletePagePost(postId).then(() => dispatch(deleteForPost(postId)));
};
axoisPages.deletePagePost = (id) => axios.delete(`${URL}/posts/${id}`);

const editForComment = (comment) => ({ type: 'EDIT_COMMENT', comment });
export const editComment = (id, comment) => (dispatch) => {
  axoisPages.editPageComment(id, comment).then((comment) => dispatch(editForComment(comment)));
};
axoisPages.editPageComment = (id, comment) => axios.put(`${URL}/comments/${id}`, comment).then((res) => res.data);

const editForPost = (post) => ({ type: 'EDIT_POST', post });
export const editPost = (id, post) => (dispatch) => { 
  axoisPages.editPagePost(id, post).then((post) => dispatch(editForPost(post)));
};
axoisPages.editPagePost = (id, post) => axios.put(`${URL}/posts/${id}`, post).then((res) => res.data);

const fetchForCategories = (categories) => ({type: 'FETCH_CATEGORIES',categories});
export const fetchCategories = () => (dispatch) => {
  axoisPages.fetchPageCategories().then((categories) => dispatch(fetchForCategories(categories)));
};
axoisPages.fetchPageCategories = () => axios.get(`${URL}/categories`).then((res) => res.data.categories).then((categories) => categories.map((category) => category.name));

const fetchForComments = (comments) => ({type: 'FETCH_COMMENTS',comments});
export const fetchComments = (parentId) => (dispatch) => {
  axoisPages.fetchPageComments(parentId).then((comments) => dispatch(fetchForComments(comments)));
};
axoisPages.fetchPageComments = (id) => axios.get(`${URL}/posts/${id}/comments`).then((res) => res.data);

const fetchForPost = (post) => ({type: 'FETCH_POST',post});
export const fetchPost = (id) => (dispatch) => {
  axoisPages.fetchPagePostById(id).then((post) => dispatch(fetchForPost(post)));
};
axoisPages.fetchPagePostById = (id) => axios.get(`${URL}/posts/${id}`).then((res) => {return res.data;});

const fetchForPosts = (posts) => ({type: 'FETCH_POSTS',posts});
export const fetchPosts = (category) => (dispatch) => {
  if(category)
    axoisPages.fetchPostsByCategory(category).then((posts) => dispatch(fetchForPosts(posts)));
  else
	axoisPages.fetchPagePosts(category).then((posts) => dispatch(fetchForPosts(posts)));
};
axoisPages.fetchPostsByCategory = (category) => axios.get(`${URL}/${category}/posts`).then((res) => fetchCommentCount(res.data));
axoisPages.fetchPagePosts = () => axios.get(`${URL}/posts`).then((res) => fetchCommentCount(res.data));
const fetchCommentCount = (lengthOfArr) => {
  const lengthOfPromise = lengthOfArr.map((post) => axoisPages.fetcApiComments(post.id));
  return axios.all(lengthOfPromise).then((lengthOfResult) => lengthOfResult.map((result) => result.length)).then((lengthArr) => lengthArr.map((length, index) => {
	  lengthOfArr[index].comments = length;
      return lengthOfArr[index];
    })
  );
};

export const sortOrder = (sort) => ({type: 'SORT_ORDER',sort});

const voteForComment = ({ id, voteScore }) => ({type: 'VOTE_COMMENT',id,voteScore});
export const voteComment = (id, vote) => (dispatch) => {
  axoisPages.votePageComment(id, vote).then((comment) => dispatch(voteForComment(comment)));
};
axoisPages.votePageComment = (id, vote) => axios.post(`${URL}/comments/${id}`,{ option: vote }).then((res) => res.data);

const voteForPost = ({ id, voteScore }) => ({type: 'VOTE_POST',id,voteScore});
export const votePost = (id, vote) => (dispatch) => {
  axoisPages.votePagePost(id, vote).then((post) => dispatch(voteForPost(post)));
};
axoisPages.votePagePost = (id, vote) => axios.post(`${URL}/posts/${id}`, {option: vote}).then((res) => res.data);
