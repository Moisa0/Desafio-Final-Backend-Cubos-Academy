import { Router } from 'express'
import * as c from '../controladores/cliente.js'
import { autenticarToken } from '../intermediarios/intermediarios.js'

export const rotasCliente = Router()


rotasCliente.route('/cliente')
    .post(autenticarToken, c.cadastrar)
    .get(c.listar)
    
rotasCliente.route('/cliente/:id')
    .put(autenticarToken, c.editarDados)
    .get(c.detalhar)