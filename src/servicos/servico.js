export const msgJson = (statusCode, objRes, msg = undefined) => {
    const conteudoJson = !msg ? null : typeof msg === 'object' ? msg : { mensagem: msg }
    return objRes.status(statusCode).json(conteudoJson)
}