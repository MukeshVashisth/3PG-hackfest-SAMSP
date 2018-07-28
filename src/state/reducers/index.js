import { combineReducers } from 'redux'

import user from './userReducer'
import faceDetection from './faceDetectionReducer'

const rootReducer = combineReducers(
  {
    user,
    faceDetection
  }
)

export default rootReducer
