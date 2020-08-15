import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import {signup} from '../action/userAction';
import PropTypes from 'prop-types'
import '../css/register.css';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { clearErrors } from '../action/errorActions';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

export class Signup extends Component {
constructor(props) {
  super(props)

  this.state = {
    username: '',
    email: '',
    password: '',
    msg: '',
    redirect: false,
    formErrors: {
      username: "",
      email: "",
      password: ""
    },
  }
}

static propType = {
  signup: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired
}

componentDidUpdate(prevProps) {
  const { error, isAuthenticated } = this.props;
  if (error !== prevProps.error) {
    // Check for register error
    if (error.id === 'REGISTER_FAIL') {
      this.setState({ msg: error.msg.msg })
    } else {
      this.setState({ msg: null })
    }
  }

  // if authenticated redirect 
  if (isAuthenticated === true) {
    this.setState({
      redirect: true
    })
    this.SendRedirect()
  }
}

SendRedirect = () => {
  this.props.clearErrors()
}

handleChange = e => {
  e.preventDefault();

  const { name, value } = e.target;
  let formErrors = { ...this.state.formErrors };

  switch (name) {
    case "username":
      formErrors.username = 
        value.length < 6 ? "minimum of 6 characters required" : "";
      break;
    case "email":
      formErrors.email = emailRegex.test(value)
        ? ""
        : "invalid email address";
      break;
    case "password":
      formErrors.password =
        value.length < 6 ? "minimum 6 characaters required" : "";
      break;
    default:
      break;
  }

  this.setState({ formErrors, [name]: value });
};

handleSubmit = e => {
  e.preventDefault();

  const {username, email, password} = this.state;

  const user = {
    username,
    email,
    password
  }

  this.props.signup(user)
}

  render() {
    const {formErrors, redirect} = this.state;
    // if(redirect) {
    //   return <Redirect to='/loading' />
    // }
    // console.log(this.state.redirect)
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <h2>SignIn</h2>
        {this.state.msg ? <Alert variant="danger">{this.state.msg}</Alert> : null}
          <div className="email">
            <label htmlFor="username">Name: </label>
            <input
              type="text"
              name="username"
              placeholder="Name"
              className="email"
              onChange={this.handleChange}
            />
          </div>
          {formErrors.username.length > 0 && (
            <span className="errorMessage">{formErrors.username}</span>
          )}

          <div className="email">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="email"
              onChange={this.handleChange}
            />
          </div>
          {formErrors.email.length > 0 && (
            <span className="errorMessage">{formErrors.email}</span>
          )}

          <div className="password">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="password"
              onChange={this.handleChange}
            />
          </div>
          {formErrors.password.length > 0 && (
            <span className="errorMessage">{formErrors.password}</span>
          )}

          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

export default connect(mapStateToProps, {signup, clearErrors})(Signup);
