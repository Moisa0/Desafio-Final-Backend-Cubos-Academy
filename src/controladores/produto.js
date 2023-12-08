import { knex } from "../conexao/conexao.js"
import { mensagemJson } from "../servicos/servico.js"

export const cadastrar = async (req, res) => {
    const { categoria_id } = req.body
    try {
        const [ categoriaExiste ] = await knex('categorias').where({ id: categoria_id })
        if (!categoriaExiste) return mensagemJson(400, res, 'Categoria não existe')

        const [ produtoCadastro ] = await knex('produtos').returning(['id', ...Object.keys({...req.body})]).insert({ ...req.body })
        return mensagemJson(201, res, produtoCadastro)
    } catch (error) {
        return mensagemJson(500, res, 'Erro interno do servidor')
    }
}

export const listar = (req, res) => {

}

export const editar = (req, res) => {

}

export const detalhar = (req, res) => {

}

export const excluir = (req, res) => {
    
}