import { mensagemJson } from '../servicos/servico.js'
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'

export const logar = async (req, res) => {
    const { body: { senha }, usuarioLogin } = req
    try {
        const senhaValida = await compare(senha, usuarioLogin.senha)
        if(!senhaValida) return mensagemJson(401, res, 'Senha incorreta.')
        delete usuarioLogin.senha
        
        const payload = { id: usuarioLogin.id }, options = { expiresIn: '24h' }
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, options)

        mensagemJson(200, res, { usuario: {...usuarioLogin}, token })
    } catch (error) {
        mensagemJson(500, res, error)
    }
}