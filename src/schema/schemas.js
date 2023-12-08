import Joi from 'joi'

const email = Joi.string().email().max(30).required().messages({
    'string.max': 'O email precisa ter no máximo 30 caracteres',
    'any.required': 'O campo "email" é obrigatório',
    'string.email': 'Insira um email valido',
    'string.empty': 'O campo "email" não poder estar vazio'
})

const senha = Joi.string().min(8).max(72).required().messages({
    'string.max': 'A senha precisa ter no máximo 72 caracteres',
    'string.min': 'A senha precisa ter no mínino 8 caracteres',
    'any.required': 'O campo "senha" é obrigatório',
    'string.empty': 'O campo "senha" não poder estar vazio'
})

const nome = Joi.string().max(30).required().messages({
    'string.max': 'O nome precisa ter no máximo 30 caracteres',
    'any.required': 'O campo "nome" é obrigatório',
    'string.empty': 'O campo "nome" não poder estar vazio'
})


const descricao = Joi.string().required().messages({
    'any.required': 'O campo "descricao" é obrigatório',
})

const quantidade_estoque = Joi.number().integer().positive().required().vali.messages({
    'number.integer': 'Informe um número inteiro',
    'number.positive': 'Informe um número positivo',
    'number.base': 'Informe um número valido',
    'any.required': 'O campo "quantidade_estoque" é obrigatório',
})

const valor = Joi.number().integer().positive().required().messages({
    'number.integer': 'Informe um número inteiro',
    'number.positive': 'Informe um número positivo',
    'number.base': 'Informe um número valido',
    'any.required': 'O campo "valor" é obrigatório',
})

const categoria_id = Joi.number().integer().positive().required().messages({
    'any.required': 'O campo "categoria_id" é obrigatório',
})


export const login = Joi.object({email, senha})

export const usuario = Joi.object({nome, email, senha})

export const produto = Joi.object({descricao, quantidade_estoque, valor, categoria_id})