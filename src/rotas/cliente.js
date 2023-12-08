import { Router } from 'express'
import * as c from '../controladores/cliente.js'
import { autenticarToken } from '../intermediarios/intermediarios.js'

export const rotasCliente = Router()

rotasCliente.use(autenticarToken)

rotasCliente.route('/cliente')
    .post(c.cadastrar)
    .get(c.listar)
    
rotasCliente.route('/cliente/:id')
    .put(c.editarDados)
    .get(c.detalhar)