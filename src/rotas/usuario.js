import { Router } from 'express'
import * as u from '../controladores/usuario.js'
import { s_usuario } from '../schema/schemas.js'
import { 
    autenticarToken,
    campoUnico,
    validarCampos } from '../intermediarios/intermediarios.js'

export const rotasUsuario = Router()

rotasUsuario.route('/usuario')
    .post(
        validarCampos(s_usuario, 'body'), 
        campoUnico('usuarios', ['email'], 'body'),
        u.cadastrar)
    .all(autenticarToken)
    .put(
        validarCampos(s_usuario, 'body'),
        campoUnico('usuarios', ['email'], 'body'),
        u.atualizar)
    .get(u.detalhar)