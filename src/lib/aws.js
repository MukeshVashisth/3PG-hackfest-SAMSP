/* eslint-disable */
import AWS from 'aws-sdk'
import credentials from './credentials'

AWS.config.update({
  region: 'ap-northeast-1',
  credentials
})

const bucketName = 'facerecognitionbuckethackfest3pg'

export function uploadImageToAws({ imageSrc, mobileNumber, name, diagnosis }) {
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
    }
  })
}


export function searchByImage({ imageSrc }) {
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
      if (data.FaceMatches[0]) {
        const dynamoParams = {
          TableName: 'facerecognitionuser',
          Key: {
            'RekognitionId': data.FaceMatches[0].Face.FaceId
          },
        }
        window.console.log(dynamoParams, imageSrc);
        new AWS.DynamoDB.DocumentClient().get(dynamoParams, function (err, data) {
          if (err) {
            window.console.log(err)
          } else {
            window .console.log(data)
          }
        })
      } else {
        window.console.log('No face found!!!!')
      }
    }
  })
}
