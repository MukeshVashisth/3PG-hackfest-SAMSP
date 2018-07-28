import AWS from 'aws-sdk'
import credentials from './credentials'

AWS.config.update({
  region: 'ap-northeast-1',
  credentials
})

const bucketName = 'facerecognitionbuckethackfest3pg'

export function uploadImageToAws({ imageSrc, mobileNumber, name, diagnosis }) {
  window.console.log('aws config' ,AWS.config)
  const keyName = `index/${mobileNumber}.jpeg`
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
      // S3Object: {
      //   Bucket: bucketName
      // }
    },
    MaxFaces: 3
  }

  rekognition.searchFacesByImage(params, function(err, data) {
    if (err) window.console.log(err, err.stack)
    else window.console.log(data)
    /*
    data = {
     FaceMatches: [
        {
       Face: {
        BoundingBox: {
         Height: 0.3234420120716095,
         Left: 0.3233329951763153,
         Top: 0.5,
         Width: 0.24222199618816376
        },
        Confidence: 99.99829864501953,
        FaceId: "38271d79-7bc2-5efb-b752-398a8d575b85",
        ImageId: "d5631190-d039-54e4-b267-abd22c8647c5"
       },
       Similarity: 99.97036743164062
      }
     ],
     SearchedFaceBoundingBox: {
      Height: 0.33481481671333313,
      Left: 0.31888890266418457,
      Top: 0.4933333396911621,
      Width: 0.25
     },
     SearchedFaceConfidence: 99.9991226196289
    }
    */
  })
}
