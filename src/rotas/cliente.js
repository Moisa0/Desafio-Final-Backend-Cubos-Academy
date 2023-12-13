import { Router } from 'express'
import * as c from '../controladores/cliente.js'
import { 
    s_cliente,
    s_idCheck } from '../schema/schemas.js'
import { 
    autenticarToken,
    campoUnico,
    seIdExiste,
    validarCampos } from '../intermediarios/intermediarios.js'
    
export const rotasCliente = Router()

rotasCliente.use('/cliente', autenticarToken)

rotasCliente.route('/cliente')
    .all(validarCampos(s_cliente, 'body'))
    .post(campoUnico('clientes', ['email', 'cpf']),
        c.cadastrar)
    .get(c.listar)
    
rotasCliente.route('/cliente/:id')
    .all(validarCampos(s_idCheck, 'params'), seIdExiste('clientes'))
    .put(validarCampos(s_cliente, 'body'),
        campoUnico('clientes', ['email', 'cpf']),
        c.editarDados)
    .get(c.detalhar)