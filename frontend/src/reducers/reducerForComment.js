export default (initialState = {}, action) => {
  switch (action.type) { 
    case 'ADDING_COMMENT':
      const aState = { ...initialState }
      const parentId = action.comment.parentId
      aState[parentId] = [ ...aState[parentId], action.comment ]
      return aState; 
    case 'DELETING_COMMENT':
      const rState = { ...initialState }
      let rKeys = Object.keys(initialState)
      rKeys.forEach( k => {
        rState[k] = initialState[k].filter(e => e.id !== action.id)
      });
      return rState;
    case 'EDITING_COMMENT':
      const { comment } = action;
      const eState = { ...initialState }
      let eKeys = Object.keys(initialState)
      eKeys.forEach( k => {
        eState[k] = initialState[k].map( e => {
          if (e.id === comment.id) {
            return { ...e, body: comment.body, timestamp: comment.timestamp }
          }
          return e;
        })
      });
      return eState;
    case 'GET_COMMENTS':
      let newState = { ...initialState }
      if (action.comments.length > 0) {
        const key = action.comments[0].parentId
        newState[key] = action.comments
      } else {
        newState[action.postId] = []
      }
      return newState;
    default:
      return initialState
  }
}