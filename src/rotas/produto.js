import { Router } from 'express'
import * as p from '../controladores/produto.js'
import { 
    autenticarToken, 
    seIdExiste, 
    validarCampos } from '../intermediarios/intermediarios.js'
import { 
    s_idCheck,
    s_idOpcional,
    s_produto } from '../schema/schemas.js'

export const rotasProduto = Router()

rotasProduto.use('/produto', autenticarToken)

rotasProduto.route('/produto')
    .post(validarCampos(s_produto, 'body'), p.cadastrar)
    .get(validarCampos(s_idOpcional, 'query'), p.listar)

rotasProduto.route('/produto/:id')
    .all(validarCampos(s_idCheck, 'params'))
    .put(
        validarCampos(s_produto, 'body'),
        seIdExiste('produtos'),
        p.editar)
    .get(p.detalhar)
    .delete(seIdExiste('produtos'), p.excluir)