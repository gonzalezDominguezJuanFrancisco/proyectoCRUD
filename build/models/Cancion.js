"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancionSchema = exports.Cancion = void 0;
const mongoose_1 = require("mongoose");
class Cancion {
    constructor(nombre, duracion, likes, fechaSalida, genero, topVentas) {
        this._nombre = nombre;
        this._duracion = duracion;
        this._likes = likes;
        this._fechaSalida = fechaSalida;
        this._genero = genero;
        this._topVentas = topVentas;
    }
    get nombre() {
        return this._nombre;
    }
    get duracion() {
        return this._duracion;
    }
    get likes() {
        return this._likes;
    }
    get fechaSalida() {
        return this._fechaSalida;
    }
    get genero() {
        return this._genero;
    }
    get topVentas() {
        return this._topVentas;
    }
    set nombre(nombre) {
        this._nombre = nombre;
    }
    set duracion(duracion) {
        this._duracion = duracion;
    }
    set likes(likes) {
        this._likes = likes;
    }
    set fechaSalida(fechaSalida) {
        this._fechaSalida = fechaSalida;
    }
    set genero(genero) {
        this._genero = genero;
    }
    set topVentas(topVentas) {
        this._topVentas = topVentas;
    }
    top() {
        if (!this._topVentas) {
            this._topVentas = true;
            return "Cancion añadida al Top";
        }
        else {
            return "Esta cancion ya esta en el Top";
        }
    }
    nLikes(l) {
        if (l < 0) {
            throw "Los likes no pueden ser negativos";
        }
        else {
            this._likes = l;
        }
    }
    seeCancion() {
        if (this.topVentas) {
            return `Titulo: ${this._nombre}, Duracion:${this._duracion}, Likes: ${this._likes}, Fecha salida: ${this._fechaSalida}, Genero: ${this._genero}, Top Ventas: Si`;
        }
        else {
            return `Titulo: ${this._nombre}, Duracion:${this._duracion}, Likes: ${this._likes}, Fecha salida: ${this._fechaSalida}, Genero: ${this._genero}, Top Ventas: No`;
        }
    }
    /*salida() {
        let res = new Date().getTime() - this._fechaSalida.getTime()
        res = Math.floor(res/86400000)
        return res
    }
    */
    salida() {
        let res = new Date().getTime() - this._fechaSalida.getTime();
        return res;
    }
}
exports.Cancion = Cancion;
exports.cancionSchema = new mongoose_1.Schema({
    _nombre: { type: String },
    _duracion: { type: Number },
    _likes: { type: Number },
    _fechaSalida: { type: Date },
    _genero: { type: String },
    _topVentas: { type: Boolean }
});
