"use strict";
const server_1 = require("../classes/server");
const operarios = function (sql) {
    //
    const query = "SELECT * FROM operarios";
    //
    // console.log('desde empresas->', query);
    console.log('buscando operarios');
    //
    var request = new sql.Request();
    return request.query(query)
        .then((results) => { return results.recordset; })
        .catch((error) => {
        console.log('error en la consulta', error);
        return 'error en la consulta';
    });
};
const operariosDos = function (sql) {
    const query = 'SELECT * FROM operarios';
    server_1.conex.query({ sql: query, timeout: 4000 }, function (err, res, fields) {
        if (err == null) {
            console.log(res);
            res.json({ res, resultado: 'ok' });
        }
        else {
            //res.json(er.code);
            console.log(err);
            res.json({ resultado: 'problemas', texto: err.code });
        }
    });
};
module.exports = {
    operarios,
    operariosDos
};
