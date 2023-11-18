require("dotenv").config();
const AWS = require('aws-sdk');
// const fs = require('fs');

// Set your AWS credentials and region
AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_ACCESS_KEY_SECRET,
  region: process.env.S3_BUCKET_REGION,
});

// Create an S3 instance
const s3 = new AWS.S3();
console.log(s3, {
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_ACCESS_KEY_SECRET,
  region: process.env.S3_BUCKET_REGION,
}, 's3 ===============')

// Specify the S3 bucket name and desired file name in the bucket
// const bucketName = "yogzan-dev";
// const fileName = 'uploaded-image.jpg'; // Desired file name in S3

// Specify the local path to the image you want to upload
// const localImagePath = '/path/to/your/image.jpg';

// Read the image file
// const fileStream = fs.createReadStream(localImagePath);

// Set the parameters for S3 upload
// const uploadParams = {
//   Bucket: bucketName,
//   Key: fileName,
//   Body: fileStream,
//   ACL: 'public-read', // Set the ACL (Access Control List) as needed
// };

// Upload the image to S3
// s3.upload(uploadParams, (err, data) => {
//   if (err) {
//     console.error('Error uploading image:', err);
//   } else {
//     console.log('Image uploaded successfully. S3 URL:', data.Location);
//   }
// });

module.exports = { s3 }