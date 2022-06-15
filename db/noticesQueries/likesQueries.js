// Conectamos con la base de datos y requerimos los modulos necesarios.

const getConnection = require('../getConnections');

// Creamos la funcion que añadira un like a una noticia.
const likesQueries = async (idNotice, idUser, vote) => {
    let connection;

    try {
        connection = await getConnection();

        //Seleccionamos la tabla de likes
        const [likes] = await connection.query(
            `SELECT vote FROM likes WHERE idNotice = ? AND idUser = ?`,
            [idNotice, idUser]
        );

        //Comprobamos si el usuario ya ha dado like
        if (likes.length > 0) {
            const error = new Error('Ya has dado like a esta noticia');
            error.status = 403;
            throw error;
        } else {
            //Si no ha dado like, añadimos un like
            await connection.query(
                `
            INSERT INTO likes (idNotice, idUser, vote) 
            VALUES (?, ?, ?)`,
                [idNotice, idUser, vote]
            );
        }
    } finally {
        if (connection) connection.release();
    }
};

//exportamos la funcion para poder usarla en otro fichero.
module.exports = likesQueries;
