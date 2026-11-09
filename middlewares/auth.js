import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { manipularDB } from '../db/db.js';
import { getUsuarioEmail } from '../db/usuarios.js';

const SECRET = process.env.JWT_SECRET;

export const autenticarToken = async (req, res, next) => {
    const reqHeader = req.headers['authorization'];
    const token = reqHeader ? reqHeader.split(' ')[1] : null;

    if (!token) {
        return res.status(401).json({
            erro: "Acesso negado! O token não foi fornecido!"
        });
    }

    try {
        const userEmail = jwt.verify(token, SECRET);
        const usuario = await manipularDB({ email: userEmail.email }, getUsuarioEmail);

        if (!usuario) {
            return res.status(403).json({
                erro: "Acesso negado! Usuário não encontrado!"
            });
        }

        if (!usuario.ativo) {
            return res.status(403).json({
                erro: "Acesso negado! Usuário desativado!"
            });
        }

        const { email, admin, ativo } = usuario;
        req.usuario = { id: String(usuario._id), email, admin, ativo };
        next();
    } catch (e) {
        return res.status(403).json({
            erro: "Acesso negado! Token inválido ou expirado!"
        })
    }
}

export const autorizarAdmin = (req, res, next) => {
    if (!req.usuario || !req.usuario.admin) {
        return res.status(403).json("Usuário não autorizado para realizar esta operação!");
    }
    next();
}

export const verificarId = (req, res, next) => {
    if (!req.usuario) {
        return res.status(403).json("Usuário não autorizado para realizar esta operação!");
    }

    const id = req.usuario.id;
    if (id !== req.params.id && !req.usuario.admin) {
        return res.status(403).json("Usuário não autorizado para realizar esta operação!");
    }

    next();
}