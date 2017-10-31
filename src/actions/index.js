export const GET_CATEGORIES = 'GET_CATEGORIES'
export const SET_CATEGORY = 'SET_CATEGORY'
export const SET_SORT = 'SET_SORT'
export const GET_CATEGORY_POSTS = 'GET_CATEGORY_POSTS'
export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const GET_POST_DETAILS = 'GET_POST_DETAILS'
export const GET_POST_COMMENTS = 'GET_COMMENTS'
export const GET_COMMENT_DETAILS = 'GET_COMMENT_DETAILS'
export const ADD_POST = 'ADD_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const UPDATE_POST = 'UPDATE_POST'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const VOTE_POST = 'VOTE_POST'
export const VOTE_COMMENT = "VOTE_COMMENT"
export const DELETE_POST = 'DELETE_POST'
export const DELETE_POST_COMMENTS = 'DELETE_POST_COMMENTS'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const INCREMENT_COMMENTS = 'INCREMENT_COMMENTS'
export const DECREMENT_COMMENTS = 'DECREMENT_COMMENTS'


// API params
const api = "http://localhost:5001/"
const headers = {
  'Authorization': "myToken1234",
  'Content-Type': 'application/json'
}
const showError = (error) =>
  console.log('fetch failed: ' , error.statusText);

// load posts
const getAllPosts = (posts) => {
  return {
    type: GET_ALL_POSTS,
    posts
  }
}

export const loadPosts = () => {
  return dispatch => {
    fetch(`${ api }posts`, {headers})
      .then(res => {
        if (!res.ok) {
          throw res
        } else  return res.json()
      })
      .then(json => dispatch(getAllPosts(json)))
      .catch( error => showError(error));
  }
}

// load categories
const getCategories = (categories) => {
  return {
    type: GET_CATEGORIES,
    categories
  }
}
export const loadCategories = () => {
  return dispatch => {
    fetch(`${ api }categories`, {headers})
      .then(res => {
        if (!res.ok) {
          throw res
        } else  return res.json()
      })
    .then(json => dispatch(getCategories(json)))
    .catch( error => showError(error));
  }
}

export const setCategory = (category) => {
  return {
    type: SET_CATEGORY,
    category
  }
}

export const setSort = (sortType) => {
  return {
    type: SET_SORT,
    sortType
  }
}
// load post comments
const getPostComments = (postId, comments)  => {
  return {
    type: GET_POST_COMMENTS,
    postId,
    comments
  }
}

export const loadPostComments = (postId) => {
  return dispatch => {
      fetch(`${api}posts/${postId}/comments`, {headers})
      .then(res => {
        if (!res.ok) {
          throw res
        } else  return res.json()
      })
      .then(json => dispatch(getPostComments(postId, json)))
      .catch( error => showError(error));
  }
}

export function getCategoryPosts(category) {
  return {
    type: GET_CATEGORY_POSTS,
    category
  }
}

export function getPostDetails(postId) {
  return {
    type: GET_CATEGORY_POSTS,
    postId
  }
}

export function getCommentDetails(commentId) {
  return {
    type: GET_COMMENT_DETAILS,
    commentId
  }
}

// requests to add data
const addPost = (post) => {
  return {
    type: ADD_POST,
    post
  }
}

export const sendPost = (post) => {
  return dispatch => {
  fetch(`${api}posts`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      commentCount: post.commentCount
     }),
  })
  .then(res => {
    if (!res.ok) {
      throw res
    } else  return res.json()
  })
  .then(json => dispatch(addPost(json)))
  .catch( error => showError(error));
  }
}

const addComment =(comment) =>{
  return {
    type: ADD_COMMENT,
    comment
  }
}

const incrementComments =(postId) =>{
  return {
    type: INCREMENT_COMMENTS,
    postId
  }
}

export const sendComment = (comment) => {
  return dispatch => {
  fetch(`${api}comments`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      id: comment.id,
      timestamp: comment.timestamp,
      body: comment.body,
      author: comment.author,
      parentId: comment.parentId
     }),
  })
  .then(res => {
    if (!res.ok) {
      throw res
    } else  return res.json()
  })
  .then(json => dispatch(addComment(json)))
  .then(() => dispatch(incrementComments(comment.parentId)))
  .catch( error => showError(error));
  }
}

// used for editing posts
const updatePost = (body, title, postId) => {
  return {
    type: UPDATE_POST,
    body, title, postId
  }
}

export const editPost = (post) => {
  const postId = post.id
  return dispatch => {
  fetch(`${api}posts/${post.id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify({
      title: post.title,
      timestamp: post.timestamp,
      body: post.body
     }),
  })
  .then(res => {
    if (!res.ok) {
      throw res
    } else {
      return res.json()
    }
  })
  .then(post => dispatch(updatePost(post.body, post.title, postId)))
  .catch( error => showError(error));
  }
}

const updateComment = (comment, commentId, parentId) => {
  return {
    type: UPDATE_COMMENT,
    comment,
    commentId,
    parentId
  }
}

export const editComment = (comment) => {
  const parentId = comment.parentId
  const commentId = comment.id
  return dispatch => {
  fetch(`${api}comments/${commentId}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify({
      body: comment.body,
      timestamp: comment.timestamp,
     }),
  })
  .then(res => {
    if (!res.ok) {
      throw res
    } else  return res.json()
  })
  .then(comment => dispatch(updateComment(comment, commentId, parentId )))
  .catch( error => showError(error));
  }
}

// voting
const votePost = (post) => {
  return {
    type: VOTE_POST,
    post
  }
}

export const sendPostVote = (postId, vote) => {
  return dispatch => {
   fetch(`${ api}posts/${postId}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          option: vote
        })
      })
    .then(res => {
      if (!res.ok) {
        throw res
      } else  return res.json()
    })
    .then(post => dispatch(votePost(post)))
    .catch( error => showError(error));
  }
}

const voteComment = (comment) => {
  return {
    type: VOTE_COMMENT,
    comment
  }
}

export const sendCommentVote = (comment, vote) => {
  return dispatch => {
   fetch(`${ api}comments/${comment.id}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          option: vote
        })
      })
    .then(res => {
      if (!res.ok) {
        throw res
      } else  return res.json()
    })
    .then(comment => dispatch(voteComment(comment)))
    .catch( error => showError(error));
  }
}

const deletePost = (postId) => {
  return {
    type: DELETE_POST,
    postId
  }
}

const deletePostComments = (postId) => {
  return {
    type: DELETE_POST_COMMENTS,
    postId
  }
}

export const destroyPost = (postId) => {

  return dispatch => {
    fetch(`${api}posts/${postId}`, {
      method: 'DELETE',
      headers: headers
    })
  .then(res => {
    if (!res.ok) {
      throw res
    } else return
  })
  .then(() => dispatch(deletePost(postId)))
  .then(() => dispatch(deletePostComments(postId)))
  .catch( error => showError(error));
  }
}

const deleteComment = (commentId, parentId) => {
  return {
    type: DELETE_COMMENT,
    commentId,
    parentId
  }
}

const decrementComments =(postId) =>{
  return {
    type: DECREMENT_COMMENTS,
    postId
  }
}

export const destroyComment = (comment) => {
  return dispatch => {
    fetch(`${api}comments/${comment.id}`, {
      method: 'DELETE',
      headers: headers
  })
  .then(res => {
    if (!res.ok) {
      throw res
    } else  return
  })
  .then(() => dispatch(deleteComment(comment.id, comment.parentId)))
  .then(() => dispatch(decrementComments(comment.parentId)))
  .catch( error => showError(error));
  }
}
