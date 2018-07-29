import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import CameraView from '../components/CameraView'
import Button from '../components/Button'
import { uploadImageToAws, searchByImage } from '../state/actions/faceDetection'

class ModelWindow extends React.Component {
  render() {
    const { message, handleClick } = this.props
    return (
      <React.Fragment>
        <div className='model-window'>
          <div className='model-body'>
            {message}
          </div>
          <button className='btn-popup' onClick={handleClick} >Okay</button>
        </div>
        <div className='overlay' />
      </React.Fragment>
    )
  }
}

ModelWindow.propTypes = {
  message: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
}

class AppContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      captured: false,
      imageSrc: '',
      mobileNumber: '',
      fullname: '',
      diagnosis: '',
      fullnameValidate: false,
      mobileNumberValidate: false,
      diagnosisValidate: false,
      isModelWindow: false
    }

    this.handleCapture = this.handleCapture.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.setRef = this.setRef.bind(this)
    this.closePopup = this.closePopup.bind(this)
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
    this.props.searchByImage({ imageSrc })
    this.props.handleSidebarStatus()
  }

  handleRegister() {
    this.setState({
      captured: true
    })
    this.formValidation()
  }

  formValidation() {
    const {
      fullname,
      mobileNumber,
      diagnosis
    } = this.state

    this.setState({
      fullnameValidate: fullname == '' ? true : false,
      mobileNumberValidate: mobileNumber == '' ? true : false,
      diagnosisValidate: diagnosis == '' ? true : false
    })

    if (!fullname || !mobileNumber || !diagnosis) {
      this.setState({ isModelWindow: true })
    } else {
      const imageSrc = this.webcam.getScreenshot()
      this.props.uploadImageToAws({
        name: this.state.fullname,
        mobileNumber: this.state.mobileNumber,
        imageSrc,
        diagnosis: this.state.diagnosis
      })
      this.clearForm()
    }
  }

  clearForm() {
    this.setState({
      imageSrc: '',
      mobileNumber: '',
      fullname: '',
      diagnosis: ''
    })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  closePopup() {
    this.setState({
      isModelWindow: false
    })
  }

  render() {
    return (
      <div className='camera-container'>
        {this.state.isModelWindow && <ModelWindow handleClick={this.closePopup} message='Please fill all the form details to register an user.' />}
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
                  className={this.state.fullnameValidate ? 'error' : ''}
                />
              </dd>

              <dt>Mobile Number:</dt>
              <dd>
                <input
                  type='text'
                  value={this.state.mobileNumber}
                  name='mobileNumber'
                  onChange={this.handleChange}
                  className={this.state.mobileNumberValidate ? 'error' : ''}
                />
              </dd>

              <dt>Diagnosis:</dt>
              <dd>
                <input
                  type='text'
                  value={this.state.diagnosis}
                  name='diagnosis'
                  onChange={this.handleChange}
                  className={this.state.diagnosisValidate ? 'error' : ''}
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
  uploadImageToAws: PropTypes.func,
  searchByImage: PropTypes.func,
  handleSidebarStatus: PropTypes.func
}

function mapStateToProps(state) {
  return {
    faceDetectionResponse: state.faceDetection.faceDetectionResponse
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    uploadImageToAws,
    searchByImage
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
