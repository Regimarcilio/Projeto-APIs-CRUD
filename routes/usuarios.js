import express from "express";
import { 
    getUsuarios,
    getUsuario,
    createUsuario,
    deleteUsuario,
    attUsuario,
    desativarUsuario,
    ativarUsuario
} from "../controller/usuarios.js";
import { autorizarAdmin, verificarId } from "../middlewares/auth.js";

export const routerUsuario = express.Router()

routerUsuario.get('/', autorizarAdmin, getUsuarios);

routerUsuario.get('/:id', verificarId, getUsuario);

routerUsuario.post('/', autorizarAdmin, createUsuario);

routerUsuario.delete('/:id', autorizarAdmin, deleteUsuario)

routerUsuario.put('/:id', verificarId, attUsuario);

routerUsuario.patch('/desativar/:id', verificarId, desativarUsuario)

routerUsuario.patch('/ativar/:id', autorizarAdmin, ativarUsuario)