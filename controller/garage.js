import { manipularDB } from '../db/db.js';
import * as dbGaragem from '../db/garagedb.js';

export const getCarros = async (req, res) => {
    try {
        const carros = await manipularDB({}, dbGaragem.getItensGaragem);

        if (!carros || !carros[0]) {
            return res.status(404).json('Nenhum carro encontrado no banco de dados!');
        }

        return res.status(200).json(carros);
    } catch (e) {
        return res.status(500).json('Erro interno! Tente novamente em alguns instantes!');
    }
};

export const getCarro = async (req, res) => {
    const id = req.params.id;

    try {
        const carro = await manipularDB({ id }, dbGaragem.getItemGaragem);

        if (carro == null) {
            return res.status(404).json('Carro não encontrado no banco de dados!');
        }

        return res.status(200).json(carro);
    } catch (e) {
        return res.status(500).json('Erro interno! Tente novamente em alguns instantes!');
    }
};

export const createCarro = async (req, res) => {
    try {
        const carro = req.body.carro;

        if (!carro) {
            return res.status(400).json('Informe os dados do carro no campo "carro"!');
        }

        const todosOsCarros = await manipularDB({}, dbGaragem.getItensGaragem);
        const modeloJaExiste = todosOsCarros?.some((a) => a.modelo === carro.modelo);

        if (modeloJaExiste) {
            return res.status(409).json(`O modelo ${carro.modelo} já está registrado no banco de dados!`);
        }

        const carroAdicionado = await manipularDB(carro, dbGaragem.createItemGaragem);

        if (carroAdicionado == null) {
            return res.status(500).json('Não foi possível adicionar o carro no banco de dados!');
        }

        return res.status(201).json(carroAdicionado);
    } catch (e) {
        return res.status(500).json('Erro interno! Tente novamente em alguns instantes!');
    }
};

export const deleteCarro = async (req, res) => {
    try {
        const id = req.params.id;
        const resposta = await manipularDB({ id }, dbGaragem.deleteItemGaragem);

        if (resposta == null) {
            return res.status(404).json('Carro não encontrado no banco de dados!');
        }

        return res.status(200).json(`Carro ${id} deletado do banco de dados!`);
    } catch (e) {
        return res.status(500).json('Erro interno! Tente novamente em alguns instantes!');
    }
};

export const attCarro = async (req, res) => {
    try {
        const id = req.params.id;
        const carro = req.body.carro;

        if (!carro) {
            return res.status(400).json('Informe os dados do carro no campo "carro"!');
        }

        const carroExistente = await manipularDB({ id }, dbGaragem.getItemGaragem);

        if (carroExistente == null) {
            return res.status(404).json('Carro não encontrado no banco de dados!');
        }

        for (const [chave, valor] of Object.entries(carro)) {
            if (valor === '') {
                delete carroExistente[chave];
            } else {
                carroExistente[chave] = valor;
            }
        }

        delete carroExistente._id;
        carroExistente.id = id;

        const resposta = await manipularDB(carroExistente, dbGaragem.attItemGaragem);

        return res.status(200).json(resposta);
    } catch (e) {
        return res.status(500).json('Erro interno! Tente novamente em alguns instantes!');
    }
};
