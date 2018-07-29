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
  window.console.log(objectParams)
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
    FaceMatchThreshold: 95,
    Image: {
      Bytes: buf
    },
    MaxFaces: 3
  }

  rekognition.searchFacesByImage(params, function(err, data) {
    if (err) window.console.log(err, err.stack)
    else {
      window.console.log(data)
      const dynamoParams = {
        TableName: 'facerecognitionuser',
        Key: {
          RekognitionId: data.Face[0].FaceId
        }
      }
      new AWA.DynamoDB().get(dynamoParams, function (err, data) {
        if (err) {
          window.console.log(err)
        } else {
          window .console.log(data)
        }
      })
    }
  })
}
