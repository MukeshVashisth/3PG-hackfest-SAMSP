import React from 'react'
import PropTypes from 'prop-types'

export default function CaptureButton({ handleCapture }) {
  return (
    <button onClick={handleCapture}>
      <span>Capture</span>
    </button>
  )
}

CaptureButton.propTypes = {
  handleCapture: PropTypes.func.isRequired
}
