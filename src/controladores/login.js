import { msgJson } from '../servicos/servico.js'
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'

export const logar = async (req, res) => {
    const { body: { senha }, idUnico } = req
    try {
        if (!idUnico) return msgJson(404, res, 'Email não cadastrado.')
        const { idObj, idObj: { id } } = idUnico
        
        const senhaValida = await compare(senha, idObj.senha)
        if(!senhaValida) return msgJson(401, res, 'Senha incorreta.')

        delete idObj.senha
        
        const payload = { id }, options = { expiresIn: '24h' }
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, options)

        msgJson(200, res, { usuario: idObj, token })
    } catch (error) {
        msgJson(500, res, error)
    }
}