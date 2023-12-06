import { Router } from 'express'
import * as l from '../controladores/login.js'
import { login } from '../schema/schemas.js'
import { validarCampos } from '../intermediarios/intermediarios.js'

export const rotasLogin = Router()

rotasLogin.route('/login')
    .post(validarCampos(login), l.logar)