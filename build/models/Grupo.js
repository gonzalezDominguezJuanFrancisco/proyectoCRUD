"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grupos = exports.Grupo = void 0;
const mongoose_1 = require("mongoose");
const Miembro_1 = require("./Miembro");
const Cancion_1 = require("./Cancion");
class Grupo {
    constructor(nombre, fechaCreacion, canciones, miembros) {
        this._nombre = nombre;
        this._fechaCreacion = fechaCreacion;
        this._canciones = canciones;
        this._miembros = miembros;
    }
    get nombre() {
        return this._nombre;
    }
    get fechaCreacion() {
        return this._fechaCreacion;
    }
    get miembros() {
        return this._miembros;
    }
    get canciones() {
        return this._canciones;
    }
    set nombre(nombre) {
        this._nombre = nombre;
    }
    set direccion(fechaCreacion) {
        this._fechaCreacion = fechaCreacion;
    }
    set miembros(miembros) {
        this._miembros = miembros;
    }
    set canciones(canciones) {
        this._canciones = canciones;
    }
    seeMiembros() {
        for (let m of this._miembros) {
            console.log(m.seeMiembro());
        }
    }
    seeCanciones() {
        for (let c of this._canciones) {
            console.log(c.seeCancion());
        }
    }
    joinMiembro(m) {
        this._miembros.push(m);
    }
    joinCancion(c) {
        this._canciones.push(c);
    }
    duraMedia() {
        let total = 0;
        let canciones = 0;
        for (let c of this._canciones) {
            canciones++;
            total = total + c.duracion;
        }
        return (total / canciones).toFixed(2);
    }
    Edad(nom) {
        let ed = 0;
        let miembros = 0;
        for (let m of this._miembros) {
            miembros++;
            if (m.nombre == nom) {
                ed = m.edad();
            }
        }
        return ed;
    }
    Salida(nom) {
        let sa = 0;
        let canciones = 0;
        for (let c of this._canciones) {
            canciones++;
            if (c.nombre == nom) {
                sa = c.salida();
            }
        }
        return sa;
    }
    edadMedia() {
        let total = 0;
        let miembros = 0;
        for (let m of this._miembros) {
            miembros++;
            total = total + m.edad();
        }
        return Math.round(total / miembros);
    }
    imprimirGrupo() {
        return `Grupo: ${this.nombre}, Fecha creacion: ${this.fechaCreacion},`;
    }
    top() {
        let c1 = new Array();
        for (let c of this._canciones) {
            if (!c.topVentas) {
                c1.push(c);
            }
        }
        return c1;
    }
    top2() {
        let c = new Array();
        for (let g of this._canciones) {
            if (!g.topVentas) {
                c.push(g);
            }
        }
        return c;
    }
}
exports.Grupo = Grupo;
const grupoSchema = new mongoose_1.Schema({
    _nombre: { type: String, unique: true },
    _fechaCreacion: { type: Date },
    _canciones: { type: [Cancion_1.cancionSchema] },
    _miembros: { type: [Miembro_1.miembroSchema] }
});
exports.Grupos = mongoose_1.model('Grupos', grupoSchema);
