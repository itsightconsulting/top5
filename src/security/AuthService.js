const jwt = require('jsonwebtoken');
const secret = 's3cr3t'; //Never set up in static files as it but process.env.secret
let _expiresIn = 60 * 60 * 1; //expires in 24 hours

async function generateToken(_data) {
    let tokenData = _data
    const token = await jwt.sign(tokenData, secret, { expiresIn: _expiresIn });
    return token;
}

async function existeToken(req, res, next) {
    var authorization = req.headers['authorization']
    if (!authorization) {
        return res.status(401).send({ ok: false, message: "Es necesario el token de autenticación", data: null, token: null })
    }

    let token = authorization.split(' ')[1];//Because Authorization is equals to a string like 'Bearer [jwt]'
    console.log("existeToken", token);
    jwt.verify(token, secret, function (err, user) {
        console.log("err", err);
        if (err) {
            return res.status(401).send({ ok: false, message: "Token inválido", data: null, token: null })
        } else {
            next();
        }
    })
}
module.exports = {
    generateToken,
    existeToken
}

