import { Router } from 'express'
import * as p from '../controladores/produto.js'
import { 
    autenticarToken, 
    validarCampos } from '../intermediarios/intermediarios.js'
import { 
    s_idCheck,
    s_produto } from '../schema/schemas.js'

export const rotasProduto = Router()

rotasProduto.use('/produto', autenticarToken)

rotasProduto.route('/produto')
    .post(validarCampos(s_produto, 'body'), p.cadastrar)
    .get(p.listar)

rotasProduto.route('/produto/:id')
    .all(validarCampos(s_idCheck, 'params'))
    .put(p.editar)
    .get(p.detalhar)
    .delete(p.excluir)