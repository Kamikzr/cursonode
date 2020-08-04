const express = require('express');
const app = express();
const clientes = require('./routes/api/clientes')
const port = 3000;

app.use('api/clientes', clientes);

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`Executing on port ${port}`);
})