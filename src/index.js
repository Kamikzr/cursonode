const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listem(port, () => {
    console.log('Server rodando na porta 3000');
})