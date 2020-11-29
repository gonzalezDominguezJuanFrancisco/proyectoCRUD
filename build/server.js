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
const leerteclado_1 = require("./vistas/leerteclado");
const Grupo_1 = require("./models/Grupo");
const Miembro_1 = require("./models/Miembro");
const Cancion_1 = require("./models/Cancion");
const database_1 = require("./database/database");
const menu_1 = require("./vistas/menu");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    let n1;
    do {
        n1 = yield menu_1.menu1();
        switch (n1) {
            case 1:
                let g1;
                let c1 = new Array;
                let m1 = new Array;
                try {
                    let nombre = yield leerteclado_1.leerTeclado("Introduce el nombre del nuevo grupo");
                    let fechaCreacion = new Date(yield leerteclado_1.Fecha("Introduce la fecha de creacion del grupo (AAAA-MM-DD)"));
                    g1 = new Grupo_1.Grupo(nombre, fechaCreacion, c1, m1);
                    yield database_1.db.conectarBD();
                    const dSchema = {
                        _nombre: g1.nombre,
                        _fechaCreacion: g1.fechaCreacion,
                        _canciones: g1.canciones,
                        _miembros: g1.miembros
                    };
                    const oSchema = new Grupo_1.Grupos(dSchema);
                    yield oSchema.save()
                        .then((doc) => console.log("Guardado: " + doc))
                        .catch((err) => console.log("Error: " + err));
                    yield database_1.db.desconectarBD();
                }
                catch (error) {
                    console.log(error);
                }
                break;
            case 2:
                let nom = yield leerteclado_1.leerTeclado("Nombre del grupo a eliminar: ");
                yield database_1.db.conectarBD();
                yield Grupo_1.Grupos.findOneAndDelete({ _nombre: nom }, (err, doc) => {
                    if (err)
                        console.log(err);
                    else {
                        if (doc == null)
                            console.log("Ese grupo no existe");
                        else {
                            console.log("Borrado: " + doc);
                        }
                    }
                });
                yield database_1.db.desconectarBD();
                break;
            case 3:
                console.log("----=========[Grupos en la BD]=========----");
                yield database_1.db.conectarBD();
                let gru;
                let query;
                query = yield Grupo_1.Grupos.find({});
                for (gru of query) {
                    let canciones = new Array();
                    for (let c of gru._canciones) {
                        let c1 = new Cancion_1.Cancion(c._nombre, c._duracion, c._likes, c._fechaSalida, c._genero, c._topVentas);
                        canciones.push(c1);
                    }
                    let miembros = new Array();
                    for (let m of gru._miembros) {
                        let m1 = new Miembro_1.Miembro(m._nombre, m._apodo, m._fechaNacimiento, m._puesto);
                        miembros.push(m1);
                    }
                    let g = new Grupo_1.Grupo(gru._nombre, gru._fechaCreacion, canciones, miembros);
                    console.log(g.imprimirGrupo());
                }
                yield database_1.db.desconectarBD();
                break;
            case 4:
                let grupoSelect = null;
                try {
                    let nombre = yield leerteclado_1.leerTeclado("Introduce el nombre del grupo");
                    yield database_1.db.conectarBD();
                    let gru;
                    let query = yield Grupo_1.Grupos.find({});
                    for (gru of query) {
                        if (nombre == gru._nombre) {
                            let canciones = new Array();
                            for (let c of gru._canciones) {
                                let c1 = new Cancion_1.Cancion(c._nombre, c._duracion, c._likes, c._fechaSalida, c._genero, c._topVentas);
                                canciones.push(c1);
                            }
                            let miembros = new Array();
                            for (let m of gru._miembros) {
                                let m1 = new Miembro_1.Miembro(m._nombre, m._apodo, m._fechaNacimiento, m._puesto);
                                miembros.push(m1);
                            }
                            grupoSelect = new Grupo_1.Grupo(gru._nombre, gru._fechaCreacion, canciones, miembros);
                        }
                    }
                    yield database_1.db.desconectarBD();
                }
                catch (error) {
                    console.log(error);
                }
                if (grupoSelect != null) {
                    let n2;
                    console.log(grupoSelect);
                    do {
                        n2 = yield menu_1.menu2();
                        switch (n2) {
                            case 1:
                                let m1 = Miembro_1.Miembro;
                                try {
                                    let nombre = yield leerteclado_1.leerTeclado("Introducir nombre del miembro");
                                    let apodo = yield leerteclado_1.leerTeclado("Introducir apodo");
                                    let fechaNacimiento = new Date(yield leerteclado_1.Fecha("Introducir fecha de nacimiento (AAAA-MM-DD)"));
                                    let puesto = yield leerteclado_1.leerTeclado("Introducir su puesto");
                                    let m1 = new Miembro_1.Miembro(nombre, apodo, fechaNacimiento, puesto);
                                    grupoSelect.joinMiembro(m1);
                                }
                                catch (error) {
                                    console.log(error);
                                }
                                yield database_1.db.conectarBD();
                                yield Grupo_1.Grupos.findOneAndUpdate({ _nombre: grupoSelect.nombre }, {
                                    _nombre: grupoSelect.nombre,
                                    _fechaCreacion: grupoSelect.fechaCreacion,
                                    _canciones: grupoSelect.canciones,
                                    _miembros: grupoSelect.miembros
                                }, {
                                    runValidators: true
                                })
                                    .catch((err) => console.log("Error: " + err));
                                yield database_1.db.desconectarBD();
                                break;
                            case 2:
                                console.log(`----=========[Miembros de ${grupoSelect.nombre}]=========----`);
                                grupoSelect.seeMiembros();
                                break;
                            case 3:
                                let c1 = Cancion_1.Cancion;
                                let x;
                                try {
                                    let nombre = yield leerteclado_1.leerTeclado("Introducir nombre de la cancion: ");
                                    let duracion = parseFloat(yield leerteclado_1.leerTeclado("Introducir duracion: "));
                                    let likes = parseInt(yield leerteclado_1.leerTeclado("Introducir Nº likes: "));
                                    let fechaSalida = new Date(yield leerteclado_1.Fecha("Introducir fecha de salida (AAAA-MM-DD): "));
                                    let genero = yield leerteclado_1.leerTeclado("Introducir el genero: ");
                                    let topVentas = yield leerteclado_1.trueFalse("Top ventas [S | N]: ");
                                    if (topVentas == "S") {
                                        x = true;
                                    }
                                    else {
                                        x = false;
                                    }
                                    let c1 = new Cancion_1.Cancion(nombre, duracion, likes, fechaSalida, genero, x);
                                    grupoSelect.joinCancion(c1);
                                }
                                catch (error) {
                                    console.log(error);
                                }
                                yield database_1.db.conectarBD();
                                yield Grupo_1.Grupos.findOneAndUpdate({ _nombre: grupoSelect.nombre }, {
                                    _nombre: grupoSelect.nombre,
                                    _fechaCreacion: grupoSelect.fechaCreacion,
                                    _canciones: grupoSelect.canciones,
                                    _miembros: grupoSelect.miembros
                                }, {
                                    runValidators: true
                                })
                                    .catch((err) => console.log("Error: " + err));
                                yield database_1.db.desconectarBD();
                                break;
                            case 4:
                                console.log(`----=========[Canciones de ${grupoSelect.nombre}]=========----`);
                                grupoSelect.seeCanciones();
                                break;
                            case 5:
                                if (grupoSelect.canciones.length == 0) {
                                    console.log("El grupo no tiene canciones");
                                }
                                else {
                                    let gru = yield leerteclado_1.leerTeclado("Introduzca el nombre de la cancion: ");
                                    let index = -1;
                                    for (let c of grupoSelect.canciones) {
                                        if (c.nombre == gru) {
                                            index = grupoSelect.canciones.indexOf(c);
                                        }
                                    }
                                    if (index != -1) {
                                        let n3;
                                        let gru = grupoSelect.canciones[index];
                                        console.log(gru);
                                        do {
                                            n3 = yield menu_1.menu3();
                                            switch (n3) {
                                                case 1:
                                                    console.log(gru.top());
                                                    break;
                                                case 2:
                                                    let l = parseInt(yield leerteclado_1.leerTeclado("Introduce el Nº de likes: "));
                                                    try {
                                                        console.log(gru.nLikes(l));
                                                    }
                                                    catch (error) {
                                                        console.log(error);
                                                    }
                                                    break;
                                                case 0:
                                                    console.log('Saliendo del grupo');
                                                    break;
                                                default:
                                                    console.log("Opción incorrecta");
                                                    break;
                                            }
                                        } while (n3 != 0);
                                    }
                                    else {
                                        console.log('No existe una con ese nombre');
                                    }
                                }
                                yield database_1.db.conectarBD();
                                yield Grupo_1.Grupos.findOneAndUpdate({ _nombre: grupoSelect.nombre }, {
                                    _nombre: grupoSelect.nombre,
                                    _fechaCreacion: grupoSelect.fechaCreacion,
                                    _canciones: grupoSelect.canciones,
                                    _miembros: grupoSelect.miembros
                                }, {
                                    runValidators: true
                                })
                                    .catch((err) => console.log("Error: " + err));
                                yield database_1.db.desconectarBD();
                                break;
                            case 6:
                                console.log(`\n Duracion media de las canciones de ${grupoSelect.nombre}: `);
                                console.log(grupoSelect.duraMedia() + " minutos");
                                break;
                            case 7:
                                console.log(`\n Este es la edad media de los miembros de ${grupoSelect.nombre}: `);
                                console.log(grupoSelect.edadMedia() + " años");
                                break;
                            case 8:
                                let nom = yield leerteclado_1.leerTeclado("Introduzca el nombre del miembro: ");
                                try {
                                    console.log("Su edad es de " + grupoSelect.Edad(nom) + " años");
                                }
                                catch (error) {
                                    console.log(error);
                                }
                                break;
                            case 9:
                                let g = grupoSelect.top2();
                                console.log("Son Top Ventas: ");
                                for (let n of g) {
                                    console.log(`${n.nombre}`);
                                }
                                break;
                            case 10:
                                let nom2 = yield leerteclado_1.leerTeclado("Introduzca el nombre de la cancion: ");
                                //console.log("Tiempo desde salida: " + grupoSelect.Salida(nom2) + " dias")
                                let mili = grupoSelect.Salida(nom2);
                                console.log(mili);
                                let ano = 0;
                                let mes = 0;
                                let dia = 0;
                                try {
                                    while (mili > 0) {
                                        if (mili >= 31556900000) {
                                            mili = mili - 31556900000;
                                            ano++;
                                        }
                                        if (mili < 3155690000 || mili >= 2629750000) {
                                            mili = mili - 2629750000;
                                            mes++;
                                            if (mes == 12) {
                                                ano++;
                                                mes = 0;
                                            }
                                        }
                                        if (mili < 2629750000 || mili >= 86400000) {
                                            mili = mili - 86400000;
                                            dia++;
                                        }
                                    }
                                    console.log("La cancion salio hace " + ano + " año/s, " + mes + " mese/s, y " + dia + " dia/s");
                                }
                                catch (error) {
                                    console.log(error);
                                }
                                break;
                            case 0:
                                console.log("\n----=========[Saliendo]=========----");
                                break;
                            default:
                                console.log("Opción incorrecta");
                                break;
                        }
                    } while (n2 != 0);
                }
                else {
                    console.log("No existe ese grupo");
                }
                break;
            case 0:
                console.log("\n----=========[Saliendo]=========----");
                break;
            default:
                console.log("Opción incorrecta");
                break;
        }
    } while (n1 != 0);
});
main();
