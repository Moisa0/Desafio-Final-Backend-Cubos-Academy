import { msgJson } from '../servicos/servico.js'
import { msgError } from '../schema/schemas.js'
import { knex } from '../conexao/conexao.js'
import jwt from 'jsonwebtoken'

export const validarCampos = (schema, stringObj) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body)
        next()
    } catch (error) {
        const { details: [ { type, context: { key } } ] } = error
        return msgJson(400, res, msgError[type].replace('$', key))
    }
}

export const campoUnico = (tabela, campos, path, nameObj = 'idUnico') => async (req, res, next) => {
    try {
        const callbackWhere = (acc, campo) => acc + `${campo} = '${req[path][campo]}' OR `
        req['body']['email']
        req.body.eamil

        const whereString = campos
            .reduce(callbackWhere, '').slice(0, -3)
            .replace('categoria_id', 'id')

        const [ idExiste ] = await knex(tabela).select('*').whereRaw(whereString)

        if (idExiste) { 
            req[nameObj] = { 
                idObj: idExiste,
                campo: campos.find(campo => idExiste[campo] === req[path][campo])
            }
        }
        next()
    } catch (error) {
        console.log(error)
        msgJson(500, res, 'Erro interno no servidor no campo unico')
    }
}

export const autenticarToken = async (req, res, next) => {
    const { authorization } = req.headers
    if(!authorization) return msgJson(400, res, 'Informe o token.')

    const token = authorization.split(' ')[1]
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const [ idExiste ] = await knex('usuarios').where({ id })

        if(!idExiste) return msgJson(404, res, 'Usuario não encontrado')
        delete idExiste.senha
        
        req.usuarioLogado = { ...idExiste }
        next()
    } catch (error) {
        return msgJson(401, res, 'Não autorizado.')
    }
}