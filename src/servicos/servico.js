export const mensagemJson = (statusCode, objRes, msg = undefined) => {
    return msg === undefined ? objRes.status(statusCode).json() : 
    typeof msg === 'object' ? objRes.status(statusCode).json(msg) :
    objRes.status(statusCode).json({ mensagem: msg })
}