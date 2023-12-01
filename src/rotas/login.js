import { Router } from 'express'
import * as l from '../controladores/login.js'

export const rotasLogin = Router()

rotasLogin.route('/login')
    .post(l.logar)