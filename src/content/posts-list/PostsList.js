import React, { Component } from 'react'
import PostComponent from './PostComponent'
import PaginationComponent from '../common/PaginationComponent'

class PostsList extends Component {
  constructor (props) {
    super(props)
  }
  user = (post) => {
    return this.props.users.find(user => user.id === post.userId) || {name: 'Anonimous'}
  }
  showPosts () {
    return this.props.posts.map(post => {
      return <PostComponent
        post={post} key={post.id}
        user={this.user(post)}
        selectPost={this.props.selectPost}
      />
    })
  }

  render () {
      const {previousPage, nextPage} = this.props
    return (
      <div>
        {this.showPosts()}
        <PaginationComponent
          previousPage={previousPage}
          nextPage={nextPage}
        />
      </div>
    )
  }
}

export default PostsList
