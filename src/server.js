require('dotenv-safe').config();

const express = require('express');

const Routes = require('../src/routes');

const app = express();
const port = process.env.PORT_DEVELOPMENT;

app.listen(port, () => console.log(`[SERVER] O servidor está rodando na porta ${port}`));

app.use(Routes);