import {Schema, model} from 'mongoose'
import {Miembro, miembroSchema } from './Miembro'
import {Cancion, cancionSchema } from './Cancion'

export class Grupo {
    private _nombre: string
    private _fechaCreacion: Date
    private _canciones: Array<Cancion>
    private _miembros: Array<Miembro>

    constructor(nombre: string, fechaCreacion: Date, canciones: Array<Cancion>, miembros: Array<Miembro>) {
        this._nombre = nombre
        this._fechaCreacion = fechaCreacion
        this._canciones = canciones
        this._miembros = miembros
    }

    get nombre() {
        return this._nombre
    }
    get fechaCreacion() {
        return this._fechaCreacion
    }
    get miembros() {
        return this._miembros
    }
    get canciones() {
        return this._canciones
    }

    set nombre(nombre: string) {
        this._nombre = nombre
    }
    set direccion(fechaCreacion: Date) {
        this._fechaCreacion = fechaCreacion
    }
    set miembros(miembros: Array<Miembro>) {
        this._miembros = miembros
    }
    set canciones(canciones: Array<Cancion>) {
        this._canciones = canciones
    }


    seeMiembros() {
        for(let m of this._miembros) {
            console.log(m.seeMiembro())
        }
    }

    seeCanciones() {
        for(let c of this._canciones) {
            console.log(c.seeCancion())
        }
    }

    joinMiembro(m: Miembro) {
        this._miembros.push(m)
    }

    joinCancion(c: Cancion) {
        this._canciones.push(c)
    }

    duraMedia() {
        let total = 0
        let canciones = 0
        for (let c of this._canciones) {
            canciones++
            total = total + c.duracion
        }
        return (total/canciones).toFixed(2)
    }

    Edad(nom: string) {
        let ed = 0
        let miembros = 0
        for (let m of this._miembros) {
            miembros++
            if(m.nombre == nom) {
                ed = m.edad()
            }
        }
        return ed
    }

    Salida(nom: string) {
        let sa = 0
        let canciones = 0
        for (let c of this._canciones) {
            canciones++
            if(c.nombre == nom) {
                sa = c.salida()
            }
        }
        return sa
    }

    edadMedia() {
        let total = 0
        let miembros = 0
        for (let m of this._miembros) {
            miembros++
            total = total + m.edad()
        }
        return Math.round(total/miembros)
    }

    imprimirGrupo() {
        return `Grupo: ${this.nombre}, Fecha creacion: ${this.fechaCreacion},`
    }

    top() {
        let c1: Array<Cancion> = new Array()
        for (let c of this._canciones) {
            if (!c.topVentas) {
                c1.push(c)
            }
        }
        return c1
    }

    top2() {
        let c: Array<Cancion> = new Array()
        for (let g of this._canciones) {
            if (!g.topVentas){
                c.push(g)
            }
        }
        return c
    }
}

const grupoSchema = new Schema({
    _nombre:{type:String, unique:true},
    _fechaCreacion: {type: Date},
    _canciones: {type: [cancionSchema]},
    _miembros: {type: [miembroSchema]}
})

export const Grupos = model('Grupos', grupoSchema)