import React, { Component } from 'react'
import CameraView from '../components/CameraView'
import CaptureButton from '../components/CameraButton'

class AppContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      captured: false,
      imageSrc: ''
    }

    this.handleCapture = this.handleCapture.bind(this)
    this.setRef = this.setRef.bind(this)
  }

  setRef(webcam) {
    this.webcam = webcam
  }

  handleCapture() {
    const imageSrc = this.webcam.getScreenshot()
    window.console.log(imageSrc)
    this.setState({
      captured: true,
      imageSrc
    })
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
        </div>
        <div className='label'>Don't Blink</div>
      </div>
    )
  }
}

export default AppContainer
