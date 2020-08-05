const express = require('express');
const app = express();
const clientes = require('./routes/api/clientes')
const port = 3000;
const bodyParser = require('body-parser');

// Middlware para ler json
app.use(bodyParser.json())

app.use('api/clientes', clientes);

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`Executing on port ${port}`);
})