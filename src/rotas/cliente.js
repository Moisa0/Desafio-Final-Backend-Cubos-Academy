import { Router } from 'express'
import * as c from '../controladores/cliente.js'
import { autenticarToken, validarCampos } from '../intermediarios/intermediarios.js'
import { cliente } from '../schema/schemas.js'

export const rotasCliente = Router()

rotasCliente.route('/cliente')
    .post(validarCampos(cliente), autenticarToken, c.cadastrar)
    .get(validarCampos(cliente), autenticarToken, c.listar)
    
rotasCliente.route('/cliente/:id')
    .put(validarCampos(cliente), autenticarToken, c.editarDados)
    .get(autenticarToken, c.detalhar)