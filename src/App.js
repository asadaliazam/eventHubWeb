import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import "./App.css";
import Routes from "./Routes";
import logo from "./logo.png";
import { Nav, Navbar, NavItem, MenuItem, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";
import { Consumer } from './context';
import Spinner from './containers/Spinner';
import {reactLocalStorage} from 'reactjs-localstorage';
import Footer from './containers/Footer.js'

class App extends Component {


  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount() {

    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
    reactLocalStorage.set('isAuthenticated', authenticated);

  }

  handleLogout = async event => {
    await Auth.signOut();
    this.userHasAuthenticated(false);
    reactLocalStorage.set('email', '');
    this.props.history.push("/login");
  }
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
      <Consumer>
          {value => {
              const {event_list} = value;
              // console.log(event_list);
              if (event_list === undefined || event_list.length === 0) {
                return <Spinner />
              }
              else {
                return (
                !this.state.isAuthenticating &&
      <div className="App container ">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/"><img className="home-logo" src={logo} alt="logo"/></Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.state.isAuthenticated
                ?<Fragment>
                  <LinkContainer to="/myevents">
                      <NavItem>My Events</NavItem>
                    </LinkContainer>

                 <NavDropdown eventKey="4" title="Profile" id="nav-dropdown">
                 <LinkContainer to="/profile">
                      <NavItem>Profile</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/preferences">
                      <NavItem>Preferences</NavItem>
                    </LinkContainer>
          <MenuItem divider />
          <NavItem onClick={this.handleLogout}>Logout</NavItem>
        </NavDropdown>
                    </Fragment>

                : <Fragment>
                    <LinkContainer to="/login">
                      <NavItem>Sign In</NavItem>
                    </LinkContainer>
                  </Fragment>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Routes childProps={childProps} />
        <Footer />
      </div>
    );

              }


  }
}
</Consumer>
 )
}
}

export default withRouter(App);
