import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import CameraView from '../components/CameraView'
import CaptureButton from '../components/CameraButton'
// import { matchImage } from '../state/actions/faceDetection'
import { searchByImage } from '../lib/aws'

class AppContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      captured: false,
      imageSrc: '',
      mobileNumber: '',
      fullname: ''
    }

    this.handleCapture = this.handleCapture.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.setRef = this.setRef.bind(this)
  }

  setRef(webcam) {
    this.webcam = webcam
  }

  handleCapture() {
    const imageSrc = this.webcam.getScreenshot()
    this.setState({
      captured: true,
      imageSrc
    })
    // this.props.matchImage()
    // uploadImageToAws({ name: this.state.fullname, mobileNumber: this.state.mobileNumber, imageSrc: this.state.imageSrc })
    searchByImage({ imageSrc: this.state.imageSrc })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <div className='camera-container'>
        <h2>LOOK AT ME</h2>
        <div className='camera-view'>
          <CameraView
            setRef={this.setRef}
            screenshotFormat='image/jpeg'
          />
          <CaptureButton handleCapture={this.handleCapture}/>
          mobile number
          <input
            value={this.state.mobileNumber}
            name='mobileNumber'
            onChange={this.handleChange}
          />
          name
          <input
            value={this.state.fullname}
            name='fullname'
            onChange={this.handleChange}
          />
        </div>
        <div className='label'>Don't Blink</div>
      </div>
    )
  }
}

AppContainer.propTypes = {
  matchImage: PropTypes.func
}

function mapStateToProps(state) {
  return {
    faceDetectionResponse: state.faceDetection.faceDetectionResponse
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({
//     matchImage
//   }, dispatch)
// }

export default connect(mapStateToProps)(AppContainer)
