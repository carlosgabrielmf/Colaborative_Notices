const jwt = require('jsonwebtoken');

const { generateError } = require('../helpers');

const userAuth = (req, res, next) => {
    try {
        //Obtenemos el token en la cabecera
        const { authorization } = req.headers;

        //Si no existe el token lanzamos error
        if (!authorization) {
            throw generateError('Falta token', 401);
        }

        //Variable que almacenara inf de token
        let token;

        try {
            //Intentamos obtener inf de token
            token = jwt.verify(authorization, process.env.SECRET);
        } catch {
            throw generateError('Token incorrecto', 401);
        }

        //Agregamos a la request
        req.idUser = token.id;

        //Saltamos al siguiente controlador
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = userAuth;
