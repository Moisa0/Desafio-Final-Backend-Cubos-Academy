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

export const detalhar = async (req, res) => {

    const id = req.params.id

    try {
        const produto = await knex('produtos').join('categorias', 'produtos.categoria_id', 'categorias.id')
            .select('produtos.*', 'categorias.descricao as categoria_descricao')
            .where('produtos.id', id)
            .first()

        if (!produto) {
            return res.status(404).json({ mensagem: 'Produto não encontrado' })
        }

        return res.status(200).json(produto)

    } catch (error) {
        return res.status(500).json({ mensagem: `Erro interno do servidor: ${message.error}` })
    }

}

export const excluir = async (req, res) => {
 
        const { id } = req.params; 
     
        try {
     
            const produto = await knex('produtos').where({ id }).first();
     
            if (!produto) {
                return res.status(404).json({ mensagem: 'Produto não encontrado' });
            }
     
     
            await knex('produtos').where({ id }).del();
     
            return res.status(200).json({ mensagem: 'Produto excluído com sucesso' });
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({mensagem: `Erro interno do servidor: ${message.error}`});
        }

}