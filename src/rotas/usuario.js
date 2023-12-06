import { Router } from 'express'
import * as u from '../controladores/usuario.js'
import { validarCampos, autenticarToken } from '../intermediarios/intermediarios.js'
import { schemaUsuario } from '../schema/usuario.js'

export const rotasUsuario = Router()

rotasUsuario.route('/usuario')
    .post(validarCampos(schemaUsuario), u.cadastrar)
    .put(validarCampos(schemaUsuario), autenticarToken, u.atualizar)
    .get(autenticarToken, u.detalharPerfil)