import { ObjectId } from "mongodb";
import 'dotenv/config';

export const getItensGaragem = async (con) => await con.db("projeto_4info3").collection("carros").find({}).toArray();
export const getItemGaragem = async (con, carro) => await con.db("projeto_4info3").collection("carros").findOne({_id: new ObjectId(carro.id)});

export const createItemGaragem = async (con, carro) => {
    await con.db("projeto_4info3").collection("carros").insertOne(carro);

    // throw new Error("tentando errar");
    return `Carro ${carro.marca} adicionado ao MongoDB!`;
}

export const deleteItemGaragem = async (con, carro) => await con.db("projeto_4info3").collection("carros").findOneAndDelete({_id: new ObjectId(carro.id)});

export const attItemGaragem = async (con, carro) => {
    const _id = new ObjectId(carro.id);
    delete carro.id;
    await con.db("projeto_4info3").collection("carros").replaceOne({ _id }, carro);

    return `Carro ${carro.marca} atualizado no MongoDB!`;
}

export const mongo = { getItemGaragem, getItensGaragem, createItemGaragem, deleteItemGaragem, attItemGaragem };
export default mongo;
