import { Router } from 'express'
import * as u from '../controladores/usuario.js'

export const rotasUsuario = Router()

rotasUsuario.route('/usuario')
    .post(u.cadastrar)