import { rotasCategorias } from '../categoria.js'
import { rotasCliente } from '../cliente.js'
import { rotasLogin } from '../login.js'
import { rotasProduto } from '../produto.js'
import { rotasUsuario } from '../usuario.js'
import { rotasPedidos } from '../pedido.js'

export const todasRotas = [
    rotasCategorias,
    rotasCliente,
    rotasLogin,
    rotasPedidos,
    rotasProduto,
    rotasUsuario
]