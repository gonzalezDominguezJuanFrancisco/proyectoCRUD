import {Schema} from 'mongoose'

export class Miembro {

    private _nombre: string
    private _apodo: string
    private _fechaNacimiento: Date
    private _puesto: string

    constructor(nombre: string, apodo: string, fechaNacimiento: Date, puesto: string) {
        this._nombre = nombre
        this._apodo = apodo
        this._fechaNacimiento = fechaNacimiento
        this._puesto = puesto
    }

    get nombre() {
        return this._nombre
    }
    get apodo() {
        return this._apodo
    }
    get fechaNacimiento() {
        return this._fechaNacimiento
    }
    get puesto() {
        return this._puesto
    }

    set nombre(nombre: string) {
        this._nombre = nombre
    }    
    set apodo(apodo: string) {
        this._apodo = apodo
    }
    set fechaNacimiento(fechaNacimiento: Date) {
        this._fechaNacimiento = fechaNacimiento
    }
    set puesto(puesto: string) {
        this._puesto = puesto
    }

    edad() {
        let res = new Date().getTime() - this._fechaNacimiento.getTime()
        res = Math.floor(res/31556952000)
        return res
    }   

    seeMiembro() {
        return `Nombre: ${this._nombre}, Apodo: ${this._apodo}, Fecha nacimiento: ${this._fechaNacimiento}, Puesto: ${this._puesto}`
    }

}


export const miembroSchema = new Schema({
    _nombre: {type: String},
    _apodo: {type: String},
    _fechaNacimiento: {type: Date},
    _puesto: {type : String}
})