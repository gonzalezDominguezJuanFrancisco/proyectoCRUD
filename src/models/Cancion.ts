import {Schema, model} from 'mongoose'

export class Cancion{

    private _nombre: string
    private _duracion: number
    private _likes: number
    private _fechaSalida: Date
    private _genero: string
    private _topVentas: boolean

    constructor(nombre:string, duracion: number, likes: number, fechaSalida: Date, genero: string, topVentas: boolean){
        this._nombre = nombre
        this._duracion = duracion
        this._likes = likes
        this._fechaSalida = fechaSalida
        this._genero = genero
        this._topVentas = topVentas
    }

    get nombre() {
        return this._nombre
    }
    get duracion() {
        return this._duracion
    }
    get likes() {
        return this._likes
    }
    get fechaSalida() {
        return this._fechaSalida
    }
    get genero() {
        return this._genero
    }
    get topVentas() {
        return this._topVentas
    }

    set nombre(nombre: string) {
        this._nombre = nombre
    }    
    set duracion(duracion: number) {
        this._duracion = duracion
    }
    set likes(likes: number) {
        this._likes = likes
    }
    set fechaSalida(fechaSalida: Date) {
        this._fechaSalida = fechaSalida
    }
    set genero(genero: string) {
        this._genero = genero
    }
    set topVentas(topVentas: boolean) {
        this._topVentas = topVentas
    }

    top() {
        if(!this._topVentas) {
            this._topVentas = true
            return "Cancion añadida al Top"
        } else {
            return "Esta cancion ya esta en el Top"
        }
    }

    nLikes(l: number) {
        if(l < 0) {
            throw "Los likes no pueden ser negativos"
        } else {
            this._likes = l
        }
    }

    seeCancion() {
        if(this.topVentas) {
            return `Titulo: ${this._nombre}, Duracion:${this._duracion}, Likes: ${this._likes}, Fecha salida: ${this._fechaSalida}, Genero: ${this._genero}, Top Ventas: Si`
        } else {
            return `Titulo: ${this._nombre}, Duracion:${this._duracion}, Likes: ${this._likes}, Fecha salida: ${this._fechaSalida}, Genero: ${this._genero}, Top Ventas: No`
        }
    }

    /*salida() {
        let res = new Date().getTime() - this._fechaSalida.getTime()
        res = Math.floor(res/86400000)
        return res
    }
    */
   salida() {
    let res = new Date().getTime() - this._fechaSalida.getTime()
    return res
   }
}

export const cancionSchema = new Schema({
    _nombre: {type: String},
    _duracion: {type: Number},
    _likes: {type: Number},
    _fechaSalida: {type: Date},
    _genero: {type: String},
    _topVentas: {type: Boolean}
})


