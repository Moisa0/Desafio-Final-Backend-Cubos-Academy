import { mensagemJson } from '../servicos/servico.js'
import { knex } from '../conexao/conexao.js' 
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const logar = async (req, res) => {
    const { email, senha } = req.body

    try {
        const usuarioExistente = await knex('usuarios').where({ email })

        if(usuarioExistente.length === 0) return mensagemJson(404, res, 'Email e/ou senha inválidos.')

        const { senha:_, ...usuario } = usuarioExistente[0]

        const senhaValida = await bcrypt.compare(senha, usuarioExistente[0].senha)

        if(!senhaValida) return mensagemJson(400, res, 'Email e/ou senha inválidos.')

        const payload = { id: usuarioExistente[0].id }
        const options = { expiresIn: '24h' }

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, options)

        const usuarioLogado = {
            usuario,
            token
        }

        return mensagemJson(200, res, usuarioLogado)
    } catch (error) {
        console.log(error);
        return mensagemJson(500, res, error.message)
    }
}