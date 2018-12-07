import React, { Component } from 'react'
import {Row, Col, FormGroup, Input} from 'reactstrap'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import CommentTagsFilter from './CommentTagsFilter'
import CommentTagsChart from './CommentTagsChart'

class CommentTextInput extends Component {
  constructor (props) {
    super(props)
    this.state ={
      commentText: '',
      tags: ''
    }
  }
  setComment = (e) => {
    this.setState({
      commentText: e.target.value
    })
  }
  setTags = (e) => {
    this.setState({
      tags: e.target.value
    })
  }
  handleSave = () => {
    // Note: turn string into an array and remove duplicates
    const formattedTags = this.state.tags.split(' ')
      .filter((value, index, self) => self.indexOf(value) === index)
    this.props.createComment(this.state.commentText, this.props.postId, formattedTags)
    this.clearState()
  }
  handleClear = () => {
    this.clearState()
  }
  clearState = () => {
    this.props.setReplyText('')
    this.setState({
      commentText: '',
      tags: ''
    })
  }
  tagSuggestion = () => {
    const tags = this.state.tags.split(' ')
    const lastTag = tags[tags.length - 1]
    const filteredTags = this.props.tags.filter(tag => tag.indexOf(lastTag) !== -1)
      .slice(0, 5)
    if (!filteredTags.length || !lastTag) return null
    if (filteredTags[0] === lastTag) return null
    return <div>
      <div className="autocomlete-box__before"></div>
      <div className="autocomlete-box">
        <div className="autocomplete-box__scroll">
          <List>
            {this.showListOfTags(filteredTags)}
          </List>
        </div>
      </div>
    </div>
  }
  showListOfTags = (tags) => {
    return tags.map((tag, index) => <ListItem button key={index} onClick={(e) => this.tagsAutocomplete(e, tag)}>
        <ListItemText primary={tag}/>
      </ListItem>
    )
  }
  tagsAutocomplete = (e, tag) => {
    const arr = this.state.tags.split(' ')
    arr[arr.length - 1] = tag
    this.setState({
      tags: arr.join(' ')
    })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.replyText !== this.state.commentText) {
      this.setState({ commentText: `${nextProps.replyText}` });
      this.input.focus()
    }
  }
  render () {
    const disabledButton = !this.state.commentText
    const {deleteSelectedTag, selectedTags, mostPopularTags} = this.props
    return (
      <div>
        <FormGroup className="mb-0">
          <div className="d-flex align-items-center mb-2">
            <Icon className="mr-1 text-secondary">forum</Icon>
            <div className="text-uppercase">Add comment</div>
          </div>
          <Input
            type="textarea"
            value={this.state.commentText}
            onChange={this.setComment}
            ref={(ip) => this.input = ip}
            name="comment"
            placeholder="Add a new comment"/>
          <div className="position-relative">
            <Input
              type="text"
              value={this.state.tags}
              onChange={this.setTags}
              name="tags"
              placeholder="Add your tags here"
              className="mt-1"
            />
            {this.tagSuggestion()}
          </div>
        </FormGroup>
        <div className="text-right">
          <Button
            onClick={this.handleSave}
            size="small"
            color="primary"
            className="mr-1"
            disabled={disabledButton}>
            <Icon className="text-small">check</Icon>
            Save
          </Button>
          <IconButton
            onClick={this.handleClear}
            size="small"
            disabled={disabledButton}>
            <Icon className="text-small">delete</Icon>
          </IconButton>
        </div>
        <Row>
          <Col xs="12" sm="6">
            <CommentTagsFilter
              selectedTags={selectedTags}
              deleteSelectedTag={deleteSelectedTag}
            />
          </Col>
          <Col xs="12" sm="6">
            <CommentTagsChart
              mostPopularTags={mostPopularTags}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default CommentTextInput
