const express = require("express");
const router = express.Router();
const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'root',
    host: 'localhost',
    database: 'cursonode',
    password: 'password',
    port: 5432,
});

router.get('/test', (req, res) => {
    res.send('Este serviço está funcionando')
});

router.get('/', async (req, res) => {
    let client;

    try {
        client = await pool.connect();

        await client.query('select * from clientes')
            .then(respostaBanco => {
                res.status(200).json(respostaBanco.rows)
            })
    } catch (err) {
        res.status(500).send()
    } finally {
        if (client)
            client.end();
    }
})

router.get('/:id', async (req, res) => {
    let client;

    try {
        client = await pool.connect();

        await client.query('select * from clientes where id = ' + req.params.id)
            .then(respostaBanco => {
                if (respostaBanco.rowCount == 0)
                    res.status(404).send()
                else
                    res.status(200).json(respostaBanco.rows[0])
            })
    } catch (err) {
        res.status(500).send()
    } finally {
        if (client)
            client.end();
    }
})

router.post('/', async (req, res) => {
    const cliente = req.body;

    let client;

    // validações
    if (cliente.tipo !== 'F' && cliente.tipo !== 'J')
        res.status(400).send({ "erro": "TIPO DE CLIENTE INVÁLIDO" })

    try {
        client = await pool.connect();

        await client.query("select nextval('clientes_id_seq')")
            .then(async respostaBanco => {
                const idNovoCliente = respostaBanco.rows[0].nextval;

                await client.query('insert into clientes (id, tipo, nome) values ($1, $2, $3)', [idNovoCliente, cliente.tipo, cliente.nome])
                    .then(async () => {

                        await client.query('select * from clientes where id = ' + idNovoCliente)
                            .then(respostaGet => {
                                if (respostaGet.rowCount == 0)
                                    res.status(404).send()
                                else
                                    res.status(201).json(respostaGet.rows[0])
                            })
                    })
            })

    } catch (err) {
        res.status(500).send()
    } finally {
        if (client)
            client.end();
    }
})

router.put('/:id', async (req, res) => {
    const cliente = req.body;
    const idCliente = req.params.id;

    let client;

    try {
        client = await pool.connect();

        await client.query('update clientes set tipo = $1, nome = $2 where id = ' + idCliente,
            [cliente.tipo, cliente.nome])
            .then(async () => {
                await client.query('select * from clientes where id = ' + idCliente)
                    .then(respostaGet => {
                        if (respostaGet.rowCount == 0)
                            res.status(404).send()
                        else
                            res.status(200).json(respostaGet.rows[0])
                    })
            })

    } catch (err) {
        res.status(500).send()
    } finally {
        if (client)
            client.end();
    }
})

router.delete('/:id', async (req, res) => {
    let client;

    try {
        client = await pool.connect();

        await client.query('delete from clientes where id = ' + req.params.id)
            .then(() => {
                res.status(200).send()
            })
    } catch (err) {
        res.status(500).send()
    } finally {
        if (client)
            client.end();
    }
})

module.exports = router;