import React, { Component } from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

class PaginationComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      itemsPerPage: 5
    }
  }

  render () {
    return (
      <Pagination aria-label="Page navigation example" className="d-flex justify-content-center fixed-bottom">
        <PaginationItem>
          <PaginationLink previous href="#" onClick={this.props.previousPage} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink next href="#" onClick={this.props.nextPage}/>
        </PaginationItem>
      </Pagination>
    )
  }
}

export default PaginationComponent
