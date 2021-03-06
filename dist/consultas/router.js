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
router.get('/codigo/:tabla', function (req, res) {
    const query = "SELECT CODIGO FROM " + req.params.tabla + " ORDER BY CODIGO DESC LIMIT 1";
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows[0].CODIGO });
    });
});
router.get('/tablas/:tabla', function (req, res) {
    const query = "SELECT * FROM " + req.params.tabla + " ";
    console.log(query);
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});
router.get('/codigos/:tabla', function (req, res) {
    const query = "SELECT * FROM " + req.params.tabla + " ORDER BY CODIGO DESC";
    console.log(query);
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
router.get('/unidades/:obra', function (req, res) {
    const query = "SELECT U.CODIGO,U.UNAME, U.IDOBRA, U.IDINMUEBLE, I.INAME, U.IDNIVEL, N.NNAME, U.TIPO, U.DESCRIPCION, U.COMPLETADO, U.CLONADO  FROM UNIDADES U LEFT JOIN INMUEBLES I ON U.IDINMUEBLE = I.CODIGO LEFT JOIN NIVELES N ON U.IDNIVEL = N.CODIGO WHERE U.ESTADO = 1 && U.IDOBRA = '" + req.params.obra + "'";
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});
router.get('/unidad/:obra/:unidad', function (req, res) {
    const query = "SELECT U.CODIGO,U.UNAME, U.IDOBRA, U.IDINMUEBLE, I.INAME, U.IDNIVEL, N.NNAME, U.TIPO, U.DESCRIPCION, U.COMPLETADO, U.CLONADO FROM UNIDADES U LEFT JOIN INMUEBLES I ON U.IDINMUEBLE = I.CODIGO LEFT JOIN NIVELES N ON U.IDNIVEL = N.CODIGO WHERE U.ESTADO = 1 && U.IDOBRA = '" + req.params.obra + "' && U.CODIGO = '" + req.params.unidad + "'  ";
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});
router.get('/operaxuni/:obra', function (req, res) {
    const query = "SELECT O.ID, O.IDUNIDAD, U.UNAME, U.IDOBRA, O.IDOPERACION, OPE.NOMBRE AS OPERACION, OPE.UNIDAD, PRE.PRECIO, O.META, O.PROGRESO, O.CREADO, O.ACTUALIZADO, O.REVISOR, OP.NOMBRE, OP.APELLIDO, OP.APELLIDOMAT, O.COMPLETADO, O.ESTADO FROM OPERAXUNI O LEFT JOIN OPERARIOS OP ON O.REVISOR = OP.RUT LEFT JOIN UNIDADES U ON O.IDUNIDAD = U.CODIGO LEFT JOIN OPERACIONES OPE ON O.IDOPERACION = OPE.ID INNER JOIN PRECIOS PRE ON O.IDOPERACION = PRE.IDOPERACION && U.IDOBRA = PRE.IDOBRA WHERE O.ESTADO != 0 && U.IDOBRA = '" + req.params.obra + "' ";
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});
router.get('/pegas/verificaID', function (req, res) {
    const query = "SELECT ID FROM OPERAXUNI";
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
router.get('/operaciones/:obra', function (req, res) {
    const query = "SELECT P.ID AS ID, O.ID AS OPERACIONID, O.NOMBRE, O.UNIDAD, P.ID AS PRECIOID, P.IDOBRA, P.PRECIO FROM  OPERACIONES O INNER JOIN PRECIOS P ON O.ID = P.IDOPERACION WHERE P.IDOBRA = '" + req.params.obra + "' ";
    console.log('query ->', query);
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});
router.get('/trarealizados/:fechaIni/:fechaFin', function (req, res) {
    const query = "SELECT T.ID, T.RUT, OPE.NOMBRE, OPE.APELLIDO, OPE.APELLIDOMAT, T.IDOPERACION, OP.NOMBRE AS OPERACION, OP.UNIDAD, T.IDUNIDAD, U.UNAME, U.IDNIVEL, N.NNAME, N.IDINMUEBLE, I.INAME, U.IDOBRA, O.OBRANAME, T.PRECIO, T.CANTIDAD, T.TOTAL, T.PORCENTAJE, T.REVISOR, T.FECHA FROM TRAREALIZADOS T LEFT JOIN OPERARIOS OPE ON T.RUT = OPE.RUT LEFT JOIN OPERACIONES OP ON OP.ID = T.IDOPERACION LEFT JOIN UNIDADES U ON U.CODIGO = T.IDUNIDAD LEFT JOIN NIVELES N ON N.CODIGO = U.IDNIVEL LEFT JOIN INMUEBLES I ON I.CODIGO = N.IDINMUEBLE LEFT JOIN OBRAS O ON O.CODIGO = U.IDOBRA WHERE FECHA BETWEEN '" + req.params.fechaIni + "' AND '" + req.params.fechaFin + "'";
    console.log('query ->', query);
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});
router.get('/trabajosXUnidad/:unidad', function (req, res) {
    const query = "SELECT T.ID, T.RUT, OPE.NOMBRE, OPE.APELLIDO, OPE.APELLIDOMAT, T.IDOPERACION, OP.NOMBRE AS OPERACION, OP.UNIDAD, T.IDUNIDAD, U.UNAME, U.IDNIVEL, N.NNAME, N.IDINMUEBLE, I.INAME, U.IDOBRA, O.OBRANAME, T.PRECIO, T.CANTIDAD, T.TOTAL, T.PORCENTAJE, T.REVISOR, T.FECHA, T.workID FROM TRAREALIZADOS T LEFT JOIN OPERARIOS OPE ON T.RUT = OPE.RUT LEFT JOIN OPERACIONES OP ON OP.ID = T.IDOPERACION LEFT JOIN UNIDADES U ON U.CODIGO = T.IDUNIDAD LEFT JOIN NIVELES N ON N.CODIGO = U.IDNIVEL LEFT JOIN INMUEBLES I ON I.CODIGO = N.IDINMUEBLE LEFT JOIN OBRAS O ON O.CODIGO = U.IDOBRA WHERE T.IDUNIDAD = '" + req.params.unidad + "' ORDER BY T.workID DESC ";
    console.log('query ->', query);
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});
router.get('/unidadesXnivel/:nivel', function (req, res) {
    const query = " SELECT * FROM UNIDADES WHERE IDNIVEL = '" + req.params.nivel + "' ";
    console.log('query ->', query);
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});
router.get('/unidadesIn/:unidades', function (req, res) {
    // console.log('body', req.body)
    // const unidades = []
    // for (let u of req.body.unidades){
    // }
    const query = "SELECT * FROM UNIDADES WHERE CODIGO IN ( " + req.params.unidades + ") ";
    console.log('query unidadesIn ->', query);
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});
router.get('/operacionesXnivel/:unidades', function (req, res) {
    // const query = "SELECT * FROM OPERAXUNI WHERE IDUNIDAD IN ('U00024','U00023')"
    const query = "SELECT * FROM OPERAXUNI WHERE IDUNIDAD IN (" + req.params.unidades + ") ORDER BY IDUNIDAD ";
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
router.post('/unidades/:tarea', function (req, res) {
    console.log('tarea', req.params.tarea);
    let query = '';
    if (req.params.tarea === 'insert') {
        console.log('body de imprimir', req.body);
        query = "INSERT INTO UNIDADES (CODIGO, IDOBRA, IDINMUEBLE, IDNIVEL, UNAME, TIPO, DESCRIPCION, COMPLETADO, ESTADO, CLONADO) VALUES ('" + req.body.CODIGO + "', '" + req.body.IDOBRA + "','" + req.body.IDINMUEBLE + "','" + req.body.IDNIVEL + "', '" + req.body.UNAME + "','" + req.body.TIPO + "','" + req.body.DESCRIPCION + "', 0, 1, '" + req.body.CLONADO + "')";
    }
    else if (req.params.tarea === 'update') {
        query = "UPDATE UNIDADES SET UNAME = '" + req.body.UNAME + "', IDINMUEBLE ='" + req.body.IDINMUEBLE + "', IDNIVEL = '" + req.body.IDNIVEL + "', TIPO = '" + req.body.TIPO + "', ESTADO = '" + req.body.ESTADO + "' WHERE CODIGO = '" + req.body.CODIGO + "' ";
    }
    else if (req.params.tarea === 'borrar') {
        query = "UPDATE UNIDADES SET ESTADO = 0 WHERE CODIGO = '" + req.body.CODIGO + "' ";
    }
    else if (req.params.tarea === 'COMPLETADO') {
        query = "UPDATE UNIDADES SET COMPLETADO = 1 WHERE CODIGO = '" + req.body.CODIGO + "' ";
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
router.post('/operaxuni/:tarea', function (req, res) {
    console.log('pega', req.params.tarea);
    let query = '';
    if (req.params.tarea === 'insert') {
        console.log('body de imprimir', req.body);
        query = "INSERT INTO OPERAXUNI (IDUNIDAD, IDOPERACION, META, PROGRESO, CREADO, ACTUALIZADO, COMPLETADO, ESTADO) VALUES ('" + req.body.IDUNIDAD + "', '" + req.body.IDOPERACION + "','" + req.body.META + "','" + req.body.PROGRESO + "', '" + req.body.CREADO + "', '" + req.body.ACTUALIZADO + "','" + req.body.COMPLETADO + "','" + req.body.ESTADO + "')";
    }
    else if (req.params.tarea === 'update') {
        query = "UPDATE OPERAXUNI SET META = '" + req.body.META + "', IDOPERACION ='" + req.body.IDOPERACION + "', PROGRESO = '" + req.body.PROGRESO + "', REVISOR = '" + req.body.REVISOR + "', ACTUALIZADO = '" + req.body.ACTUALIZADO + "', COMPLETADO = '" + req.body.COMPLETADO + "' WHERE ID = '" + req.body.ID + "' ";
    }
    else if (req.params.tarea === 'borrar') {
        query = "UPDATE OPERAXUNI SET ESTADO = 0 WHERE ID = '" + req.body.ID + "' ";
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
router.post('/precios/:tarea', function (req, res) {
    console.log('precio', req.params.tarea);
    let query = '';
    if (req.params.tarea === 'insert') {
        console.log('body de imprimir', req.body);
        query = "INSERT INTO PRECIOS ( IDOPERACION, IDOBRA, PRECIO ) VALUES ('" + req.body.IDOPERACION + "', '" + req.body.IDOBRA + "','" + req.body.PRECIO + "')";
    }
    else if (req.params.tarea === 'update') {
        query = "UPDATE PRECIOS SET PRECIO = '" + req.body.PRECIO + "' WHERE ID = " + req.body.ID + " ";
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
router.post('/usuarios/:tarea', function (req, res) {
    console.log('precio', req.params.tarea);
    let query = '';
    if (req.params.tarea === 'insert') {
        console.log('body de imprimir', req.body);
        query = "INSERT INTO USUARIOS ( NOMBRE, APELLIDO, EMAIL, RUT, ACCESO, ESTADO ) VALUES ('" + req.body.nombre + "', '" + req.body.apellido + "','" + req.body.email + "','" + req.body.rut + "','" + req.body.acceso + "',1)";
    }
    console.log('query ->', query);
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});
router.post('/trabajo', function (req, res) {
    console.log("Grabo trabajos", req.body);
    let DATOS = '';
    for (let x in req.body) {
        DATOS += "( '" + req.body[x].RUT + "'," + req.body[x].IDOPERACION + "," + req.body[x].PRECIO + "," + req.body[x].PORCENTAJE + "," + req.body[x].CANTIDAD + "," + req.body[x].TOTAL + ",'" + req.body[x].IDUNIDAD + "','" + req.body[x].FECHA + "','" + req.body[x].REVISOR + "','" + req.body[x].workID + "'),";
    }
    DATOS = DATOS.slice(0, -1);
    console.log(DATOS);
    const query = "INSERT INTO TRAREALIZADOS ( RUT, IDOPERACION, PRECIO, PORCENTAJE, CANTIDAD, TOTAL, IDUNIDAD, FECHA, REVISOR, workID ) VALUES" + DATOS;
    console.log('query ->', query);
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});
router.post('/deleteTrabajo', function (req, res) {
    // const query = "DELETE FROM TRAREALIZADOS WHERE IDUNIDAD = '" + req.body.IDUNIDAD + "' AND IDOPERACION = " + req.body.IDOPERACION + " AND FECHA = '" + req.body.FECHA + "' ";
    const query = "DELETE FROM TRAREALIZADOS WHERE workID = '" + req.body.workID + "' ";
    console.log('query ->', query);
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});
router.post('/clonarUnidades', function (req, res) {
    console.log("Clonando Niveles", req.body);
    let DATOS = '';
    for (let x in req.body) {
        DATOS += "( '" + req.body[x].CODIGO + "','" + req.body[x].IDOBRA + "','" + req.body[x].IDINMUEBLE + "','" + req.body[x].IDNIVEL + "','" + req.body[x].UNAME + "','" + req.body[x].TIPO + "','" + req.body[x].DESCRIPCION + "', 0, 1,'" + req.body[x].CLONADO + "'),";
    }
    DATOS = DATOS.slice(0, -1);
    console.log(DATOS);
    const query = "INSERT INTO UNIDADES (CODIGO, IDOBRA, IDINMUEBLE, IDNIVEL, UNAME, TIPO, DESCRIPCION, COMPLETADO, ESTADO, CLONADO) VALUES " + DATOS;
    console.log('query ->', query);
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});
router.post('/clonarOperaciones', function (req, res) {
    console.log("Clonando Operaciones", req.body);
    let DATOS = '';
    for (let x in req.body) {
        DATOS += "( '" + req.body[x].IDUNIDAD + "','" + req.body[x].IDOPERACION + "'," + req.body[x].META + "," + req.body[x].PROGRESO + ",'" + req.body[x].CREADO + "','" + req.body[x].ACTUALIZADO + "'," + req.body[x].COMPLETADO + ",'" + req.body[x].ESTADO + "'),";
    }
    DATOS = DATOS.slice(0, -1);
    console.log(DATOS);
    const query = "INSERT INTO OPERAXUNI ( IDUNIDAD, IDOPERACION, META, PROGRESO, CREADO, ACTUALIZADO, COMPLETADO, ESTADO ) VALUES" + DATOS;
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
