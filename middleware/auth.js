const jwt = require('jsonwebtoken');
const authConfig = require('../controller/config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).send({error: 'Token nao foi providenciado'});
    }

    const parts = authHeader.split(' '); // verifica se o token esta no formato 'Bearer <token>'
    if(parts.length !== 2){
        return res.status(401).send({error: 'Erro no formato do token'});
    }

    const [scheme, token] = parts;
    if(!/^Bearer$/i.test(scheme)){ // verifica se scheme tem a palavra Bearer escrita
        return res.status(401).send({error: 'Formato do token incorreto'});
    }

    jwt.verify(token, authConfig.secret, (err,decoded) => {
        if(err) return res.status(401).send({error: 'Token invalido'});

        res.userId = decoded._id;
        return next();
    })
};