// importamos la query de likesQueries.js
const likesQueries = require('../../db/noticesQueries/likesQueries');

//Creamos la funcion de likes
const likes = async (req, res, next) => {
    try {
        //obtenemos el id de la noticia y el id del usuario
        const { idNotice } = req.params;

        const { idUser } = req;

        const { vote } = req.body;

        //llamamos a la funcion likeQueries
        await likesQueries(idNotice, idUser, vote);
        res.send({ status: 'ok', mensage: 'like añadido' });
    } catch (err) {
        next(err);
    }
};

//exportamos la funcion de likes
module.exports = likes;
