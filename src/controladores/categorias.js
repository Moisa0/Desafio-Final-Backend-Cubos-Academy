import { knex } from '../conexao/conexao.js'
import { mensagemJson } from '../servicos/servico.js'

export const listar = async (req, res) => {
    try {
    	const categorias = await knex("categorias")
    	return mensagemJson(200, res, categorias)
    } catch (error) {
        return mensagemJson(500, res, "Erro interno do servidor!")
    }
}
