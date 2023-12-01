import dotenv from 'dotenv'
dotenv.config()

import express from 'express'

export const app = express()

const porta = process.env.PORT || 3000

app.listen(porta, () => console.log("Servidor ON"))