/* eslint-disable */
import axios from 'axios'
import { MATCH_IMAGE } from '../types'

export const matchImage = () => dispatch => new Promise((resolve, reject) => {
  axios.get('https://jsonplaceholder.typicode.com/posts/1')
    .then(function (response) {
      if (response.status === 200) {
        dispatch({
          type: MATCH_IMAGE,
          payload: response.data
        })
        return resolve(response.status)
      }
    })
    .catch(function (error) {
      return reject(error)
    })
})
