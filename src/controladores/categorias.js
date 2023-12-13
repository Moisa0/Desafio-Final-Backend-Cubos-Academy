import { knex } from '../conexao/conexao.js'
import { mensagemJson } from '../servicos/servico.js'

export const listar = async (req, res) => {
    try {
    	const categoriasInfo = await knex('categorias')
    	mensagemJson(200, res, categoriasInfo)
    } catch (error) {
        mensagemJson(500, res, 'Erro interno do servidor!')
    }
}