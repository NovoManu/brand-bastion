import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'

class CommentTagsFilter extends Component {
  constructor (props) {
    super(props)
  }
  showSelectedTags = () => {
    const {selectedTags, deleteSelectedTag} = this.props
    if (!selectedTags.length) return null
    return selectedTags.map((tag, index) => {
      return <Chip key={index}
        label={tag}
        onDelete={(e) => deleteSelectedTag(tag)}
        className="chip-tag"
      />
    })
  }
  render () {
    return (
      <div>
        <Typography component="h6" variant="caption">Selected tags</Typography>
        <div className="d-flex align-items-center mt-1">
          {this.showSelectedTags()}
        </div>
      </div>
    )
  }
}

export default CommentTagsFilter
