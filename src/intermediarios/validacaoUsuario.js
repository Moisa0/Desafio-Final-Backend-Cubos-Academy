import { mensagemJson } from '../servicos/servico.js'

export const validarCorpoRequisicao = (schemaUsuario) => async(req, res, next) => {
    try {
        await schemaUsuario.validateAsync(req.body)
        next()
    } catch (error) {
        return mensagemJson(400, res, error.message)
    }
}