const jwt = require('jsonwebtoken');
const secret = process.env.jwtsecret || 's3cr3t'; //Never set up in static files as it but process.env.secret
// const _expiresIn = '7d';// 60 * 60 * 1; //expires in 1 hours
const _expiresIn = '90d';

async function generateToken(_data) {
    let tokenData = _data
    const token = await jwt.sign(tokenData, secret, { expiresIn: _expiresIn });
    return token;
}

async function obtenerTokenDecoded(token) {
    const decoded = await jwt.verify(token, secret);
    return decoded;
}

async function existeToken(req, res, next) {
    try {
        if (process.env.NODE_ENV == "production" || process.env.NODE_ENV == "test") {
            var authorization = req.headers['authorization']
            if (!authorization) {
                throw new Error("Es necesario el token de autenticación");
            }

            let token = authorization.split(' ')[1];//Because Authorization is equals to a string like 'Bearer [jwt]'
            const decoded = await jwt.verify(token, secret);
            if (!decoded) {
                throw new Error("Token inválido");
            } else {
                next();
            }
        } else if (process.env.NODE_ENV == "development") {
            next();
        }

    } catch (error) {
        return res.status(401).send({ ok: false, message: error.message, data: null, token: null })
    }
}
module.exports = {
    generateToken,
    existeToken,
    obtenerTokenDecoded
}

