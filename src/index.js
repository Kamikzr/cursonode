const express = require('express');
const app = express();
const clientes = require('./routes/api/clientes');
const bodyParser = require('body-parser');
const port = 3000;

// Middleware para leitura de json
app.use(bodyParser.json());

app.use('/api/clientes', clientes);

//Dfinindo a porta para o servidor
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});