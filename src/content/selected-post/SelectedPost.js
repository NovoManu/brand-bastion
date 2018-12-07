import React, { Component } from 'react'
import lodash from 'lodash'
import CommentsList from './CommentsList'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'

class SelectedPost extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedTags: []
    }
  }
  setSelectedTags = (tag) => {
    if (!this.state.selectedTags.find(t => tag === t)) {
      this.setState({
        selectedTags: [...this.state.selectedTags, tag]
      })
    }
  }
  deleteSelectedTag = (tag) => {
    this.setState({
      selectedTags: this.state.selectedTags.filter(t => t !== tag)
    })
  }
  commentsFilteredByTags = () => {
    if (!this.state.selectedTags.length) return this.props.comments.slice(0, 3)
    return this.props.comments.filter(comment => comment.tags)
      .filter(comment => comment.tags
        .find(tag => this.state.selectedTags.includes(tag)))
      .slice(0, 3)
  }
  mostPopularTags = () => {
    const tags = this.props.comments.filter(comment => comment.tags)
      .map(comment => comment.tags)
      .reduce((acc, cur) => [...acc, ...cur], [])
    const groupedTags = lodash.groupBy(tags)
    return Object.keys(groupedTags).map(key => {
      return {
        key,
        count: groupedTags[key].length
      }
    })
      .sort((a, b) => a.count - b.count)
      .reverse()
      .slice(0, 3)
  }
  render () {
    const {post, tags, closePost, createComment} = this.props
    return (
      <div>
        <Card>
          <CardHeader title={post.title} className="card-title pb-0"
            action={
              <IconButton>
                <Icon onClick={closePost}>close</Icon>
              </IconButton>
            }>
          </CardHeader>
          <CardContent className="pt-1">
            <Typography component="p" variant="caption" color="textPrimary">
              {post.body}
            </Typography>
          </CardContent>
        </Card>
        <CommentsList
          comments={this.commentsFilteredByTags()}
          tags={tags}
          postId={post.id}
          selectedTags={this.state.selectedTags}
          createComment={createComment}
          setSelectedTags={this.setSelectedTags}
          deleteSelectedTag={this.deleteSelectedTag}
          mostPopularTags={this.mostPopularTags()}
        />
      </div>
    )
  }
}

export default SelectedPost
