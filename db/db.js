import { MongoClient } from "mongodb";
import 'dotenv/config';

const conexao = async () => {
    const URI = process.env.MONGODB_URI;
    const client = new MongoClient(URI);
    const con = await client.connect();

    return con;
}

export const manipularDB = async (carro, callback) => {
    let resultado;
    try {
        const con = await conexao();
        resultado = await callback(con, carro);
        con.close();
    } catch (e) {
        resultado = null;
        console.error(e);
    } finally {
        return resultado;
    }
}
