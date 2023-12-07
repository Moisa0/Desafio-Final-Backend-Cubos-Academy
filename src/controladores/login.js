import { mensagemJson } from '../servicos/servico.js'
import { knex } from '../conexao/conexao.js' 
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'

export const logar = async (req, res) => {
    const { email, senha } = req.body

    try {
        const [ usuarioExiste ] = await knex('usuarios').where({ email })
        if(!usuarioExiste) return mensagemJson(404, res, 'Email não esta cadastrado.')

        const senhaValida = await compare(senha, usuarioExiste.senha)
        if(!senhaValida) return mensagemJson(401, res, 'Senha incorreta.')
        
        delete usuarioExiste.senha
        const payload = { id: usuarioExiste.id }, options = { expiresIn: '24h' }
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, options)

        return mensagemJson(200, res, { usuario: usuarioExiste, token })
    } catch (error) {
        return mensagemJson(500, res, error)
    }
}