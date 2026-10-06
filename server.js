import express from 'express';
import { manipularDB } from './db.js';
import mongo from './mongodb.js';

const app = express();
app.use(express.json());

app.get('/garagem', async (req, res) => {
    try {
        const carros = await manipularDB({}, mongo.getItemGaragem);

        if (!carros[0]){
            res.status(404).json('Nenhum carro encontrado no banco de dados!');
        } else {
            res.status(200).json(carros);
        }

    } catch (e) {
        console.error(e.message)
    } 
});

app.get('/garagem/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const carro = await manipularDB({ id }, mongo.getItensGaragem);
        
        if (carro == null) {
            res.status(404).json('Carro não encontrado no banco de dados!');
        } else {
            res.status(200).json(carro)
        }
    } catch (e) {
        console.error(e.message)
    } 
});

app.post('/garagem', async (req, res) => {
    try {
        const carro = req.body.carro;
        const todosOsCarros = await manipularDB({}, mongo.getItensGaragem);
        let valido = true;

        for (let a of todosOsCarros) {
            if (a.modelo == carro.modelo) {
                valido = false;
            }
        }

        if (valido) {
            const carroAdicionado = await manipularDB(carro, mongo.createItemGaragem)
    
            if (carroAdicionado == null) {
                res.status(404).json('Não foi possível adicionar o carro no banco de dados!');
            } else {
                res.status(201).json(carroAdicionado);
            }
        } else {
            res.status(409).json(`O modelo ${carro.modelo} já está registrado no banco de dados!`);
        }
    } catch (e) {
        console.error(e);
    }
});

app.delete('/garagem/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const resposta = await manipularDB({ id }, mongo.deleteItemGaragem);
    
        if (resposta == null) {
            res.status(404).json('Carro não encontrado no banco de dados!');
        } else {
            res.status(200).json(`Carro ${id} deletado do banco de dados!`);
        }
    } catch (e) {
        console.error(e.message)
    }
})

app.put('/garagem/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const carro = req.body.carro;
        const carroExistente = await manipularDB({ id }, mongo.getItensGaragem)

        if (carroExistente == null) {
            res.status(404).json('Carro não encontrado no banco de dados!');
        } else {
            for (let [chave, valor] of Object.entries(carro)){
                if (valor == ''){
                    delete carroExistente[chave];
                } else {
                    carroExistente[chave] = valor;
                }
            }
    
            delete carroExistente._id;
            carroExistente.id = id;
    
            const resposta = await manipularDB(carroExistente, mongo.attItemGaragem)
            res.status(200).json(resposta);
        } 
    } catch (e) {
        console.error(e.message)
    }
});

app.listen(3007, async () => {
    console.log(`Servidor rodando em http://localhost:3007`);
});