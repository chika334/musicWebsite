import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import loadingGif from '../images/gif/loading-arrow.gif';
// const { REACT_APP_GIT_HASH, REACT_APP_MY_ENV } = process.env;

export class Loading extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      show: false,
      redirect: false,
    }
  }
  

  static propsTypes = {
    auth: PropTypes.object.isRequired
  }

  componentDidMount() {
    setTimeout(() => this.setState({ show: true}), 4000)
  }

  render() {
    const {isAuthenticated, user} = this.props.auth;
    console.log(user)
    // console.log(REACT_APP_MY_ENV)
    return (
      <div className="loading">
        {
          isAuthenticated ?
          <div>
            <h4>Welcome {user.username}</h4>
            <img src={loadingGif} />
            {
              this.state.redirect || this.state.show ?
              // <Redirect to={`${newUser.profile}`} /> : ''
              <Redirect to='/' /> : ''
            }
          </div>
          : ''
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(Loading);