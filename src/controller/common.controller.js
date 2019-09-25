import AWS from 'aws-sdk'; // Load the AWS SDK for Node.js
import fs from 'fs'; //File system
import { aws_config_s3 } from '../utilitarios/constants';
//Para que cuando el archivo sea subido al bucket este pueda ser accedido publicamente
const FILE_PERMISSION = 'public-read'

async function uploadToS3(filePath, bucketName, key) {
    try {
        let s3bucket = new AWS.S3({
            accessKeyId: aws_config_s3.ACCESS_KEY_ID,
            secretAccessKey: aws_config_s3.SECRET_ACCESS_KEY,
            Bucket: bucketName,
            ACL: FILE_PERMISSION
        });

        var params = { Bucket: bucketName, Key: key, Body: filePath.data };

        s3bucket.upload(params, function (err, data) {
            if (err) throw err;
            console.log(data);
            return data;
        });
    } catch (error) {
        console.log('uploadToS3 error:', error);
        throw error;
    }
}

async function downloadFromS3(bucketName, key) {
    try {
        let s3bucket = new AWS.S3({
            accessKeyId: aws_config_s3.ACCESS_KEY_ID,
            secretAccessKey: aws_config_s3.SECRET_ACCESS_KEY,
            Bucket: bucketName,
            ACL: FILE_PERMISSION
        });
        const params = { Bucket: bucketName, Key: key };
        s3bucket.getObject(params, (err, data) => {
            if (err) throw err;
            console.log(data);
            return data;
        });
    } catch (error) {
        console.log('downloadFromS3 error:', error);
        throw error;
    }
};

module.exports = {
    uploadToS3,
    downloadFromS3
}