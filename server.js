import express from 'express';
import { routerAlunos } from './routes/alunos.js';
import { routerUsuario } from './routes/usuarios.js';
import { autenticarToken } from './middlewares/auth.js';
import { loginUsuario } from './controller/auth.js';

const app = express();
app.use(express.json());

app.use('/alunos', autenticarToken, routerAlunos);

app.use('/usuarios', autenticarToken, routerUsuario);

app.post('/login', loginUsuario);

app.listen(3000, async () => {
    console.log(`Servidor rodando em http://localhost:3000`);
});