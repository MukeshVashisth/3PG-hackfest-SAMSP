import { MATCH_IMAGE_1, MATCH_IMAGE_2, MATCH_IMAGE_0, UPLOAD_SUCCESSFULL } from '../types'

const defaultState = {
  faceDetectionResponse: [],
  uploaded: false,
  patient_1: {},
  patient_2: {},
  patient_0: {},
}

const faceDetectionReducer = (state = defaultState, action) => {
  switch (action.type) {
  case MATCH_IMAGE_1:
    return { ...state, patient_1: action.payload }
  case MATCH_IMAGE_2:
    return { ...state, patient_2: action.payload }
  case MATCH_IMAGE_0:
    return { ...state, patient_0: action.payload }
  case UPLOAD_SUCCESSFULL:
    return { ...state, uploaded: action.payload }
  default:
    return state
  }
}

export default faceDetectionReducer
