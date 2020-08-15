import React, { Component } from 'react';
// import images from '../images/images.jpeg';
// import side from '../images/side.png';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signin } from '../action/userAction';
import { Alert } from 'react-bootstrap';
import { clearErrors } from '../action/errorActions';
import { Redirect } from 'react-router-dom'

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      msg: null,
      redirect: false,
      formErrors: {
        email: "",
        password: ""
      },
      setFormErrorMessage: ""
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    signin: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg })
      } else {
        this.setState({ msg: null })
      }
    }

    // if authenticated redirect
    if (isAuthenticated) {
      this.setState({ redirect: true });
      this.SendRedirect();
    }
  }

  SendRedirect = () => {
    this.props.clearErrors()
  }

  handleSubmit(e) {
    e.preventDefault();

    const { email, password } = this.state;

    const user = {
      email,
      password
    }

    // Attempt to login
    this.props.signin(user)
  }

  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
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

  render() {
    const { formErrors } = this.state;
    if (this.state.redirect) {
      return <Redirect to='/loading' />
    }
    return (
      <>
        <div className="column">
          <div className="wrapper">
            <div className="form-wrappers">
            <form onSubmit={this.handleSubmit}>
              <h2>SignIn</h2>
              {this.state.msg ? <Alert variant="danger">{this.state.msg}</Alert> : null}
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
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

export default connect(mapStateToProps, { signin, clearErrors })(Signin);