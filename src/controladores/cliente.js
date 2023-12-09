import { knex } from "../conexao/conexao.js"
import { mensagemJson } from "../servicos/servico.js"

export const cadastrar = async (req, res) => {
    const { email, cpf } = req.body

    try {
        const emailExiste = await knex("clientes").where({ email })

        if (emailExiste.length > 0) {
            return mensagemJson(400, res, "O email fornecido já está cadastrado.")
        }

        const cpfExiste = await knex("clientes").where({ cpf })

        if (cpfExiste.length > 0) {
            return mensagemJson(400, res, "O cpf fornecido já está cadastrado.")
        }

        const cadastroCliente = await knex("clientes").insert(req.body).returning("*")

        return mensagemJson(200, res, cadastroCliente)
    } catch (error) {
        return mensagemJson(500, res, "Erro interno do servidor")
    }
}

export const listar = (req, res) => {

}

export const detalhar = (req, res) => {

}

export const editarDados = (req, res) => {
    
}