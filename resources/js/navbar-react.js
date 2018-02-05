import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import ReactDOM from 'react-dom';

export default class MyNavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
  }

  componentDidMount() {
    window.domReady();
  }

  toggle() {
    this.setState({isOpen: !this.state.isOpen});
  }

  render() {
    return (
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
    );
  }
}

ReactDOM.render(<MyNavBar />, document.getElementById('main-nav'));


/*
<nav class="navbar navbar-expand navbar-dark fixed-top" id="main-nav">
      <div class="container">
        <a class="navbar-brand" href="/">
          <i class="fa fa-code" aria-hidden="true"></i>JVV</a>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="nav navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link active" href="#top">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#nav-change">Projects</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#skills">Skills</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#contact">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
*/