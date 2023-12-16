import { Router } from 'express'
import * as l from '../controladores/login.js'
import { s_login } from '../schema/schemas.js'
import { 
    campoUnico,
    validarCampos } from '../intermediarios/intermediarios.js'

export const rotasLogin = Router()

rotasLogin.route('/login')
    .post(
        validarCampos(s_login, 'body'),
        campoUnico('usuarios', ['email'], 'body'), 
        l.logar)