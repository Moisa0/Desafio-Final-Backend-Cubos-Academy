import joi from 'joi'

const email = joi.string().email().trim().required().messages({
    'string.trim': 'Não é permitido espaços no começo ou no final.',
    'any.required': 'O campo email é obrigatório',
    'string.email': 'Insira um email valido',
    'string.empty': 'O campo email não poder estar vazio'
})

const senha = joi.string().required().messages({
    'any.required': 'O campo senha é obrigatório',
    'string.empty': 'O campo senha não poder estar vazio'
})

const nome = joi.string().required().messages({
    'any.required': 'O campo nome é obrigatório',
    'string.empty': 'O campo nome não poder estar vazio'
})

export const login = joi.object({email, senha})

export const usuario = joi.object({nome, email, senha})