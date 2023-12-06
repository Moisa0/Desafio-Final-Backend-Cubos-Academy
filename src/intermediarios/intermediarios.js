import { mensagemJson } from '../servicos/servico.js'
import jwt from 'jsonwebtoken'
import { knex } from '../conexao/conexao.js'

export const validarCampos = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body)
        next()
    } catch (error) {
        return mensagemJson(400, res, error.message)
    }
}

export const autenticarToken = async (req, res, next) => {
    const { authorization } = req.headers

    if(!authorization) return mensagemJson(401, res, 'Não autorizado.')

    const token = authorization.split(' ')[1]
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY)

        const usuario = await knex('usuarios').where({ id })

        if(usuario.length < 1) return mensagemJson(401, res, 'Não autorizado')

        req.usuario = usuario[0]

        next()
    } catch (error) {
        return mensagemJson(401, res, 'Não autorizado.')
    }
}