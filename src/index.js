import { todasRotas } from './rotas/export/exportRotas.js'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

console.log('oi')
const app = express()
const porta = process.env.PORT || 3000

app.use(express.json())

app.use(todasRotas)

app.listen(porta, () => console.log("Servidor ON"))