import { knex } from '../conexao/conexao.js'

export async function listar (req, res) {
    try {

        const categorias = await knex("categorias")
    return res.status(200).json(categorias);

    } catch (error) {
        //console.log (error.mensage)
        return res.status(500).json({ mensagem: "Erro interno do servidor!"})      
    }
    
}