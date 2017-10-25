import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CommentForm from './CommentForm'
import { connect } from 'react-redux';
import formatDate from "../utils/helpers.js"
import { sendCommentVote, editComment } from '../actions'
import { reset } from 'redux-form'
import Modal from 'react-modal'

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired
  }

    state = {
      commentModalOpen: false
    }

    openEditCommentModal = () => this.setState(() => ({ commentModalOpen: true }))
    closeEditCommentModal = () => this.setState(() => ({ commentModalOpen: false }))

    editComment = (comment) => {
    const updatedComment = {
        id: comment.id,
        timestamp: Date.now(),
        body: comment.body,
        author: comment.author,
        parentId: comment.parentId
      }
      this.props.updateComment(updatedComment)
      this.props.resetCommentForm()
      this.closeEditCommentModal()
    }

  vote  = (commentId, vote) =>  {
    this.props.sendVote(commentId, vote)
  }


  render() {
    const { comment } = this.props
    const vote = this.vote
    const { commentModalOpen } = this.state

    return (
      <div>
        <Modal
          className='modal comment-modal'
          overlayClassName='overlay'
          isOpen={commentModalOpen}
          onRequestClose={this.closeEditCommentModal}
          contentLabel='Modal'
        >
          {commentModalOpen && <CommentForm
            initialValues={comment}
            onSubmit={this.editComment} />}
        </Modal>
        <div className="comment" key={comment.id}>
          <div className="voting">
            <div className="up icon"
              onClick={() => vote(comment.id, "upVote")}>
              up vote
            </div>
            <div className="votes icon">{comment.voteScore}</div>
            <div className="down icon"
              onClick={() =>vote(comment.id, "downVote")}>
              down vote
            </div>
          </div>
          <div className="comment-body">
            <p>{comment.body}</p>
            <p className="comment-author">{comment.author}</p>
            <p className="comment-time">{formatDate(comment.timestamp)}</p>
            <button onClick={this.openEditCommentModal} className="add-button">Edit Comment</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { comments: state.comments }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendVote: (commentId, vote) => dispatch(sendCommentVote(commentId, vote)),
    updateComment: (comment) => dispatch(editComment(comment)),
    resetCommentForm:() => dispatch(reset('commentForm'))
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment)
