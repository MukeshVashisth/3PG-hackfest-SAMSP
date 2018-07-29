/* eslint-disable */
import axios from 'axios'
import { MATCH_IMAGE_1, MATCH_IMAGE_2, MATCH_IMAGE_0, UPLOAD_SUCCESSFULL } from '../types'
import AWS from 'aws-sdk'
import credentials from '../../lib/credentials'

AWS.config.update({
  region: 'ap-northeast-1',
  credentials
})

const bucketName = 'facerecognitionbuckethackfest3pg'

export const uploadImageToAws = ({ imageSrc, mobileNumber, name, diagnosis }) => dispatch => new Promise(function(resolve, reject) {
  const keyName = `${mobileNumber}.jpeg`
  const buf = new Buffer(imageSrc.replace(/^data:image\/\w+;base64,/, ''),'base64')
  const objectParams = {
    Bucket: bucketName,
    Key: keyName,
    Body: buf,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg',
    Metadata: {
      fullname: name,
      diagnosis
    }
  }
  new AWS.S3({params: {Bucket: bucketName}}).putObject(objectParams, function(err, data) {
    if (err) {
      window.console.log(err)
      window.console.log('Error uploading data: ', data)
    } else {
      window.console.log('succesfully uploaded the image!')
      dispatch({
        type: UPLOAD_SUCCESSFULL,
        payload: true
      })
    }
  })
});

export const searchByImage = ({ imageSrc }) => dispatch => new Promise(function(resolve, reject) {
  const rekognition = new AWS.Rekognition()
  const buf = new Buffer(imageSrc.replace(/^data:image\/\w+;base64,/, ''),'base64')
  const params = {
    CollectionId: 'facerecognitioncollection3pg',
    FaceMatchThreshold: 90,
    Image: {
      Bytes: buf
    },
    MaxFaces: 3
  }
  rekognition.searchFacesByImage(params, function(err, data) {
    if (err) window.console.log(err, err.stack)
    else {
      if (data.FaceMatches.length > 0) {
        data.FaceMatches.map((item, index) => {
          if (index < 3) {
            const dynamoParams = {
              TableName: 'facerecognitionuser',
              Key: {
                'RekognitionId': item.Face.FaceId
              },
            }
            new AWS.DynamoDB.DocumentClient().get(dynamoParams, function (err, data) {
              if (err) {
                window.console.log(err)
              } else {
                window .console.log(data)
                const result = data.Item.FullName.split(',')
                dispatch({
                  type: `MATCH_IMAGE_${index}`,
                  payload: {
                    result,
                    image: `https://s3-ap-northeast-1.amazonaws.com/facerecognitionbuckethackfest3pg/${[result[2]]}`
                  }
                })
                return data
              }
            })
          }
        })
      } else {
        window.console.log('No face found!!!!')
      }
    }
  })
})
