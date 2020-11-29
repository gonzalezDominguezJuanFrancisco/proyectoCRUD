"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.miembroSchema = exports.Miembro = void 0;
const mongoose_1 = require("mongoose");
class Miembro {
    constructor(nombre, apodo, fechaNacimiento, puesto) {
        this._nombre = nombre;
        this._apodo = apodo;
        this._fechaNacimiento = fechaNacimiento;
        this._puesto = puesto;
    }
    get nombre() {
        return this._nombre;
    }
    get apodo() {
        return this._apodo;
    }
    get fechaNacimiento() {
        return this._fechaNacimiento;
    }
    get puesto() {
        return this._puesto;
    }
    set nombre(nombre) {
        this._nombre = nombre;
    }
    set apodo(apodo) {
        this._apodo = apodo;
    }
    set fechaNacimiento(fechaNacimiento) {
        this._fechaNacimiento = fechaNacimiento;
    }
    set puesto(puesto) {
        this._puesto = puesto;
    }
    edad() {
        let res = new Date().getTime() - this._fechaNacimiento.getTime();
        res = Math.floor(res / 31556952000);
        return res;
    }
    seeMiembro() {
        return `Nombre: ${this._nombre}, Apodo: ${this._apodo}, Fecha nacimiento: ${this._fechaNacimiento}, Puesto: ${this._puesto}`;
    }
}
exports.Miembro = Miembro;
exports.miembroSchema = new mongoose_1.Schema({
    _nombre: { type: String },
    _apodo: { type: String },
    _fechaNacimiento: { type: Date },
    _puesto: { type: String }
});
