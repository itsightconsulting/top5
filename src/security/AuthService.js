const jwt = require('jsonwebtoken');
const secret = process.env.jwtsecret || 's3cr3t'; //Never set up in static files as it but process.env.secret
<<<<<<< HEAD
<<<<<<< HEAD
const _expiresIn = '7d';// 60 * 60 * 1; //expires in 1 hours
=======
const _expiresIn = '20d';// 60 * 60 * 1; //expires in 1 hours
>>>>>>> 9146d82c96a3be7f6058b84a736c299879787d42
// const _expiresIn = '20d';
=======
// const _expiresIn = '7d';// 60 * 60 * 1; //expires in 1 hours
const _expiresIn = '90d';
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840

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
<<<<<<< HEAD
        if (process.env.NODE_ENV == "production" || process.env.NODE_ENV == "test") {
=======
        if (process.env.NODE_ENV == "production") {
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
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
<<<<<<< HEAD
        } else if (process.env.NODE_ENV == "development") {
=======
        } else {
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
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

