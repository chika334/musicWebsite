import React, { Component } from 'react';
import { logout } from '../action/userAction';
import { connect } from 'react-redux';
import { NavLink } from 'react-bootstrap';
import PropTypes from 'prop-types';

export class Logout extends Component {

  static propTypes = {
    logout: PropTypes.func.isRequired
  }

  render() {
    return (
      <>
        <NavLink onClick={this.props.logout} href="/signin">
          Logout
        </NavLink>
      </>
    )
  }
}

export default connect(null, { logout })(Logout)