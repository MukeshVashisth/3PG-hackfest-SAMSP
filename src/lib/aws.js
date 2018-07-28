import AWS from 'aws-sdk'
import AWS_CREDENTIALS from './aws_credentials'

AWS.config.update({region: 'us-west-1', credentials: {AWS_CREDENTIALS}})

const bucketName = 'facerecognitionbuckethackfest3pg'

export function uploadImageToAws({ imageSrc, mobileNumber, name }) {
  window.console.log(AWS_CREDENTIALS)
  const keyName = `${mobileNumber}.jpeg`
  const buf = new Buffer(imageSrc.replace(/^data:image\/\w+;base64,/, ''),'base64')
  const objectParams = {
    Bucket: bucketName,
    Key: keyName,
    Body: buf,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg',
    Metadata: {
      fullname: name
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
