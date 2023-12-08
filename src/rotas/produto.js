import { Router } from 'express'
import * as p from '../controladores/produto.js'
import { autenticarToken, validarCampos } from '../intermediarios/intermediarios.js'
import { produto } from '../schema/schemas.js'

export const rotasProduto = Router()

rotasProduto.use(autenticarToken)

rotasProduto.route('/produto')
    .post(validarCampos(produto), p.cadastrar)
    .get(p.listar)

rotasProduto.route('/produto/:id')
    .put(p.editar)
    .get(p.detalhar)
    .delete(p.excluir)