"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menu3 = exports.menu2 = exports.menu1 = void 0;
const leerteclado_1 = require("./leerteclado");
exports.menu1 = () => __awaiter(void 0, void 0, void 0, function* () {
    let n;
    console.log("\n");
    console.log("----=============----");
    console.log("1.- Crear grupo");
    console.log("2.- Borrar grupo");
    console.log("3.- Mostrar grupos");
    console.log("4.- Seleccionar grupo");
    console.log("0.- Salir");
    n = parseInt(yield leerteclado_1.leerTeclado("Nº: "));
    return n;
});
exports.menu2 = () => __awaiter(void 0, void 0, void 0, function* () {
    let n;
    console.log("\n");
    console.log("----=============----");
    console.log("1.- Crear miembro");
    console.log("2.- Mostrar miembros");
    console.log("3.- Crear cancion");
    console.log("4.- Mostrar canciones");
    console.log("5.- Seleccionar cancion");
    console.log("6.- Duracion media");
    console.log("7.- Edad media");
    console.log("8.- Edad miembro");
    console.log("9.- Canciones Top");
    console.log("10.- Salida cancion");
    console.log("0.- Salir");
    n = parseInt(yield leerteclado_1.leerTeclado("Nº: "));
    return n;
});
exports.menu3 = () => __awaiter(void 0, void 0, void 0, function* () {
    let n;
    console.log("\n");
    console.log("----=============----");
    console.log("1.- Cambiar Top");
    console.log("2.- Cambiar Likes");
    console.log("0.- Salir");
    n = parseInt(yield leerteclado_1.leerTeclado("Nº: "));
    return n;
});
