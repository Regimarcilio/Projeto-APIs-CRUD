import { ObjectId } from "mongodb";

export const getUsuarios = async (con) => await con.db("4INFO3").collection("Usuarios").find({}).toArray();
export const getUsuario = async (con, usuario) => await con.db("4INFO3").collection("Usuarios").findOne({_id: new ObjectId(usuario.id)});

export const getUsuarioEmail = async (con, user) => await con
    .db("projeto_4info3")
    .collection("Usuarios")
    .findOne({email: user.email});

export const createUsuario = async (con, user) => {
    await con.db("projeto_4info3").collection("Usuarios").insertOne(user);

    return `Usuário ${user.email} adicionado ao MongoDB!`;
}

export const deleteUsuario = async (con, usuario) => await con.db("projeto_4info3").collection("Usuarios").findOneAndDelete({_id: new ObjectId(usuario.id)});

export const attUsuario = async (con, usuario) => {
    const _id = new ObjectId(usuario.id);
    delete usuario.id;
    await con.db("projeto_4info3").collection("Usuarios").replaceOne({ _id }, usuario);

    return `Usuario ${usuario.email} atualizado no MongoDB!`;
}