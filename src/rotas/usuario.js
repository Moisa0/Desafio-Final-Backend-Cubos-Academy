import { Router } from 'express'
import * as u from '../controladores/usuario.js'
import { validarCorpoRequisicao } from '../intermediarios/validacaoUsuario.js'
import { schemaUsuario } from '../schema/usuario.js'

export const rotasUsuario = Router()

rotasUsuario.route('/usuario')
    .post(validarCorpoRequisicao(schemaUsuario), u.cadastrar)