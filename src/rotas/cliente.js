import { Router } from 'express'
import * as c from '../controladores/cliente.js'

export const rotasCliente = Router()

rotasCliente.route('/cliente')
    .post(c.cadastrar)
    .get(c.listar)
    
rotasCliente.route('/cliente/:id')
    .put(c.editarDados)
    .get(c.detalhar)