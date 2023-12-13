import Joi from 'joi'

const email = Joi.string().email().max(30).required(),
    senha = Joi.string().min(8).max(72).required(),
    nome = Joi.string().max(30).required(),
    descricao = Joi.string().required(),
    quantidade_estoque = Joi.number().integer().positive().required(),
    valor = Joi.number().integer().positive().required(),
    categoria_id = Joi.number().integer().positive().required(),
    cpf = Joi.string().required(),
    id = Joi.number().integer().positive().required(),
    criaObjJoi = (camposJoiObj) => Joi.object().keys(camposJoiObj).required()

export const s_login = criaObjJoi({email, senha})

export const s_usuario = criaObjJoi({nome, email, senha})

export const s_produto = criaObjJoi({descricao, quantidade_estoque, valor, categoria_id})

export const s_cliente = criaObjJoi({nome, email, cpf})

export const s_idCheck = criaObjJoi({id}) 

export const msgError = {
    'string.max': `O campo '$' ultrapassou o máximo de caracteres.`,
    'string.email': 'Insira um email valido.',
    'string.min': `O campo '$' não possui o mínino de caracteres.`,
    'number.integer': `Informe um número inteiro no campo '$'.`,
    'number.positive': `Informe um número positivo no campo '$'.`,
    'number.base': `Informe um número valido no campo '$'.`,
    'any.required': `O campo '$' é obrigatório.`,
    'object.base': `Informe os campos dentro de chaves '{}'.`,
    'string.empty': `O campo '$' não poder estar vazio.`,
    'object.unknown': `O campo '$' não é permitido.`
}
