import Joi, { required } from 'joi'

const objMsgPersonalizado = (arrayMensagens) => {
    const mensagensChaveValor = {
        'string.max': `O campo "" precisa ter no máximo 30 caracteres`,
        'string.email': 'Insira um email valido',
        'string.min': `O campo "" precisa ter no mínino 8 caracteres`,
        'number.integer': `Informe um número inteiro no campo ""`,
        'number.positive': `Informe um número positivo no campo ""`,
        'number.base': `Informe um número valido no campo ""`
    }
    return arrayMensagens
        .reduce((acc, msg) => ({...acc, [msg]: mensagensChaveValor[msg]}), {
            'any.required': `O campo "" é obrigatório`,
            'object.base': `Informe os campos dentro de chaves "{}"`,
            'string.empty': `O campo "" não poder estar vazio`
        })
}

const email = Joi.string().email().max(30).required(),
    senha = Joi.string().min(8).max(72).required(),
    nome = Joi.string().max(30).required(),
    descricao = Joi.string().required(),
    quantidade_estoque = Joi.number().integer().positive().required(),
    valor = Joi.number().integer().positive().required(),
    categoria_id = Joi.number().integer().positive().required(),
    cpf = Joi.string().required()

export const login = Joi.object()
    .keys({email, senha})
    .required()
    .messages(objMsgPersonalizado([
        'string.max',
        'string.email',
        'string.min'
    ]))

export const usuario = login.keys
    ({nome})
    .required()
    .messages(objMsgPersonalizado([
        'string.max',
        'string.email',
        'string.min'
    ]))

export const produto = Joi.object
    ({descricao, quantidade_estoque, valor, categoria_id})
    .required()
    .messages(objMsgPersonalizado([
        'number.integer',
        'number.positive',
        'number.base'
    ]))

export const cliente = Joi.object
    ({nome, email, cpf})
    .required()
    .messages(objMsgPersonalizado([
        'string.max',
        'string.email'
    ]))