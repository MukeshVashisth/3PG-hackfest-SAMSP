import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './state/reducers/index'

export default createStore(
  rootReducer,
  applyMiddleware(logger, thunk)
)
