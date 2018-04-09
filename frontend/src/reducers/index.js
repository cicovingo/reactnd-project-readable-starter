import { combineReducers } from 'redux';
const initState = { sortBy: 'timestamp' };
const categoryR = (state={}, action) => {
  const { categories } = action;
  switch(action.type) {
    case 'FETCH_CATEGORIES':
      return { ...state, categories };
    default:
      return state;
  }
};
const commentR = (state={}, action) => {
  const { comments, comment } = action;
  switch(action.type) {
    case 'ADD_COMMENT':
      return { ...state,  comments: { ...state.comments, [action.id]: comment }};     
    case 'DELETE_COMMENT':
      return { ...state, comments: { ...state.comments, [action.id]: null }};
    case 'EDIT_COMMENT':
      return { ...state, comments: { ..state.comments, [action.id]: comment }};
	case 'FETCH_COMMENTS':
      return { ...state, comments: comments.reduce((a, b) => { a[b.id] = b; return a; }, {})};
    case 'VOTE_COMMENT':
      return { ...state, comments: { ...state.comments, [action.id]: { ...state.comments[action.id], voteScore: action.voteScore }}};
    default:
      return state;
  }
};
const postR = (state=initState, action) => {
  const { posts, post } = action;
  switch(action.type) {
    case 'ADD_POST':
      return { ...state, posts: { ...state.posts, [action.id]: post }};
    case 'DELETE_POST':
      return { ...state, posts: { ...state.posts, [action.id]: null }};
    case 'EDIT_POST':
      return { ...state, posts: { ...state.posts, [action.id]: post }};  
    case 'FETCH_POSTS':
      return { ...state, posts: posts.reduce((a, b) => { a[b.id] = b; return a;  }, {})};
    case 'FETCH_POST':
      return { ...state, posts: { [action.id]: post } };
	case 'SORT_ORDER':
      return { ...state,  sortBy: action.sort };
    case 'VOTE_POST':
      return { ...state, posts: { ...state.posts, [action.id]: { ...state.posts[action.id], voteScore: action.voteScore }}};
    default:
      return state;
  }
};
export default combineReducers({
  category: categoryR,
  comment: commentR,
  post: postR
});
