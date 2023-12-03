import { Router } from 'express'
import * as l from '../controladores/login.js'
import { schemaLogin } from '../schema/login.js'
import { validarCorpoLogin } from '../intermediarios/validacaoLogin.js'

export const rotasLogin = Router()

rotasLogin.route('/login')
    .post(validarCorpoLogin(schemaLogin), l.logar)