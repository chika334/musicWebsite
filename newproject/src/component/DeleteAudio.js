import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export class DeleteAudio extends Component {
  handleClick = e => {
    e.preventDefault();
    alert("Good")
  }
  render() {
    return (
      <div>
        <Link to="#" onClick={this.handleClick}><h6>Delete Music</h6></Link>
      </div>
    )
  }
}

export default DeleteAudio
