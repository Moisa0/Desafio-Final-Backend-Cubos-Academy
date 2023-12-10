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

export const listar = async (req, res) => {
    try {
        const listarClientes = await knex("clientes")
        return mensagemJson(200, res, listarClientes)
    } catch (error) {
        return mensagemJson(500, res, "Erro interno do servidor")
    }
}

export const detalhar = (req, res) => {

}

export const editarDados = async (req, res) => {
    const { id } = req.params
    const { email, cpf } = req.body

    try {
        const verificandoId = await knex("clientes").where({ id })

        if(verificandoId.length < 1) {
            return mensagemJson(404, res, "Usuário não encontrado.")
        }

        const verificandoEmail = await knex("clientes").where({ email })

        if(verificandoEmail.length > 0 && verificandoEmail[0].id != id) {
            return mensagemJson(400, res, "O email fornecido já está cadastrado.")
        }

        const verificandoCpf = await knex("clientes").where({ cpf })

        if(verificandoCpf.length > 0 && verificandoCpf[0].id != id) {
            return mensagemJson(400, res, "O CPF fornecido já está cadastrado.")
        }

        const updateCliente = await knex("clientes").update(req.body).where({ id }).returning("*")

        return mensagemJson(200, res, updateCliente)

    } catch (error) {
        
        return mensagemJson(500, res, "Erro interno do servidor")
    }
}