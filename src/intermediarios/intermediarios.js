import { mensagemJson } from '../servicos/servico.js'
import { knex } from '../conexao/conexao.js'
import jwt from 'jsonwebtoken'

export const validarCampos = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body)
        next()
    } catch (error) {
        return mensagemJson(400, res, error)
    }
}

export const autenticarToken = async (req, res, next) => {
    const { authorization } = req.headers
    if(!authorization) return mensagemJson(401, res, 'Informe o token.')

    const token = authorization.split(' ')[1]
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const [ usuarioExiste ] = await knex('usuarios').where({ id })

        if(!usuarioExiste) return mensagemJson(401, res, 'Usuario não encontrado')
        
        delete usuarioExiste.senha
        req.usuarioLogado = { ...usuarioExiste }
        next()
    } catch (error) {
        console.log(error);
        return mensagemJson(401, res, 'Não autorizado.')
    }
}