import { knex } from '../conexao/conexao.js'
import { msgJson } from '../servicos/servico.js'

export const cadastrar = async (req, res) => {
    const { body, idUnico  } = req
    try {
        if (!idUnico) return msgJson(400, res, 'Categoria não existe')

        const [ produtoInfo ] = await knex('produtos')
        .insert(body).returning(['*'])

        msgJson(201, res, produtoInfo)
    } catch (error) {
        msgJson(500, res, 'Erro interno do servidor')
    }
}

export const listar = async (req, res) => {
    const { query: { categoria_id } } = req
    try {
        const expressao = categoria_id ? `categoria_id = ${categoria_id}` : 'categoria_id > 0' 
        const listaProdutosInfo = await knex('categorias')
        .select('produtos.*', 'categorias.descricao as descricao_categoria')
        .join('produtos', 'produtos.categoria_id', '=', 'categorias.id')
        .whereRaw(expressao)

        msgJson(200, res, listaProdutosInfo)
    } catch (error) {
        msgJson(500, res, 'Erro interno do servidor')
    }
}

export const editar = async (req, res) => {
    const { params: { id }, idUnico, body } = req
    try {
        if(!idUnico) return msgJson(404, res, 'Categoria não encontrada!')

        await knex('produtos').update(body).where({id})
        msgJson(204, res)
    } catch (error) {
        msgJson(500, res, 'Erro interno do servidor!')
    }
}

export const detalhar = async (req, res) => {
    const { params: { id } } = req
    try {
        
        const produtoInfo = await knex('produtos')
        .select('produtos.*', 'categorias.descricao as descricao_categoria')
        .join('categorias', 'produtos.categoria_id', '=', 'categorias.id')
        .where({ 'produtos.id': id })

        if (!produtoInfo) return msgJson(404, res, 'Produto não encontrado')
        
        msgJson(200, res, produtoInfo)
    } catch (error) {
        msgJson(500, res, 'Erro interno do servidor')
    }
}

export const excluir = async (req, res) => {
    const { params: { id }, idUnico } = req
    try {
        if (!idUnico) return msgJson(404, res, 'Produto não encontrado.')

        await knex('produtos').where({ id }).del()
        msgJson(204, res)
    } catch (error) {
        msgJson(500, res, 'Erro interno do servidor')
    }
}
