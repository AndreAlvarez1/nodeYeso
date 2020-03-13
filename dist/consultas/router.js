"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const server_1 = require("../classes/server");
const router = express_1.Router();
/////=============================================/////
/////=============================================/////
/////=================== GETS ====================/////
/////=============================================/////
/////=============================================/////
router.get('/tablas/:tabla', function (req, res) {
    const query = "SELECT * FROM " + req.params.tabla + " ";
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});
router.get('/niveles', function (req, res) {
    const query = "SELECT N.CODIGO, N.IDOBRA, I.INAME, N.IDINMUEBLE, N.NNAME, N.ESTADO FROM NIVELES N LEFT JOIN INMUEBLES I ON N.IDINMUEBLE = I.CODIGO WHERE N.ESTADO = 1";
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});
router.get('/obras/:id', function (req, res) {
    const query = "SELECT * FROM OBRAS WHERE CODIGO = '" + req.params.id + "' ";
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});
router.get('/operarios/:id', function (req, res) {
    const query = "SELECT * FROM OPERARIOS WHERE RUT = '" + req.params.id + "' ";
    console.log('query ->', query);
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});
/////=============================================/////
/////=============================================/////
/////=============== POST & UPDATES ==============/////
/////=============================================/////
/////=============================================/////
router.post('/obras/:tarea', function (req, res) {
    let query = '';
    if (req.params.tarea === 'insert') {
        query = "INSERT INTO OBRAS (CODIGO, OBRANAME, FECHAINI, RESPONSABLE, REGION, COMUNA, DIRECCION,ESTADO) VALUES ('" + req.body.CODIGO + "', '" + req.body.OBRANAME + "', '" + req.body.FECHAINI + "', '" + req.body.RESPONSABLE + "', '" + req.body.REGION + "', '" + req.body.COMUNA + "', '" + req.body.DIRECCION + "', '" + req.body.ESTADO + "')";
    }
    else {
        query = "UPDATE OBRAS SET OBRANAME = '" + req.body.OBRANAME + "', FECHAINI = '" + req.body.FECHAINI + "', RESPONSABLE = '" + req.body.RESPONSABLE + "', REGION = '" + req.body.REGION + "', COMUNA = '" + req.body.COMUNA + "', DIRECCION = '" + req.body.DIRECCION + "', ESTADO = '" + req.body.ESTADO + "' WHERE CODIGO = '" + req.body.CODIGO + "' ";
    }
    console.log('query ->', query);
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});
router.post('/obras/:tarea', function (req, res) {
    console.log('tarea', req.params.tarea);
    let query = '';
    if (req.params.tarea === 'insert') {
        query = "INSERT INTO OPERARIOS (RUT, NOMBRE, APELLIDO, APELLIDOMAT, CEL, TIPO, ESTADO) VALUES ('" + req.body.RUT + "', '" + req.body.NOMBRE + "', '" + req.body.APELLIDO + "', '" + req.body.APELLIDOMAT + "', '" + req.body.CEL + "', '" + req.body.TIPO + "', '" + req.body.ESTADO + "')";
    }
    else if (req.params.tarea === 'update') {
        query = "UPDATE OPERARIOS SET NOMBRE = '" + req.body.NOMBRE + "', APELLIDO = '" + req.body.APELLIDO + "', APELLIDOMAT = '" + req.body.APELLIDOMAT + "', CEL = '" + req.body.CEL + "', TIPO = '" + req.body.TIPO + "' WHERE RUT = '" + req.body.RUT + "' ";
    }
    else if (req.params.tarea === 'borrar') {
        query = "UPDATE OPERARIOS SET ESTADO = 0 WHERE RUT = '" + req.body.RUT + "' ";
    }
    else {
        return;
    }
    console.log('query ->', query);
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});
router.post('/operarios/:tarea', function (req, res) {
    console.log('tarea', req.params.tarea);
    let query = '';
    if (req.params.tarea === 'insert') {
        console.log('body de imprimir', req.body);
        query = "INSERT INTO OPERARIOS (RUT, NOMBRE, APELLIDO, APELLIDOMAT, CEL, TIPO, ESTADO) VALUES ('" + req.body.RUT + "', '" + req.body.NOMBRE + "', '" + req.body.APELLIDO + "', '" + req.body.APELLIDOMAT + "', '" + req.body.CEL + "', '" + req.body.TIPO + "', '" + req.body.ESTADO + "')";
    }
    else if (req.params.tarea === 'update') {
        query = "UPDATE OPERARIOS SET NOMBRE = '" + req.body.NOMBRE + "', APELLIDO = '" + req.body.APELLIDO + "', APELLIDOMAT = '" + req.body.APELLIDOMAT + "', CEL = '" + req.body.CEL + "', TIPO = '" + req.body.TIPO + "' WHERE RUT = '" + req.body.RUT + "' ";
    }
    else if (req.params.tarea === 'borrar') {
        query = "UPDATE OPERARIOS SET ESTADO = 0 WHERE RUT = '" + req.body.RUT + "' ";
    }
    else {
        return;
    }
    console.log('query ->', query);
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});
router.post('/inmuebles/:tarea', function (req, res) {
    console.log('tarea', req.params.tarea);
    let query = '';
    if (req.params.tarea === 'insert') {
        console.log('body de imprimir', req.body);
        query = "INSERT INTO INMUEBLES (CODIGO, IDOBRA, INAME, ESTADO) VALUES ('" + req.body.CODIGO + "', '" + req.body.IDOBRA + "', '" + req.body.INAME + "', 1)";
    }
    else if (req.params.tarea === 'update') {
        query = "UPDATE INMUEBLES SET INAME = '" + req.body.INAME + "' WHERE CODIGO = '" + req.body.CODIGO + "' ";
    }
    else if (req.params.tarea === 'borrar') {
        query = "UPDATE INMUEBLES SET ESTADO = 0 WHERE CODIGO = '" + req.body.CODIGO + "' ";
    }
    else {
        return;
    }
    console.log('query ->', query);
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});
router.post('/niveles/:tarea', function (req, res) {
    console.log('tarea', req.params.tarea);
    let query = '';
    if (req.params.tarea === 'insert') {
        console.log('body de imprimir', req.body);
        query = "INSERT INTO NIVELES (CODIGO, IDOBRA, IDINMUEBLE, NNAME, ESTADO) VALUES ('" + req.body.CODIGO + "', '" + req.body.IDOBRA + "','" + req.body.IDINMUEBLE + "', '" + req.body.NNAME + "', 1)";
    }
    else if (req.params.tarea === 'update') {
        query = "UPDATE NIVELES SET NNAME = '" + req.body.NNAME + "' WHERE CODIGO = '" + req.body.CODIGO + "' ";
    }
    else if (req.params.tarea === 'borrar') {
        query = "UPDATE NIVELES SET ESTADO = 0 WHERE CODIGO = '" + req.body.CODIGO + "' ";
    }
    else {
        return;
    }
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
