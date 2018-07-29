import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import CameraView from '../components/CameraView'
import Button from '../components/Button'
import PatientDetails from '../components/PatientDetails'
// import { matchImage } from '../state/actions/faceDetection'
import { uploadImageToAws, searchByImage } from '../lib/aws'

class AppContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      captured: false,
      imageSrc: '',
      mobileNumber: '',
      fullname: '',
      diagnosis: ''
    }

    this.handleCapture = this.handleCapture.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
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
    searchByImage({ imageSrc: this.state.imageSrc })
    this.props.handleSidebarStatus()
  }

  handleRegister() {
    const imageSrc = this.webcam.getScreenshot()
    this.setState({
      captured: true
    })
    uploadImageToAws({
      name: this.state.fullname,
      mobileNumber: this.state.mobileNumber,
      imageSrc: imageSrc,
      diagnosis: this.state.diagnosis
    })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <div className='camera-container'>
        <div className='camera-view'>
          <CameraView
            setRef={this.setRef}
            screenshotFormat='image/jpeg'
          />
          <Button handleClick={this.handleCapture} title='Search' cssClass='btn-default'/>

          <div className='registration-form'>
            <Button handleClick={this.handleRegister} cssClass='btn-secondary' title='Register'/>
            <dl>
              <dt>Name:</dt>
              <dd>
                <input
                  type='text'
                  value={this.state.fullname}
                  name='fullname'
                  onChange={this.handleChange}
                />
              </dd>

              <dt>Mobile Number:</dt>
              <dd>
                <input
                  type='text'
                  value={this.state.mobileNumber}
                  name='mobileNumber'
                  onChange={this.handleChange}
                />
              </dd>

              <dt>Diagnosis:</dt>
              <dd>
                <input
                  type='text'
                  value={this.state.diagnosis}
                  name='diagnosis'
                  onChange={this.handleChange}
                />
              </dd>
            </dl>
          </div>
        </div>
      </div>
    )
  }
}

AppContainer.propTypes = {
  matchImage: PropTypes.func,
  handleSidebarStatus: PropTypes.func
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
