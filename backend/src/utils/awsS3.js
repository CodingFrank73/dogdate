const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const uuid = require("uuid").v4;
const path = require("path");

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new aws.S3({
    apiVersion: '2006-03-01',
    region,
    accessKeyId,
    secretAccessKey
});

const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'cf73-test-upload',
        acl: 'public-read',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, `${uuid()}${ext}`);
        }
    }),
});

module.exports = {
    upload
}