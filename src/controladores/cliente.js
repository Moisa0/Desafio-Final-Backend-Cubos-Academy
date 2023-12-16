import { knex } from '../conexao/conexao.js'
import { msgJson } from '../servicos/servico.js'

export const cadastrar = async (req, res) => {
    const { body, idUnico } = req
    try {
        if (idUnico) return msgJson(404, res, `O ${idUnico.campo} já existe.`)
        const [ clienteInfo ] = await knex('clientes')
            .insert({...body}).returning('*')

        msgJson(200, res, clienteInfo)
    } catch (error) {
        msgJson(500, res, 'Erro interno do servidor ao cadastrar clientes.')
    }
}

export const editarDados = async (req, res) => {
    const { params: { id }, body, idUnico, idUnico2 } = req
    try {
        if (!idUnico) return msgJson(404, res, 'Cliente não encontrado.')
        if (idUnico2) {
            const { idObj } = idUnico2
            if (idObj.id !== id) 
                return msgJson(400, res, `O ${idUnico2.campo} já existe.`)
        }

        const [ upClienteInfo ] = await knex('clientes')
            .update({...body})
            .where({ id })
            .returning('*')
            
        msgJson(200, res, upClienteInfo)
    } catch (error) {
        msgJson(500, res, 'Erro interno do servidor ao editar clientes')
    }
}

export const listar = async (req, res) => {
    try {
        const listaCilentes = await knex('clientes')
        msgJson(200, res, listaCilentes)
    } catch (error) {
        msgJson(500, res, 'Erro interno do servidor ao listar clientes')
    }
}

export const detalhar = (req, res) => {
    const { idUnico } = req
    if (!idUnico) return msgJson(404, res, 'Cliente não cadastrado.') 
    
    msgJson(200, res, idUnico.idObj)
}