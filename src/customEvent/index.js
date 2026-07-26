import EventEmitter from "node:events";
class ServerEmitter extends EventEmitter {}
var serverEmitter = new ServerEmitter();

class DatabaseEmitter extends EventEmitter {}
var databaseEmitter = new DatabaseEmitter();

export { serverEmitter, databaseEmitter };
