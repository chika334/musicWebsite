import React, { Component } from 'react';
import '../css/upload.css';
import {Audio} from '../action/audioAction';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {Row, Col} from 'reactstrap';
import {Comment} from 'antd';
import DeleteAudio from '../component/DeleteAudio';

export class MusicUpload extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      audio: '',
      file: '',
      audios: '',
      tableAudio: []
    }
  }

  static propTypes = {
    Audio: PropTypes.func.isRequired,
    audio: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  } 

  // handle change for single click
  handleChange = e => {
    const blob = new Blob([e.target.files[0]])
    const blobUrl = URL.createObjectURL(blob)
    const name = e.target.files[0].name
    const type = e.target.files[0].type
    this.setState({
      audio: blobUrl
    })

    var newFile = new File([blobUrl], { name }, { type }, { lastModified: 1534584790000 });
    this.setState({
      file: e.target.files[0]
    });
  }

  // handle click for single upload 
  handleClick = e => {
    e.preventDefault();
    const { file } = this.state
    if (file !== "") {
      this.setState({ redirect: true });
    }

    let formData = new FormData();
    formData.append("file", file);
    this.setState({
      tableAudio: formData
    })

    // sending user to backend
    this.props.Audio(formData)
  }

  render() {
    const {isLoaded, audio} = this.props.audio
    const {user, isAuthenticated} = this.props.auth

    // admin user
    const admin = (
      <>
      <Col sm={6} className="file-upload">
      <h3 className="h3">Single Upload</h3>
        <div className="bord">
          <input type="file" name="audio" className="inputfile" onChange={this.handleChange} />
          <button className="Profilepics" onClick={this.handleClick}>Upload</button>
        </div>
      </Col>
      </>
    )

    // guest user
    const guest = this.props && this.props.audio.audio !== null ?
      audio.map((a, index) => 
        {
          return (
            <div key={index} className="file-upload">
              <h5>{a.originalname}</h5>
              <audio id="audio" controls preload="auto" src={`http://localhost:8000/${a.path}`} type="audio/mpeg" /> 
              <DeleteAudio />
            </div>
          )
        }
      )
      : null

    return (
      <>
      <Row>
        {
          isAuthenticated && user.role == 1 ? admin : null
        }
        {
          isLoaded === true ?
          (guest)
          : null
        }
     </Row>
      </>
    );
  }
}

const mapStateToProps = state => ({
  audio: state.audio,
  auth: state.auth
})

export default connect(mapStateToProps, {Audio})(MusicUpload)
