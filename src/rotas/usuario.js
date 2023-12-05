import { Router } from 'express'
import * as u from '../controladores/usuario.js'
import { validarCorpoRequisicao } from '../intermediarios/validacaoUsuario.js'
import { schemaUsuario } from '../schema/usuario.js'
import { autenticarToken } from '../intermediarios/autenticacaoToken.js'

export const rotasUsuario = Router()

rotasUsuario.route('/usuario')
    .post(validarCorpoRequisicao(schemaUsuario), u.cadastrar)
    .put(validarCorpoRequisicao(schemaUsuario), autenticarToken, u.atualizar)