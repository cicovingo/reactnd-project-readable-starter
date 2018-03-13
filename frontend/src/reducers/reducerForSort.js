const defaultSort = { field: 'voteScore', order: 'desc' };
export default (state = defaultSort, action) => {
  switch (action.type) {
    case 'CHANGE_SORT':
      return {
        field: action.sort.field,
        order: action.sort.order
      }
    default:
      return state
  }
}
