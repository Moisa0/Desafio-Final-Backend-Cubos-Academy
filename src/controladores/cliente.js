import { knex } from "../conexao/conexao.js"
import { mensagemJson } from '../servicos/servico.js'

export const cadastrar = async (req, res) => {
    try {
        const [ clienteCadastrado ] = await knex('clientes')
            .insert({...req.body})
            .returning(['id', ...Object.keys(req.body)])
        return mensagemJson(201, res, clienteCadastrado)
    } catch (error) {
        console.log(error)
        return mensagemJson(500, res, 'opa')
    }
}

export const listar = (req, res) => {

}

export const detalhar = (req, res) => {

}

export const editarDados = (req, res) => {
    
}