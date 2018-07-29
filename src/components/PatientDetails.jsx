import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class PatientDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: 0,
      patients: [0,1,2],
      currentPatient: 0
    }
    this.renderSelectedPatient = this.renderSelectedPatient.bind(this)
    this.renderOtherPatient = this.renderOtherPatient.bind(this)
  }

  renderSelectedPatient() {
    let patient
    switch (this.state.patients[0]) {
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

  renderOtherPatient({ patient }) {
    let data, index
    switch (patient) {
    case 0:
      data = this.props.patient_0
      index = this.state.patients[0]
      break
    case 1:
      data = this.props.patient_1
      index = this.state.patients[1]
      break
    case 2:
      data = this.props.patient_2
      index = this.state.patients[2]
      break
    }
    return <li onClick={() => this.switchPatients({ index })}><img className='medium' src={data.image}/></li>
  }

  switchPatients({ index }) {
    const patients = this.state.patients
    const b = patients[0]
    patients[0] = patients[index]
    patients[index] = b
    this.setState({ patients })
  }

  render() {
    return (
      <div className='col-right'>
        <h2 className='primary-heading'>User Details</h2>
        <div className='user-info'>
          {this.renderSelectedPatient()}

          <div className='other-matches'>
            <h4>Other Matches:</h4>
            <ul>
              {this.renderOtherPatient({ patient: this.state.patients[1] })}
              {this.renderOtherPatient({ patient: this.state.patients[2] })}
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
