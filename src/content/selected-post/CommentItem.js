import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import Chip from '@material-ui/core/Chip'

class CommentItem extends Component {
  constructor (props) {
    super(props)
  }
  handleButton = () => {
    this.props.setReplyText(this.props.comment.email)
  }
  showListOfTags = () => {
    if (!this.props.comment.tags) return null
    return this.props.comment.tags.map((tag, index) =>{
      return <div key={index}>
        <Chip
          label={tag}
          clickable
          className="chip-tag"
          onClick={(e) => this.props.setSelectedTags(tag)}
        />
      </div>
    })
  }
  render () {
    const {comment} = this.props
    return (
      <Card className="mt-3">
        <CardContent className="pb-0 pt-1">
          <Typography color="textSecondary" variant="caption">{comment.email}</Typography>
          <Typography component="p" className="font-italic" variant="caption" color="textPrimary">
            {comment.body}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={this.handleButton}
          >
            <Icon className="text-small">reply</Icon>
            Reply
          </Button>
          {this.showListOfTags()}
        </CardActions>
      </Card>
    )
  }
}

export default CommentItem
