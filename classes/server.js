"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var environment_1 = require("../global/environment");
var socket_io_1 = __importDefault(require("socket.io"));
var http_1 = __importDefault(require("http"));
var conexiones_1 = require("../conexiones/conexiones");
var sql = require('mysql');
exports.conex = sql.createConnection(conexiones_1.YESO);
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
        this.port = environment_1.SERVER_PORT;
        // Config Sockets
        this.httpServer = new http_1.default.Server(this.app);
        this.io = socket_io_1.default(this.httpServer);
        // this.escucharSockets();
    }
    Object.defineProperty(Server, "instance", {
        get: function () {
            return this._intance || (this._intance = new this());
        },
        enumerable: true,
        configurable: true
    });
    // private escucharSockets() {
    //     console.log('escuchando conexiones - sockets');
    //     this.io.on('connection', cliente => {
    //         console.log('Nuevo Cliente conectado', cliente.id);
    //         // Conectar Cliente
    //         socket.conectarCliente( cliente );
    //         // Configurar Usuario
    //         socket.configurarUsuario(cliente, this.io);
    //         // Obtener Usuarios activos
    //         socket.obtenerUsuarios(cliente, this.io);
    //         // Mensajes
    //         socket.mensaje(cliente, this.io);
    //         // Desconectar
    //         socket.desconectar(cliente, this.io);
    //         });
    // }
    Server.prototype.start = function (callback) {
        this.httpServer.listen(this.port, callback);
    };
    return Server;
}());
exports.default = Server;
