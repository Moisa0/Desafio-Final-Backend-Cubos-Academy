import { Router } from 'express'
import * as p from '../controladores/pedido.js'
import { autenticarToken } from '../intermediarios/intermediarios.js'

export const rotasPedidos = Router()

rotasPedidos.route('/pedido')
	.all(autenticarToken)
	.post(p.cadastrar)
	.get(p.listar)