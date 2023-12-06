import { mensagemJson } from '../servicos/servico.js'
import { knex } from '../conexao/conexao.js'
import { hash } from 'bcrypt'

export const cadastrar = async (req, res) => {
    const { nome, email, senha } = req.body

    try {
        const [ emailExiste ] = await knex('usuarios').where({ email })
        if(emailExiste) return mensagemJson(400, res, 'O email fornecido já está cadastrado.')

        const usuario = { nome, email, senha: await hash(senha, 10) }
        const [ usuarioCadastrado ] = await knex('usuarios').insert(usuario).returning(['id', 'nome', 'email'])

        return mensagemJson(201, res, usuarioCadastrado)
    } catch (error) {
        return mensagemJson(500, res, error.message)
    }
}

export const atualizar = async (req, res) => {
    const { body: { nome, email, senha }, usuarioLogado } = req

    try {
        const [ usuarioExiste ] = await knex('usuarios').where({ email })
        const emailEmUso = usuarioExiste && usuarioExiste.email !== usuarioLogado.email
        if (emailEmUso) return mensagemJson(400, res, 'O email fornecido já está cadastrado.')

        const senhaCriptografada = await hash(senha, 10)
        const [ atualizarUsuario ] = await knex('usuarios')
            .update({ nome, email, senha: senhaCriptografada })
            .where({ id: usuarioLogado.id })
            .returning([ 'id', 'nome', 'email' ])

        return mensagemJson(200, res, atualizarUsuario)
    } catch (error) {
        return mensagemJson(500, res, error.message)
    }
}

export const detalhar = (req, res) => mensagemJson(200, res, req.usuarioLogado)