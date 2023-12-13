import { knex } from '../conexao/conexao.js'
import { mensagemJson } from '../servicos/servico.js'

export const cadastrar = async (req, res) => {
    const { body } = req
    try {
        const [ clienteInfo ] = await knex('clientes')
            .insert({...body}).returning('*')

        mensagemJson(200, res, clienteInfo)
    } catch (error) {
        mensagemJson(500, res, 'Erro interno do servidor')
    }
}

export const editarDados = async (req, res) => {
    const { params: { id }, body } = req
    try {
        const [ updateCliente ]= await knex('clientes').update({...body}).where({ id })
        mensagemJson(200, res, updateCliente)
    } catch (error) {
        mensagemJson(500, res, 'Erro interno do servidor')
    }
}

export const listar = async (req, res) => {
    try {
        const listaCilentes = await knex('clientes')
        mensagemJson(200, res, listaCilentes)
    } catch (error) {
        mensagemJson(500, res, 'Erro interno do servidor')
    }
}

export const detalhar = (req, res) => mensagemJson(200, res, req.idAtual)