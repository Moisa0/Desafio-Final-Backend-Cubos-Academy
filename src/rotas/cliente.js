import { Router } from 'express'
import * as c from '../controladores/cliente.js'
import { 
    s_cliente,
    s_idCheck } from '../schema/schemas.js'
import { 
    autenticarToken,
    campoUnico,
    validarCampos } from '../intermediarios/intermediarios.js'
    
export const rotasCliente = Router()

rotasCliente.use('/cliente', autenticarToken)

rotasCliente.route('/cliente')
    .get(c.listar)
    .post(
        validarCampos(s_cliente, 'body'),
        campoUnico('clientes', ['email', 'cpf'], 'body'),
        c.cadastrar)
    
rotasCliente.route('/cliente/:id')
    .all(
        validarCampos(s_idCheck, 'params'),
        campoUnico('clientes', ['id'], 'params'))
    .put(
        validarCampos(s_cliente, 'body'),
        campoUnico('clientes', ['email', 'cpf'], 'body', 'idUnico2'),
        c.editarDados)
    .get(
        c.detalhar)