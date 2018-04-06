import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  //NavLink,
  //UncontrolledDropdown,
  //DropdownToggle,
  //DropdownMenu,
  //DropdownItem
} from 'reactstrap';
//import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css';

export default class MyNavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <div id="main-nav">
        <Navbar dark fixed="top" expand="sm">
          <div className="container">
            <NavbarBrand href="/"><i className="fa fa-code" aria-hidden="true"></i>JVV</NavbarBrand>
            <NavbarToggler onClick={() => this.toggle()} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <a className="nav-link active" href="#top">Home</a>
                </NavItem>
                <NavItem>
                  <a className="nav-link" href="#nav-change">Projects</a>
                </NavItem>
                <NavItem>
                  <a className="nav-link" href="#skills">Skills</a>
                </NavItem>
                <NavItem>
                  <a className="nav-link" href="#contact">Contact</a>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </div>
    );
  }
}

//ReactDOM.render(<MyNavBar />, document.getElementById('main-nav'));