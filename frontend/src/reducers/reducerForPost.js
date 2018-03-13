export default (state = [], action) => {
  switch (action.type) {
    case 'ADDING_POST':
      return [ ...state, action.post ];
    case 'DEC_SCORE':
      return state.map(p => {
        if (p.id !== action.id) {
          return p;
        }
        return {
          ...p,
          voteScore: p.voteScore -1
        }
      });   
    case 'DELETING_POST':
      return state.filter(p => p.id !== action.id);
    case 'EDITING_POST':
      const { post } = action;
      return state.map(p => {
        if (p.id !== post.id) {
          return p;
        }
        return {
          ...p,
          title: post.title,
          body: post.body
        }
      });
    case 'GET_POSTS':
      return action.posts.filter( p => !p.deleted);
    case 'INC_SCORE':
      return state.map(p => {
        if (p.id !== action.id) {
          return p;
        }
        return {
          ...p,
          voteScore: p.voteScore + 1
        }
      });
      default:
        return state
  }
}