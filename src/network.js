import axios from 'axios'

import { upload } from './s3'

// const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })

export async function createPost({data}) {
  try {
    console.log(data.imageFile.files[0].path)
    if(data.imageFile) {
      upload(data.imageFile.files[0])
    }
    
    // upload.single('image')
    // const result = await axios.post(`/api/posts`, {
    //   ...data
    // }, { headers: authHeader })
  } catch (error) {
    console.log(error)
  }
}