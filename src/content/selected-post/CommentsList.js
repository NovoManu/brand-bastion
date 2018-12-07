import React, { Component } from 'react'
import CommentItem from './CommentItem'
import CommentTextInput from './CommentTextInput'

class CommentsList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      replyText: ''
    }
  }
  setReplyText = text => {
    this.setState({
      replyText: text ? `[@${text}] ` : ''
    })
  }
  showComments () {
    return this.props.comments.map(comment => {
      return <CommentItem
        comment={comment} key={comment.id}
        createComment={this.props.createComment}
        setReplyText={this.setReplyText}
        setSelectedTags={this.props.setSelectedTags}
      />
    })
  }
  render () {
    const {createComment, tags, postId, selectedTags, deleteSelectedTag, mostPopularTags} = this.props
    return (
      <div className="mt-5">
        <CommentTextInput
          createComment={createComment}
          tags={tags}
          postId={postId}
          selectedTags={selectedTags}
          setReplyText={this.setReplyText}
          replyText={this.state.replyText}
          deleteSelectedTag={deleteSelectedTag}
          mostPopularTags={mostPopularTags}
        />
        {this.showComments()}
      </div>
    )
  }
}

export default CommentsList
