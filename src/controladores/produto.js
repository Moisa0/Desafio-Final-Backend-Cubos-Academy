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

export const listar = async (req, res) => {
    const { categoria_id } = req.query;

    try {
        if (categoria_id) {
            const listarProdutoPeloId = await knex("produtos").where('id', categoria_id);
            return mensagemJson(200, res, listarProdutoPeloId);
        } 
      
         const listarProdutos = await knex("produtos");
         return mensagemJson(200, res, listarProdutos);
    } catch (error) {
        return mensagemJson(500, res, "Erro interno do servidor")
    }

}
export const editar = (req, res) => {

}

export const detalhar = (req, res) => {
    

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