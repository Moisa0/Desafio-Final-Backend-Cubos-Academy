import { Router } from 'express'
import * as c from '../controladores/categorias.js'

export const rotasCategorias = Router()

rotasCategorias.route('/categoria')
    .get(c.listar)