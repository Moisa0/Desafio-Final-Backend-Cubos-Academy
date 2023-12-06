import { todasRotas } from './rotas/export/exportRotas.js'
import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express(), porta = process.env.PORT || 3000

app.use(express.json(), todasRotas)

app.listen(porta, () => console.log('Servidor ON'))