import AWS from 'aws-sdk'
import credentials from './credentials'

// const myCredentials = new AWS.CognitoIdentityCredentials({IdentityPoolId:'IDENTITY_POOL_ID'})
// let myConfig = new AWS.Config({
//   credentials: myCredentials, region: 'us-west-2'
// })
//
// myConfig = new AWS.Config()
// myConfig.update({region: 'us-east-1'})

AWS.config.update({
  region: 'ap-east-1',
  credentials
})

const bucketName = 'kailashbucket'

export function uploadImageToAws({ imageSrc, mobileNumber, name }) {
  window.console.log('aws config' ,AWS.config)
  const keyName = `${mobileNumber}.jpeg`
  const buf = new Buffer(imageSrc.replace(/^data:image\/\w+;base64,/, ''),'base64')
  const objectParams = {
    Bucket: bucketName,
    Key: keyName,
    Body: buf,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg'
    // Metadata: {
    //   fullname: name
    // }
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
