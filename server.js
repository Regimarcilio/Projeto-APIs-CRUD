import express from 'express';
import { routerGaragem } from './routes/garage.js';
import { routerUsuario } from './routes/usuarios.js';
import { autenticarToken } from './middlewares/auth.js';
import { loginUsuario } from './controller/auth.js';

const app = express();
app.use(express.json());

app.use('/garagem', autenticarToken, routerGaragem);

app.use('/usuarios', autenticarToken, routerUsuario);

app.post('/login', loginUsuario);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
