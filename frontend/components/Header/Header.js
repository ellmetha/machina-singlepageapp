import React, { Component, PropTypes } from 'react';
import {
  Nav,
  Navbar,
  NavItem,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { signout } from '../../actions/auth';

if (process.env.BROWSER) require('./Header.less');

class Header extends Component {
  static propTypes = {
    user: PropTypes.object,
    signout: PropTypes.func.isRequired
  };

  handleSignOut = (event) => {
    event.preventDefault();
    this.props.signout();
  }

  render() {
    const {user} = this.props;
    return (
      <Navbar fluid={true}>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Machina Forum</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          {user && <Navbar.Text>{user.username}</Navbar.Text>}
          {!user &&
            <Nav pullRight>
              <li><Link to="/signup">Sign up</Link></li>
              <li><Link to="/signin">Sign in</Link></li>
            </Nav>
          }
          {user &&
            <Nav pullRight>
              <li>
                <OverlayTrigger placement="bottom" overlay={<Tooltip id="nav-search" className="nav-tooltip">Search</Tooltip>}>
                  <Link to="/search"><i className="fa fa-search"></i></Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger placement="bottom" overlay={<Tooltip id="nav-profile" className="nav-tooltip">Profile</Tooltip>}>
                  <Link to="/profile"><i className="fa fa-user"></i></Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger placement="bottom" overlay={<Tooltip id="nav-account-settings" className="nav-tooltip">Account settings</Tooltip>}>
                  <Link to="/settings"><i className="fa fa-cogs"></i></Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger placement="bottom" overlay={<Tooltip id="nav-signout" className="nav-tooltip">Sign out</Tooltip>}>
                  <Link to="#" onClick={this.handleSignOut}><i className="fa fa-power-off"></i></Link>
                </OverlayTrigger>
              </li>
            </Nav>
          }
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default connect(
  state => ({user: state.auth.user}),
  {signout}
)(Header);
