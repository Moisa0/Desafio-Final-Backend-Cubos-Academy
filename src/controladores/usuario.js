import { mensagemJson } from '../servicos/servico.js'
import { knex } from '../conexao/conexao.js'
import bcrypt from 'bcrypt'

export const cadastrar = async (req, res) => {
    const { nome, email, senha } = req.body

    try {
        const verificandoEmail = await knex("usuarios").where({ email })

        if(verificandoEmail.length !== 0) {
            return mensagemJson(400, res, "O email fornecido já está cadastrado.")
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const usuario = {
            nome,
            email,
            senha: senhaCriptografada
        }

        const insertUsuario = await knex("usuarios").insert(usuario).returning(["id", "nome", "email"])


        return mensagemJson(201, res, insertUsuario)
    } catch (error) {
        console.log(error);
        return mensagemJson(500, res, error.message)
    }
}