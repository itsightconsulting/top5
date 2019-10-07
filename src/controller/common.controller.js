import AWS from 'aws-sdk'; // Load the AWS SDK for Node.js
import fs from 'fs'; //File system
const Cryptr = require('cryptr');
import { aws_config_s3, SECRET_KEY_ENCRYPT } from '../utilitarios/constants';
import { obtenerParametro } from '../controller/parametro.controller';
//Para que cuando el archivo sea subido al bucket este pueda ser accedido publicamente
const FILE_PERMISSION = 'public-read'

async function emptyS3Directory(bucket, dir) {
    const listParams = {
        Bucket: bucket,
        Prefix: dir
    };

    const listedObjects = await s3.listObjectsV2(listParams).promise();

    if (listedObjects.Contents.length === 0) return;

    const deleteParams = {
        Bucket: bucket,
        Delete: { Objects: [] }
    };

    listedObjects.Contents.forEach(({ Key }) => {
        deleteParams.Delete.Objects.push({ Key });
    });

    await s3.deleteObjects(deleteParams).promise();

    if (listedObjects.IsTruncated) await emptyS3Directory(bucket, dir);
}

async function uploadToS3(filePath, bucketName, key) {
    try {
        let paramKeyId = await obtenerParametro(aws_config_s3.ACCESS_KEY_ID);
        let paramACCESS_KEY = await obtenerParametro(aws_config_s3.SECRET_ACCESS_KEY)
        if (!paramKeyId || !paramACCESS_KEY) throw new Error(`parámetro ${aws_config_s3.ACCESS_KEY_ID} y/ó ${aws_config_s3.SECRET_ACCESS_KEY} no existen`);
        let accessKeyId = await decryptedAES256ctr(paramKeyId.Valor);
        let secretAccessKey = await decryptedAES256ctr(paramACCESS_KEY.Valor);
        let s3bucket = new AWS.S3({
            accessKeyId,
            secretAccessKey,
            Bucket: bucketName,
            ACL: FILE_PERMISSION
        });

        var params = {
            Bucket: bucketName, Key: key, Body: filePath.data,
            ACL: FILE_PERMISSION
        };
        // s3bucket.upload(params, function (err, data) {
        //     if (err) throw err;
        //     console.log(data);
        //     return data;
        // });
        const s3Response = await s3bucket.upload(params).promise();
        // console.log(s3Response);
        return s3Response;
    } catch (error) {
        console.log('uploadToS3 error:', error);
        throw error;
    }
}

async function downloadFromS3(bucketName, key) {
    try {
        let paramKeyId = obtenerParametro(aws_config_s3.ACCESS_KEY_ID);
        let accessKeyId = await decryptedAES256ctr(paramKeyId.Valor);
        let paramACCESS_KEY = obtenerParametro(aws_config_s3.SECRET_ACCESS_KEY)
        let secretAccessKey = await decryptedAES256ctr(paramACCESS_KEY.Valor);

        let s3bucket = new AWS.S3({
            accessKeyId,
            secretAccessKey,
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

async function encryptAES256ctr(texto) {
    const cryptr = new Cryptr(SECRET_KEY_ENCRYPT);
    if (texto) {
        let encryptedString = cryptr.encrypt(texto);
        return encryptedString;
    }
    throw new Error(`encryptAES256ctr(error): param no cumple condiciones. valor = ${texto}`);
}
async function decryptedAES256ctr(texto) {
    const cryptr = new Cryptr(SECRET_KEY_ENCRYPT);
    if (texto) {
        let decryptedString = cryptr.decrypt(texto);
        return decryptedString;
    }
    throw new Error(`decryptedAES256ctr(error): param no cumple condiciones. valor = ${texto}`);
}
function existeJsonData(req, res) {
    let { data } = req.body;
    if (!data) {
        throw new Error('Cuerpo JSON "data" no esta definido.');
    }
}
function buildContainer(ok, message, data, token) {
    let dataJSON = {
        ok,
        message,
        data,
        token
    }
    return dataJSON;
}

module.exports = {
    uploadToS3,
    downloadFromS3,
    encryptAES256ctr,
    decryptedAES256ctr,
    buildContainer,
    existeJsonData
}