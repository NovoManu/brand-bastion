import React, { Component } from 'react'
import PostsList from './posts-list/PostsList'
import SelectedPost from './selected-post/SelectedPost'
import PostsFilter from './sidebar/PostsFilter'
import { Container, Row, Col } from 'reactstrap'

class AppContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedPost: null,
      selectedPostComments: null,
      page: 0,
      postsPerPage: 5
    }
  }
  paginatedPosts () {
    const start = this.state.page * this.state.postsPerPage
    const end = start + this.state.postsPerPage
    return this.props.posts.slice(start, end)
  }
  previousPage = () => {
    if (this.state.page) {
      const page = this.state.page - 1
      this.setState({page})
    }
  }
  nextPage = () => {
    const postsLength = this.props.posts.length
    const currentStartIndex = this.state.page * this.state.postsPerPage
    if (postsLength - this.state.postsPerPage > currentStartIndex) {
      this.setState({page: this.state.page + 1})
    }
  }
  selectPost = (id) => {
    const selectedPost = this.props.posts.find(post => post.id === id)
    this.setState({
      selectedPost
    })
  }
  closePost = () => {
    this.setState({
      selectedPost: null
    })
  }
  getSelectedPostComments = comments => {
    return comments.filter(comment => comment.postId === this.state.selectedPost.id).reverse()
  }
  render () {
    const {comments, tags, setSearch, createComment, users} = this.props;
    return (
      <Container className="p-3">
        <Row>
          <PostsFilter setSearch={setSearch}/>
          <Col xs="12" sm={this.state.selectedPost ? 5 : 8}>
            <PostsList
              users={users}
              posts={this.paginatedPosts()}
              selectPost={this.selectPost}
              previousPage={this.previousPage}
              nextPage={this.nextPage}
            />
          </Col>
          <Col xs="12" sm="5">
            {this.state.selectedPost &&
            <SelectedPost
              post={this.state.selectedPost}
              comments={this.getSelectedPostComments(comments)}
              tags={tags}
              closePost={this.closePost}
              createComment={createComment}
            />
            }
          </Col>
        </Row>
      </Container>
    )
  }
}

export default AppContainer
