import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Webcam from 'react-webcam'

class CameraView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      captured: false
    }
  }

  render() {
    const { setRef, screenshotFormat } = this.props
    return (
      <Webcam
        width='100%'
        height='100%'
        ref={setRef}
        screenshotFormat={screenshotFormat}
      />
    )
  }
}

CameraView.propTypes = {
  setRef: PropTypes.func.isRequired,
  screenshotFormat: PropTypes.string.isRequired
}

export default CameraView
