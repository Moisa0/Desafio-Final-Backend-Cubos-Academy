import { knex } from '../conexao/conexao.js'
import { msgJson } from '../servicos/servico.js'

export const listar = async (req, res) => {
    try {
    	const categoriasInfo = await knex('categorias')
    	msgJson(200, res, categoriasInfo)
    } catch (error) {
        msgJson(500, res, 'Erro interno do servidor!')
    }
}