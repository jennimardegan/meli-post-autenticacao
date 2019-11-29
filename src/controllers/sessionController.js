//controller responsável por fazer a validação da autenticação

const jwt = require('jsonwebtoken');//valida o token
const authConfig = require ('../config/auth');
const alunas = require("../model/alunas.json")

//Ao fazer este POST com o nome de uma aluna, o retorno é um token gerado.
//A cada post, mesmo que para a mesma pessoa, o token muda.
exports.getToken = (req, res) => {
    const { name } = req.body;
    const user = alunas.find(e => e.nome == name)

    if (!user) {
        return res.status(401).json({ error: 'user not found'});
    }

    const {id, nome} = user;

    try {
        return res.json({
            user: {
                id,
                nome,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),                    
        });
    } catch (e) {
        return res.status(401).json({ error: 'erro'});
    }
}