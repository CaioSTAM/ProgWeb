import express from 'express';
import { engine } from 'express-handlebars';
import dotenv from 'dotenv';
import path from 'path';
import router from './router/router';
import validateEnv from './utils/validateEnv';
import { logger } from './middlewares/logger';
import { registerHelpers } from './helpers/handlebars.helpers';
import majorRoutes from './router/major.routes';
import userRoutes from './router/user.routes';

// Carregar variáveis de ambiente
dotenv.config();  
validateEnv();         // validar com envalid

const app = express();
const port = process.env.PORT || 3000;

// Configurar Handlebars
const hbsEngine = engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  helpers: {} // helper vazio por padrão
});

// Registrar helpers após inicializar a engine
registerHelpers();

app.engine('handlebars', hbsEngine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));


// Arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Middleware para parse de JSON
app.use(express.json());

app.use(logger('simples'));
app.use(router);
app.use('/majors', majorRoutes);
app.use('/users', userRoutes);


// Rota de teste
app.get('/', (req, res) => {
  res.send('Express com TypeScript ok');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
