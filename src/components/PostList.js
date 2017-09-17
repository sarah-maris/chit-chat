import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Post from './Post'

class PostList extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
  }

  render() {
    const { posts } = this.props

    return (
    <section className="posts-list">
      {posts.map((post) => (
        <Post
          post={post}
          key={post.id}
        />
      ))}
    </section>
    )
  }
}

export default PostList