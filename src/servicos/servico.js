export const mensagemJson = (statusCode, objRes, msg = undefined) => {
    if (!msg ) return  objRes.status(statusCode).json() 
    if (typeof msg === 'object') return objRes.status(statusCode).json(msg)
    return objRes.status(statusCode).json({ mensagem: msg })
}