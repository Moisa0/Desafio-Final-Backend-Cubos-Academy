import { mensagemJson } from '../servicos/servico.js'

export const validarCorpoLogin = (schemaLogin) => async (req, res, next) => {
    try {
        await schemaLogin.validateAsync(req.body)
        next()
    } catch (error) {
        return mensagemJson(400, res, error.message)
    }
}