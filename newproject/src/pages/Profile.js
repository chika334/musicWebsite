import React, { Component } from 'react';
import MusicUpload from '../component/MusicUpload';
import DeleteAudio from '../component/DeleteAudio';
import {loadMusic} from '../action/audioAction';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import '../css/profile.css';

export class Profile extends Component {

  static propType = {
    auth: PropTypes.object.isRequired
  }
  componentDidMount() {
    this.props.dispatch(loadMusic());
  }

  render() {
    const {user, isAuthenticated} = this.props.auth
    return (
      <div className="container border-profile p-3">
        <h4 className="profileName">My Music</h4>
        <MusicUpload />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(Profile)
