import { manipularDB } from '../db/db.js';
import * as dbAlunos from '../db/alunos.js';

export const getAlunos = async (req, res) => {
    try {
        const alunos = await manipularDB({}, dbAlunos.getAlunos);

        if (!alunos[0]){
            res.status(404).json('Nenhum aluno encontrado no banco de dados!');
        } else {
            res.status(200).json(alunos);
        }

    } catch (e) {
        console.error(e.message)
    } 
};

export const getAluno = async (req, res) => {
    const id = req.params.id;

    try {
        const aluno = await manipularDB({ id }, dbAlunos.getAluno);
        
        if (aluno == null) {
            res.status(404).json('Aluno não encontrado no banco de dados!');
        } else {
            res.status(200).json(aluno)
        }
    } catch (e) {
        console.error(e.message)
    } 
};

export const createAluno = async (req, res) => {
    try {
        const aluno = req.body.aluno;
        const todosOsAlunos = await manipularDB({}, dbAlunos.getAlunos);
        let valido = true;

        for (let a of todosOsAlunos) {
            if (a.email == aluno.email) {
                valido = false;
            }
        }

        if (valido) {
            const alunoAdicionado = await manipularDB(aluno, dbAlunos.createAluno)
    
            if (alunoAdicionado == null) {
                res.status(404).json('Não foi possível adicionar o aluno no banco de dados!');
            } else {
                res.status(201).json(alunoAdicionado);
            }
        } else {
            res.status(409).json(`O email ${aluno.email} já está registrado no banco de dados!`);
        }
    } catch (e) {
        console.error(e);
    }
};

export const deleteAluno = async (req, res) => {
    try {
        const id = req.params.id;
        const resposta = await manipularDB({ id }, dbAlunos.deleteAluno);
    
        if (resposta == null) {
            res.status(404).json('Aluno não encontrado no banco de dados!');
        } else {
            res.status(200).json(`Aluno ${id} deletado do banco de dados!`);
        }
    } catch (e) {
        console.error(e.message)
    }
};

export const attAluno = async (req, res) => {
    try {
        const id = req.params.id;
        const aluno = req.body.aluno;
        const alunoExistente = await manipularDB({ id }, dbAlunos.getAluno)
    
        if (alunoExistente == null) {
            res.status(404).json('Aluno não encontrado no banco de dados!');
        } else {
            for (let [chave, valor] of Object.entries(aluno)){
                if (valor == ''){
                    delete alunoExistente[chave];
                } else {
                    alunoExistente[chave] = valor;
                }
            }
    
            delete alunoExistente._id;
            alunoExistente.id = id;
    
            const resposta = await manipularDB(alunoExistente, dbAlunos.attAluno)
            res.status(200).json(resposta);
        } 
    } catch (e) {
        console.error(e.message)
    }
};