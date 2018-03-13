export const addingComment = async (data) => {
  const options = {
    method: 'post',
    body: JSON.stringify({
      id: data.id,
      body: data.body,
      author: data.author,
      parentId: data.parentId,
      timestamp: data.timestamp,
      voteScore: 0
    })
  }
  try {
    const res = await fetch(`http://localhost:5001/comments`, options)
    return res.json()
  }
  catch (err) {
    console.error(err)
  }
}
export const addingPost = async (data) => {
  const options = {
    method: 'post',
    body: JSON.stringify({
      id: data.id,
      timestamp: data.timestamp,
      title: data.title,
      author: data.author,
      body: data.body,
      category: data.category,
      voteScore: 0,
      deleted: false
    })
  };
  try {
    const res = await fetch(`http://localhost:5001/posts`, options)
    return res.json()
  }
  catch (err) {
    console.error(err)
  }  
}
export const decScoreForPost = (postId) => {
  const options = {
    method: 'post',
    body: JSON.stringify({
      option: 'downVote'
    })
  }
  return fetch(`http://localhost:5001/posts/${postId}`, options)
  .then(
    res => {
      return res.json()
    }
  )
  .catch(err => console.error(err))
}
export const deletingComment = async (commentId) => {
  const options = { method: 'delete' }
  try {
    const res = await fetch(`http://localhost:5001/comments/${commentId}`, options)
    return res.json()
  }
  catch (err) {
    console.error(err)
  }
}
export const deletingPost = async (postId) => {
  const options = { method: 'delete' }
  try {
    const res = await fetch(`http://localhost:5001/posts/${postId}`, options)
    return res.json()
  }
  catch (err) {
    console.error(err)
  }
}
export const editingComment = async (data) => {
  const { id, timestamp, body } = data;
  const options = {
    method: 'put',
    body: JSON.stringify({
      timestamp: timestamp,
      body: body
    })
  }
  try {
    const res = await fetch(`http://localhost:5001/comments/${id}`, options)
    return res.json()
  }
  catch (err) {
    console.error(err)
  }
}
export const editingPost = async (data) => {
  const { id, title, body } = data;
  const options = {
    method: 'put',
    body: JSON.stringify({
      title,
      body
    })
  }
  try {
    const res = await fetch(`http://localhost:5001/posts/${id}`, options)
    return res.json()
  }
  catch (err) {
    console.error(err)
  }
}
export const getCategories = () => {
  const options = { method: 'get' }
  return fetch('http://localhost:5001/categories', options)
    .then(
      res => res.json()
    )
    .catch(err => console.error(err))
}
export const getComments = async (postId) => {
  const options = { method: 'get' }
  try {
    const res = await fetch(`http://localhost:5001/posts/${postId}/comments`, options)
    return res.json()
  } catch (err) {
    console.err(err)
  }
}
export const getPosts = () => {
  const options = { method: 'get' }
  return fetch('http://localhost:5001/posts', options)
    .then(
      res => {
        return res.json()
      }
    )
    .catch(err => console.error(err))
}
export const incScoreForPost = (postId) => {
  const options = {
    method: 'post',
    body: JSON.stringify({
      option: 'upVote'
    })
  }
  return fetch(`http://localhost:5001/posts/${postId}`, options)
  .then(
    res => {
      return res.json()
    }
  )
  .catch(err => console.error(err))
}