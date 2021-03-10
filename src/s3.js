import config from './config'
import S3 from 'react-aws-s3'

const bucketName = config.bucket.AWS_BUCKET_NAME
const region = config.bucket.AWS_BUCKET_REGION
const accessKeyId = config.bucket.AWS_BUCKET_ACCESS_KEY
const secretAccessKey = config.bucket.AWS_BUCKET_SECRET_KEY

const s3Config = {
  bucketName: bucketName,
  region: region,
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey
}

const ReactS3Client = new S3(s3Config)

export function upload(file) {
  let fileName = file.name

  ReactS3Client.uploadFile(file, fileName)
    .then(data => console.log(data))
    .catch(err => console.log(err))
}