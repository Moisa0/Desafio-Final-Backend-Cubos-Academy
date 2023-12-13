import { knex } from '../conexao/conexao.js'
import { mensagemJson } from '../servicos/servico.js'

export const cadastrar = async (req, res) => {
    const { body } = req
    try {
        const [ clienteInfo ] = await knex('clientes')
            .insert({...body}).returning('*')

        mensagemJson(200, res, clienteInfo)
    } catch (error) {
        mensagemJson(500, res, 'Erro interno do servidor ao cadastrar clientes.')
    }
}

export const editarDados = async (req, res) => {
    const { params: { id }, body } = req
    try {
        const [ upClienteInfo ] = await knex('clientes')
            .update({...body})
            .where({ id })
            .returning('*')
        mensagemJson(200, res, upClienteInfo)
    } catch (error) {
        mensagemJson(500, res, 'Erro interno do servidor ao editar clientes')
    }
}

export const listar = async (req, res) => {
    try {
        const listaCilentes = await knex('clientes')
        mensagemJson(200, res, listaCilentes)
    } catch (error) {
        mensagemJson(500, res, 'Erro interno do servidor ao listar clientes')
    }
}

export const detalhar = (req, res) => mensagemJson(200, res, req.idAtual)