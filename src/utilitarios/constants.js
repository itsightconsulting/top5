const ACCESS_KEY_ID = "AWS_ACCESS_KEY_ID";
const SECRET_ACCESS_KEY = "AWS_SECRET_ACCESS_KEY";
const aws_config_s3 = { ACCESS_KEY_ID, SECRET_ACCESS_KEY };
const SECRET_KEY_JWT = process.env.jwtsecret || "dev_s3cr3t";
const SECRET_KEY_ENCRYPT = process.env.cryptsecret || "dev_s3cr3t";
module.exports = {
    aws_config_s3,
    SECRET_KEY_JWT,
    SECRET_KEY_ENCRYPT
}