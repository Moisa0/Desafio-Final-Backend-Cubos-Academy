import Joi from 'joi'

export const msgPersonalizadas = {
    'string.max': `O campo "" precisa ter no máximo 30 caracteres`,
    'string.email': 'Insira um email valido',
    'string.min': `O campo "" precisa ter no mínino 8 caracteres`,
    'number.integer': `Informe um número inteiro no campo ""`,
    'number.positive': `Informe um número positivo no campo ""`,
    'number.base': `Informe um número valido no campo ""`,
    'any.required': `O campo "" é obrigatório`,
    'object.base': `Informe os campos dentro de chaves "{}"`,
    'string.empty': `O campo "" não poder estar vazio`
}

const email = Joi.string().email().max(30).required(),
    senha = Joi.string().min(8).max(72).required(),
    nome = Joi.string().max(30).required(),
    descricao = Joi.string().required(),
    quantidade_estoque = Joi.number().integer().positive().required(),
    valor = Joi.number().integer().positive().required(),
    categoria_id = Joi.number().integer().positive().required(),
    cpf = Joi.string().required()

const criaObjJoi = (camposJoiObj) => Joi.object(camposJoiObj).required()

export const login = criaObjJoi({email, senha})

export const usuario = criaObjJoi({nome, email, senha})
    
export const produto = criaObjJoi({ descricao, quantidade_estoque, valor, categoria_id})

export const cliente = criaObjJoi({nome, email, cpf})