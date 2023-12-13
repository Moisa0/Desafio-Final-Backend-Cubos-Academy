import { mensagemJson } from '../servicos/servico.js'
import { msgError } from '../schema/schemas.js'
import { knex } from '../conexao/conexao.js'
import jwt from 'jsonwebtoken'

export const validarCampos = (schema, stringObj) => async (req, res, next) => {
    try {
        await schema.validateAsync(req[stringObj])
        next()
    } catch (error) {
        const { details: [ { type, context: { key } } ] } = error
        return mensagemJson(400, res, msgError[type].replace('$', key))
    }
}

export const campoUnico = (tabela,  campos) => async (req, res, next) => {
    const { body, method, usuarioLogado, route: { path } } = req
    try {
        const funcaoWhereComOr = (acc, campo) => acc + `${campo} = '${body[campo]}' OR `
        const whereString = campos.reduce(funcaoWhereComOr, '').slice(0, -3)
        const [ usuarioExiste ] = await knex(tabela).select('*').whereRaw(whereString)

        if (!usuarioExiste) {
            if (path === '/login') return mensagemJson(404, res, 'Email não encontrado.')
            return next()
        }
        if (method === 'PUT') {
            const putUsuario = usuarioLogado.id === usuarioExiste.id && path === '/usuario'
            if (putUsuario) return next()
            const { idAtual } = req
            if (idAtual.id === usuarioExiste.id) return next()
        }
        if (path === '/login') {
            req.usuarioLogin = {...usuarioExiste}
            return next()
        }
        const campoExiste = campos.find(campo => usuarioExiste[campo] === body[campo])
        mensagemJson(400, res, `O ${campoExiste} já existe.`)
    } catch (error) {
        mensagemJson(500, res, 'Erro interno no servidor')
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
        return mensagemJson(401, res, 'Não autorizado.')
    }
}

export const seIdExiste = (nomeTabela) => async (req, res, next) => {
    const { params: { id } } = req
    try {
        const [ verificandoId ] = await knex(nomeTabela).where({ id })
        const msgIdNaoEncontrado = nomeTabela.slice(0, -1) + ' não encontrado.'
        if (!verificandoId) return mensagemJson(404, res, msgIdNaoEncontrado)
        req.idAtual = { ...verificandoId }
        next()
    } catch (error) {
        mensagemJson(500, res, 'Erro interno do servidor')
    }
}