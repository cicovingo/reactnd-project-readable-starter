export default (state = "", action) => {
  switch (action.type) {
    case 'FILTER_FOR_CATEGORY':
      return action.filter
    default:
      return state
  }
}