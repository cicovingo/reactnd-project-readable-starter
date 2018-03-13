import { combineReducers } from 'redux'
import reducerForCategory from './reducerForCategory'
import reducerForComment from './reducerForComment'
import reducerForFilter from './reducerForFilter'
import reducerForPost from './reducerForPost'
import reducerForSort from './reducerForSort'
export default combineReducers({
  categories: reducerForCategory,
  comments: reducerForComment,
  filter: reducerForFilter, 
  posts: reducerForPost,
  sort: reducerForSort
})