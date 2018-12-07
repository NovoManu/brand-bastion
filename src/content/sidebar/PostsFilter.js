import React, { Component } from 'react'
import {Col} from 'reactstrap'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Icon from '@material-ui/core/Icon'

class PostsFilter extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <Col xs="12" md="2">
        <div className="position-relative">
          <TextField
            id="standard-search"
            label="Search post"
            type="search"
            margin="normal"
            variant="outlined"
            onChange={this.props.setSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon>search</Icon>
                </InputAdornment>
              ),
            }}
          />
        </div>
      </Col>
    )
  }
}

export default PostsFilter
