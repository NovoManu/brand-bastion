import React, { Component } from 'react'
import {
  Navbar,
  NavbarBrand,
} from 'reactstrap'

class HeaderComponent extends Component {
  constructor (props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    }
  }

  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render () {
    return (
      <header>
        <Navbar color="primary" className="custom" expand="md">
          <NavbarBrand className="text-white">BrandBastion</NavbarBrand>
        </Navbar>
      </header>
    )
  }
}

export default HeaderComponent
