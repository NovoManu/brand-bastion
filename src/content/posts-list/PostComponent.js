import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader'

class PostComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const {post, user} = this.props
    return (
      <Card onClick={this.props.selectPost.bind(this, post.id)} className="mb-2">
        <CardActionArea>
          <CardHeader title={post.title} className="card-title pb-0"></CardHeader>
          <CardContent className="pt-0">
            <Typography component="p">
              {post.body}
            </Typography>
            <Typography component="p" className="text-right font-italic" variant="caption" color="textPrimary">
              by {user.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
  }
}

export default PostComponent
