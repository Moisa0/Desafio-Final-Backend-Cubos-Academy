import express from 'express'
import { todasRotas } from './rotas/exportRotas.js'

export const app = express()

app.use(express.json())

app.use(todasRotas)