// Importamos la query de likesQueries.js.
const likesQueries = require('../../db/noticesQueries/likesQueries');

// Creamos la funcion de likes.
const likes = async (req, res, next) => {
    try {
        // Obtenemos el id de la noticia y el id del usuario.
        const { idNotice } = req.params;

        const { idUser } = req;

        const { vote } = req.body;

        // Comprobamos que los valores esten correctos antes de la llamada a la query.
        if (vote !== true && vote !== false && vote !== null) {
            res.send({
                status: 'Error',
                message: 'El valor del like no es correcto.',
            });
        } else {
            // Llamamos a la funcion likeQueries.
            await likesQueries(idNotice, idUser, vote);

            // Condición que arroja mensaje de estatus like.
            if (vote === true) {
                res.send({ status: 'ok', mensage: 'like añadido' });
            } else if (vote === false) {
                res.send({ status: 'ok', mensage: 'dislike añadido' });
            } else if (vote === null) {
                res.send({ status: 'ok', mensage: 'voto eliminado' });
            }
        }
    } catch (err) {
        next(err);
    }
};

// Exportamos la funcion de likes.
module.exports = likes;
