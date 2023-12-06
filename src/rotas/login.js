import { Router } from 'express'
import * as l from '../controladores/login.js'
import { schemaLogin } from '../schema/login.js'
import { validarCampos } from '../intermediarios/intermediarios.js'

export const rotasLogin = Router()

rotasLogin.route('/login')
    .post(validarCampos(schemaLogin), l.logar)