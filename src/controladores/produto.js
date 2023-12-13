import { knex } from '../conexao/conexao.js'
import { mensagemJson } from '../servicos/servico.js'

export const cadastrar = async (req, res) => {
    const { categoria_id } = req.body
    try {
        const [ categoriaExiste ] = await knex('categorias')
            .where({ id: categoria_id })
        if (!categoriaExiste) return mensagemJson(400, res, 'Categoria não existe')

        const [ produtoInfo ] = await knex('produtos')
        .insert({ ...req.body }).returning(['*'])

        mensagemJson(201, res, produtoInfo)
    } catch (error) {
        mensagemJson(500, res, 'Erro interno do servidor')
    }
}

export const listar = async (req, res) => {
    const { query: { categoria_id } } = req
    try {
        const whereExpressao = categoria_id ? `categoria_id = ${categoria_id}` : `categoria_id > 0`
        const listaProdutosInfo = await knex('produtos').whereRaw(whereExpressao)
        return mensagemJson(200, res, listaProdutosInfo)
    } catch (error) {
        return mensagemJson(500, res, 'Erro interno do servidor')
    }
}

export const editar = async (req, res) => {
    const { params: { id }, body: { categoria_id } } = req
    try {
        const [ verificarCategoria ] = await knex('categorias').where({ id: categoria_id })
        if(!verificarCategoria) return mensagemJson(404, res, 'Categoria não encontrada!')

        await knex('produtos').update(req.body).where({id})
        mensagemJson(204, res)
    } catch (error) {
        mensagemJson(500, res, 'Erro interno do servidor!')
    }
}

export const detalhar = async (req, res) => {
    const { params: { id } } = req
    try {
        const [ produtoInfo ] = await knex('produtos')
            .select('*')           
            .where({id})

        if (!produtoInfo) return mensagemJson(404, res, 'Produto não encontrado')
        mensagemJson(200, res, produtoInfo)
    } catch (error) {
        mensagemJson(500, res, 'Erro interno do servidor')
    }
}

export const excluir = async (req, res) => {
    const { params: { id } } = req
    try {
        await knex('produtos').where({ id }).del()
        mensagemJson(204, res)
    } catch (error) {
        mensagemJson(500, res, 'Erro interno do servidor')
    }
}