import { mensagemJson } from '../servicos/servico.js'
import { knex } from '../conexao/conexao.js'
import { hash } from 'bcrypt'

export const cadastrar = async (req, res) => {
    const { body: { senha }, body} = req
    try {
        body.senha = await hash(senha, 10)
        const [ usuarioInfo ] = await knex('usuarioInfos')
            .insert({...body})
            .returning(['id', 'nome', 'email'])

        mensagemJson(201, res, usuarioInfo)
    } catch (error) {
        mensagemJson(500, res, 'Erro interno do servidor')
    }
}

export const atualizar = async (req, res) => {
    const { body: { senha }, body, usuarioLogado: { id } } = req
    try {
        body.senha = await hash(senha, 10)
        const [ usuarioInfo ] = await knex('usuarios')
            .update({...body})
            .where({ id })
            .returning([ 'id', 'nome', 'email' ])

        mensagemJson(200, res, usuarioInfo)
    } catch (error) {
        mensagemJson(500, res, 'Erro interno do servidor')
    }
}

export const detalhar = (req, res) => mensagemJson(200, res, req.usuarioLogado)