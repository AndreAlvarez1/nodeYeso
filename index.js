"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./classes/server"));
var sql = require('mysql');
var server = server_1.default.instance;
// Para las rutas
var router_1 = __importDefault(require("./consultas/router"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
//////// Utilidades ////////
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
server.app.use(cors_1.default({ origin: true, credentials: true }));
//// Rutas de servicios ////
server.app.use('/', router_1.default);
server.start(function () {
    console.log("Servidor corriendo en el puerto " + server.port);
});
