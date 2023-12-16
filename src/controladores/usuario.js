import { msgJson } from '../servicos/servico.js'
import { knex } from '../conexao/conexao.js'
import { hash } from 'bcrypt'

export const cadastrar = async (req, res) => {
    const { body: { senha }, body, idUnico} = req
    try {
        if (idUnico) return msgJson(400, res, `O ${idUnico.campo} já existe.`)

        body.senha = await hash(senha, 10)
        const [ usuarioInfo ] = await knex('usuarios')
            .insert({...body})
            .returning(['id', 'nome', 'email'])

        msgJson(201, res, usuarioInfo)
    } catch (error) {
        msgJson(500, res, 'Erro interno do servidor ao cadastrar usuario.')
    }
}

export const atualizar = async (req, res) => {
    const { body, idUnico, usuarioLogado: { id } } = req
    try {
        if (idUnico) {
            const { idObj } = idUnico
            if (idObj.id !== id) return msgJson(400, res, `O email já existe.`)
        }

        body.senha = await hash(body.senha, 10)
        const [ usuarioInfo ] = await knex('usuarios')
            .update({...body})
            .where({ id })
            .returning([ 'id', 'nome', 'email' ])

        msgJson(200, res, usuarioInfo)
    } catch (error) {
        msgJson(500, res, 'Erro interno do servidor')
    }
}

export const detalhar = (req, res) => msgJson(200, res, req.usuarioLogado)