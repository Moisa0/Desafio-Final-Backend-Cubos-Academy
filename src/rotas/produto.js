import { Router } from 'express'
import * as p from '../controladores/produto.js'

export const rotasProduto = Router()

rotasProduto.route('produto')
    .post(p.cadastrar)
    .get(p.listar)

rotasProduto.route('produto/:id')
    .put(p.editar)
    .get(p.detalhar)
    .delete(p.excluir)
