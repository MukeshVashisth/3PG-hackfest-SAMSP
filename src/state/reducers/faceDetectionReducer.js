import { MATCH_IMAGE } from '../types'

const defaultState = {
  faceDetectionResponse: ''
}

const faceDetectionReducer = (state = defaultState, action) => {
  switch (action.type) {
  case MATCH_IMAGE:
    return { ...state, faceDetectionResponse: action.payload }
  default:
    return state
  }
}

export default faceDetectionReducer
