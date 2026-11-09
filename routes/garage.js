import express from "express";
import {
    getCarros,
    getCarro,
    createCarro,
    deleteCarro,
    attCarro
} from "../controller/garage.js";

export const routerGaragem = express.Router();

routerGaragem.get('/', getCarros);

routerGaragem.get('/:id', getCarro);

routerGaragem.post('/', createCarro);

routerGaragem.delete('/:id', deleteCarro);

routerGaragem.put('/:id', attCarro);
