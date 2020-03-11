"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const server_1 = require("../classes/server");
const router = express_1.Router();
//Mantenedores
router.get('/obras', function (req, res) {
    const query = "SELECT * FROM OBRAS";
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});
router.get('/obras/:id', function (req, res) {
    const query = "SELECT * FROM OBRAS WHERE ID = '" + req.params.id + "' ";
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});
router.get('/operarios', function (req, res) {
    const query = "SELECT * FROM OPERARIOS";
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});
router.get('/operarios/:id', function (req, res) {
    const query = "SELECT * FROM operarios WHERE id = '" + req.params.id + "' ";
    console.log('query ->', query);
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});
router.post('/obras', function (req, res) {
    console.log('body de imprimir', req.body);
    const query = "INSERT INTO OBRAS (CODIGO, OBRANAME, FECHAINI, RESPONSABLE, REGION, COMUNA, DIRECCION,ESTADO) VALUES ('" + req.body.codigo + "', '" + req.body.obraname + "', '" + req.body.fechaINI + "', '" + req.body.responsable + "', '" + req.body.region + "', '" + req.body.comuna + "', '" + req.body.direccion + "', '" + req.body.estado + "')";
    console.log('query ->', query);
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});
router.get('/test', function (req, res) {
    res.json({ resultado: 'ok', datos: 'funciona' });
});
exports.default = router;
