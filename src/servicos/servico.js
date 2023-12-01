export const mensagemJson = (statusCode, objRes, msg = undefined) =>
    msg === undefined ? objRes.status(statusCode).json() : 
    typeof msg === 'object' ? objRes.status(statusCode).json(msg) :
    objRes.status(statusCode).json({ mensagem: msg })

export const chavesFalsyEmObjetos = (obj, arrayDeChaves) => 
    arrayDeChaves.filter(chave => !obj[chave]).join(' - ')