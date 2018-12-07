import React, { Component } from 'react'
import './App.css'
import {sendApiGetRequest} from './api-calls'
import HeaderComponent from './layout/HeaderComponent'
import AppContainer from './content/AppContainer'

class App extends Component {
  constructor (props) {
    super (props)
    this.state = {
      currentUser: null,
      users: [],
      posts: [],
      comments: [],
      tags: [],
      search: ''
    }
  }
  fetchUsers () {
    sendApiGetRequest('https://jsonplaceholder.typicode.com/users/')
      .then(users => this.setState({users, currentUser: users[0]}))
  }
  fetchPosts () {
    sendApiGetRequest('https://jsonplaceholder.typicode.com/posts/')
      .then(posts => this.setState({posts}))
  }
  fetchComments () {
    sendApiGetRequest('https://jsonplaceholder.typicode.com/comments/')
      .then(comments => this.setState({comments}))
  }
  fetchTags () {
    this.setState({tags: [
        'people', 'nature', 'man', 'woman', 'live'
      ]})
  }
  createComment = (body, postId, tags) => {
    this.createTags(tags)
    const email = this.state.currentUser.email
    const id = this.state.comments.length
    const comment = {id, postId, body, email, tags}
    this.setState({
      comments: [...this.state.comments, comment]
    })
  }
  createTags = (tags) => {
    const newTags = tags.filter(tag => !this.state.tags.find(t => t === tag))
    this.setState({
      tags: [...this.state.tags, ...newTags]
    })
  }
  setSearch = (e) => {
    this.setState({search: e.target.value})
  }
  filteredPosts = () => {
    if (!this.state.search) return this.state.posts
    const users = this.state.users.filter(user => user.name.toLowerCase()
      .indexOf(this.state.search.toLowerCase()) !== -1)
      .map(user => user.id)
    return this.state.posts.filter(post => users.find(user => user === post.userId))
  }
  componentDidMount() {
    this.fetchUsers()
    this.fetchPosts()
    this.fetchComments()
    this.fetchTags()
  }
  render() {
    return (
      <div>
        <HeaderComponent/>
        <AppContainer
          users={this.state.users}
          posts={this.filteredPosts()}
          comments={this.state.comments}
          tags={this.state.tags}
          createComment={this.createComment}
          setSearch={this.setSearch}
        />
      </div>
    );
  }
}

export default App
