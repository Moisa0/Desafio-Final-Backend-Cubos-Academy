import joi from 'joi'

export const schemaUsuario = joi.object({
    nome: joi.string().required().messages({
        "any.required": "O campo nome é obrigatório",
        "string.empty": "O campo nome não poder estar vazio"
    }),
    email: joi.string().email().required().messages({
        "any.required": "O campo email é obrigatório",
        "string.email": "Campo email inválido",
        "string.empty": "O campo email não poder estar vazio"
    }),
    senha: joi.string().required().messages({
        "any.required": "O campo senha é obrigatório",
        "string.empty": "O campo senha não poder estar vazio"
    })
});
