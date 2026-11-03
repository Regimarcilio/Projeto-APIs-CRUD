import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as dbUsuarios from "../db/usuarios.js";
import { manipularDB } from "../db/db.js";
import 'dotenv/config';

const SECRET = process.env.JWT_SECRET;

export const loginUsuario = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuario = await manipularDB({ email }, dbUsuarios.getUsuarioEmail);
    
        if (!usuario) {
            return res.status(400).json("Email ou senha incorretos!");
        }

        if (!usuario.ativo) {
            return res.status(400).json("Usuário desativado! Contate o administrador!")
        }
    
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
    
        if (!senhaValida) {
            return res.status(400).json("Email ou senha incorretos!")
        }
    
        const token = jwt.sign(
            { email: usuario.email },
            SECRET,
            { expiresIn: '1h' }
        )
    
        res.status(200).json({ token, mensagem: "Login efetuado com sucesso!"})
    } catch (e) {
        res.status(500).json("Erro interno! Tente novamente em alguns instantes!")
    }
}