import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class PatientDetails extends Component {
  constructor(props) {
    super(props)

    this.renderSelectedPatient = this.renderSelectedPatient.bind(this)
  }

  renderSelectedPatient({ selectedIndex }) {
    let patient
    switch (selectedIndex) {
    case 0:
      patient = this.props.patient_0
      break
    case 1:
      patient = this.props.patient_1
      break
    case 2:
      patient = this.props.patient_2
      break
    }
    if (patient.result) {
      const {
        image,
        result
      } = patient
      return (
        <div>
          <figure className='profile-pic'>
            <img src={image} />
          </figure>

          <div className='user-details'>
            <dl>
              <dt>Name:</dt>
              <dd>{result[0]}</dd>

              <dt>Diagnosis:</dt>
              <dd>{result[1]}</dd>

              <dt>Mobile No.:</dt>
              <dd>{result[2].split('.')[0]}</dd>
            </dl>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className='col-right'>
        <h2 className='primary-heading'>User Details</h2>
        <div className='user-info'>
          {this.props.patient_0 ? this.renderSelectedPatient({ selectedIndex: 0 }) : null}

          <div className='other-matches'>
            <h4>Other Matches:</h4>
            <ul>
              <li><img className='higher' src='https://media.creativemornings.com/uploads/user/avatar/89900/Profile_picture_square.jpg'/></li>
              <li><img className='medium' src='http://www.sardiniauniqueproperties.com/wp-content/uploads/2015/10/square-profile-pic-2.jpg'/></li>
              <li><img className='lower' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj0J_rHEqNM0dcwxZw_7WAsW7twPtc6gKCqIVYoWnBlro7zYAg'/></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

PatientDetails.propTypes = {
  patient_0: PropTypes.object.isRequired,
  patient_1: PropTypes.object.isRequired,
  patient_2: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  window.console.log(state)
  return {
    patient_0: state.faceDetection.patient_0,
    patient_1: state.faceDetection.patient_1,
    patient_2: state.faceDetection.patient_2
  }
}

export default connect(mapStateToProps)(PatientDetails)
