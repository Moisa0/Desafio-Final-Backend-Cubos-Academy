import express from 'express'
import { app } from './server.js'
import { todasRotas } from './rotas/export/exportRotas.js'

app.use(express.json())

app.use(todasRotas)