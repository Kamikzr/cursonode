const express = require('express');
const Pool = require('pg').Pool;

const router = express.Router();

router.get('/test', (req, res) => {
    res.send('This service is working!');
})

router.get('/', async (req, res) => {
    let client

    try{
        client = await Pool.connect();

        await client.query('select * from clients')
            .then(respostaBanco => {
                res.status(200).json(respostaBanco.rows)
            })
    } catch (err) {
        res.status(500).send();
    } finally {
        if (client)
            client.end();
    }
    
})

router.get('/:id', async (req, res) => {
    try{
        client = await Pool.connect();

        await client.query('select * from clients where id =' + req.params.id)
        .then(respostaBanco => {
            if (respostaBanco.rowCount == 0)
                res.status(404).send();
            else
                res.status(200).json(respostaBanco.rows[0]);
        })
    } catch (err) {
        console.log(err);
        res.status(500).send();
    } finally {
        if (client)
            client.end();
    }
})

router.post('/', async (req, res) => {
    const cliente = req.body;

    let client;

    try {
        client = await Pool.connect();

        await client.query('insert into clients (tipo, nome) values ($1, $2', [cliente.tipo, cliente.nome])
        .then(() => {
            res.status(201).send();
        })

    } catch (err) {
        res.status(500).send()
    } finally {
        if (client)
        client.end();
    }
})

module.exports = router; 
