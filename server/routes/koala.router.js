const express = require('express');
const koalaRouter = express.Router();

const pool = require('../module/pool');
// GET


koalaRouter.get('/', (req, res) => {
    console.log('get request made');
    let queryText = 'SELECT * from koala ORDER BY id asc';
    pool.query(queryText)
    .then((result) =>{
        res.send(result.rows);
    });
});


// POST
koalaRouter.post('/', (req, res) => {
    console.log('post request made');
    // console.log(req.body);
    // console.log(req.body.name);
    const koalaToSend = req.body;
    console.log(koalaToSend);
    const queryText = `
    INSERT INTO "koala" ("name", "age", "gender", "ready_to_transfer", "notes")
    VALUES ('${koalaToSend.name}', ${(koalaToSend.age)}, '${koalaToSend.gender}', '${koalaToSend.readyForTransfer}', '${koalaToSend.notes}');
    `;
    console.log(queryText);  
    pool.query(queryText)
    .then((result) => {
        console.log(result);
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log(error);
        res.sendStatus(500);
    })
});

// PUT
koalaRouter.put('/:id', (req, res) => {
    console.log('put request made');
    console.log(req.params.id);
    const queryText = `UPDATE "koala" SET "ready_to_transfer"='Y' WHERE "id"=${req.params.id};`;
    pool.query(queryText)
    .then((response) => {
        console.log(response);
        res.sendStatus(201);
    });
});

// DELETE
koalaRouter.delete('/:id', (req, res) => {
    console.log('delete request made');
    console.log(req.params.id);
    const queryText = `DELETE from "koala" WHERE "id" = ${req.params.id};`;
    pool.query(queryText)
    .then((result) => {
        res.sendStatus(204);
    })
    .catch((error) => {
        console.log('error with delete request', error);
        res.sendStatus(500);
    });
});

module.exports = koalaRouter;