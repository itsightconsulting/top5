const jwt = require('jsonwebtoken');
const secret = 's3cr3t'; //Never set up in static files as it but process.env.secret
let _expiresIn = 15;// 60 * 60 * 24 expires in 24 hours

async function generateToken(_data){
    let tokenData = _data 
    const token = await jwt.sign(tokenData, secret, {expiresIn: _expiresIn});
    return token;
}

async function existeToken(token){
    let arrToken= [];
    if(!token) return arrToken;
    
    token = authorization.split(' ')[1];//Because Authorization is equals to a string like 'Bearer [jwt]'
    arrToken = await jwt.verify(token,secret);
    return arrToken;
}

module.exports = {
    generateToken,
    existeToken
}

