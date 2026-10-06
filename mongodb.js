import { ObjectId } from "mongodb";
import 'dotenv/config';

const getItensGaragem = async (con) => await con.db("projeto_4info3").collection("carros").find({}).toArray();
const getItemGaragem = async (con, carro) => await con.db("projeto_4info3").collection("carros").findOne({_id: new ObjectId(carro.id)});

const createItemGaragem = async (con, carro) => {
    await con.db("projeto_4info3").collection("carros").insertOne(carro);

    // throw new Error("tentando errar");
    return `Carro ${carro.marca} adicionado ao MongoDB!`;
}

const deleteItemGaragem = async (con, carro) => await con.db("projeto_4info3").collection("carros").findOneAndDelete({_id: new ObjectId(carro.id)});

const attItemGaragem = async (con, carro) => {
    const _id = new ObjectId(carro.id);
    delete carro.id;
    await con.db("projeto_4info3").collection("carros").replaceOne({ _id }, carro);

    return `Carro ${carro.marca} atualizado no MongoDB!`;
}

const mongo = { getItemGaragem, getItensGaragem, createItemGaragem, deleteItemGaragem, attItemGaragem };
export default mongo;
