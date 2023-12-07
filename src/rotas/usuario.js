import { Router } from 'express'
import * as u from '../controladores/usuario.js'
import { autenticarToken, validarCampos } from '../intermediarios/intermediarios.js'
import { usuario } from '../schema/schemas.js'

export const rotasUsuario = Router()

rotasUsuario.route('/usuario')
    .post(validarCampos(usuario), u.cadastrar)
    .put(validarCampos(usuario), autenticarToken, u.atualizar)
    .get(autenticarToken, u.detalhar)