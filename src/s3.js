import config from './config'
import S3 from 'react-aws-s3'

const s3Config = {
  bucketName: config.bucket.AWS_BUCKET_NAME,
  region: config.bucket.AWS_BUCKET_REGION,
  accessKeyId: config.bucket.AWS_BUCKET_ACCESS_KEY,
  secretAccessKey: config.bucket.AWS_BUCKET_SECRET_KEY
}

const ReactS3Client = new S3(s3Config)

export function upload(file) {
  let fileName = file.name

  return ReactS3Client.uploadFile(file, fileName)
    .then(data => {console.log(data); return data})
    .catch(err => console.log(err))
}