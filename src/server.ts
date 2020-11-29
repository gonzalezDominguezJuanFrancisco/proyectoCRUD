import {leerTeclado,trueFalse ,Fecha} from "./vistas/leerteclado"
import {Grupo, Grupos} from "./models/Grupo"
import {Miembro} from "./models/Miembro"
import {Cancion} from "./models/Cancion"
import {db} from "./database/database"
import {menu1, menu2, menu3} from "./vistas/menu"

const main = async () => {
    let n1: number
    do {
        n1 = await menu1()
        switch(n1){
            case 1:
                let g1: Grupo
                let c1: Array<Cancion> = new Array
                let m1: Array<Miembro> = new Array
                try {
                    let nombre = await leerTeclado("Introduce el nombre del nuevo grupo")
                    let fechaCreacion = new Date(await Fecha("Introduce la fecha de creacion del grupo (AAAA-MM-DD)"))
                    g1 = new Grupo(nombre, fechaCreacion, c1, m1)

                    await db.conectarBD()
                    const dSchema = {
                        _nombre: g1.nombre,
                        _fechaCreacion: g1.fechaCreacion,
                        _canciones: g1.canciones,
                        _miembros: g1.miembros
                    }
                    const oSchema = new Grupos(dSchema)
                    await oSchema.save()
                        .then( (doc) => console.log("Guardado: " + doc) )
                        .catch( (err: any) => console.log("Error: " + err)) 
                    await db.desconectarBD()

                } catch (error) {
                    console.log(error)
                }
                
                break

            case 2:
                let nom = await leerTeclado("Nombre del grupo a eliminar: ")
                await db.conectarBD()
                await Grupos.findOneAndDelete(
                    {_nombre: nom},
                    (err: any, doc) => {
                        if(err) console.log(err)
                        else {
                            if (doc == null) console.log("Ese grupo no existe")
                            else {
                                console.log("Borrado: " + doc)
                            }
                        }
                    }
                )
                await db.desconectarBD()
                break

            case 3:
                console.log("----=========[Grupos en la BD]=========----")
                await db.conectarBD()
                let gru: any
                let query: any
                query = await Grupos.find({})
                for (gru of query) {
                    let canciones: Array<Cancion> = new Array()
                    for (let c of gru._canciones){
                        let c1 = new Cancion(c._nombre, c._duracion, c._likes, c._fechaSalida, c._genero, c._topVentas)
                        canciones.push(c1)
                    }
                    let miembros: Array<Miembro> = new Array()
                    for (let m of gru._miembros) {
                        let m1 = new Miembro(m._nombre, m._apodo, m._fechaNacimiento, m._puesto)
                        miembros.push(m1)
                    }
                    let g = new Grupo(gru._nombre, gru._fechaCreacion, canciones, miembros)
                    console.log(g.imprimirGrupo())
                }
                await db.desconectarBD()
                break
            
            case 4:
                let grupoSelect = null
                try {
                    let nombre = await leerTeclado("Introduce el nombre del grupo")
                    await db.conectarBD()
                    let gru: any
                    let query = await Grupos.find({})
                    for (gru of query) {
                        if (nombre == gru._nombre) {
                            let canciones: Array<Cancion> = new Array()
                            for (let c of gru._canciones){
                                let c1 = new Cancion(c._nombre, c._duracion, c._likes, c._fechaSalida, c._genero, c._topVentas)
                                canciones.push(c1)
                            }
                            let miembros: Array<Miembro> = new Array()
                            for (let m of gru._miembros) {
                                let m1 = new Miembro(m._nombre, m._apodo, m._fechaNacimiento, m._puesto)
                                miembros.push(m1)
                            }
                            grupoSelect = new Grupo(gru._nombre, gru._fechaCreacion, canciones, miembros)
                        }
                    }
                    await db.desconectarBD()
                } catch (error) {
                    console.log(error)
                }
                if (grupoSelect != null) {
                    let n2: number
                    console.log(grupoSelect)
                    do {
                        n2 = await menu2()
                        switch(n2) {
                            case 1:
                                let m1 = Miembro
                                try {
                                    let nombre = await leerTeclado("Introducir nombre del miembro")
                                    let apodo = await leerTeclado("Introducir apodo")
                                    let fechaNacimiento = new Date(await Fecha("Introducir fecha de nacimiento (AAAA-MM-DD)"))
                                    let puesto = await leerTeclado("Introducir su puesto")
                                    let m1 = new Miembro(nombre, apodo, fechaNacimiento, puesto)
                                    grupoSelect.joinMiembro(m1)
                                } catch(error){
                                    console.log(error)
                                }

                                await db.conectarBD()
                                await Grupos.findOneAndUpdate(
                                    {_nombre: grupoSelect.nombre},
                                    {
                                        _nombre: grupoSelect.nombre,
                                        _fechaCreacion: grupoSelect.fechaCreacion,
                                        _canciones: grupoSelect.canciones,
                                        _miembros: grupoSelect.miembros
                                    }, {
                                      runValidators: true  
                                    }
                                )
                                .catch((err)=> console.log("Error: " + err))
                                await db.desconectarBD()
                                break

                            case 2:
                                console.log(`----=========[Miembros de ${grupoSelect.nombre}]=========----`)
                                grupoSelect.seeMiembros()
                                break

                            case 3:
                                let c1 = Cancion
                                let x: boolean
                                try {
                                    let nombre = await leerTeclado("Introducir nombre de la cancion: ")
                                    let duracion = parseFloat(await leerTeclado("Introducir duracion: "))
                                    let likes = parseInt(await leerTeclado("Introducir Nº likes: "))
                                    let fechaSalida = new Date(await Fecha("Introducir fecha de salida (AAAA-MM-DD): "))
                                    let genero = await leerTeclado("Introducir el genero: ")
                                    let topVentas = await trueFalse("Top ventas [S | N]: ")
                                    if (topVentas == "S") {
                                        x = true
                                    } else {
                                        x = false
                                    }
                                    let c1 = new Cancion(nombre, duracion, likes, fechaSalida, genero, x)
                                    grupoSelect.joinCancion(c1)
                                } catch(error) {
                                    console.log(error)
                                }

                                await db.conectarBD()
                                await Grupos.findOneAndUpdate(
                                    {_nombre: grupoSelect.nombre},
                                    {
                                        _nombre: grupoSelect.nombre,
                                        _fechaCreacion: grupoSelect.fechaCreacion,
                                        _canciones: grupoSelect.canciones,
                                        _miembros: grupoSelect.miembros
                                    }, {
                                      runValidators: true  
                                    }
                                )
                                .catch((err)=> console.log("Error: " + err))
                                await db.desconectarBD()
                                break

                            case 4:
                                console.log(`----=========[Canciones de ${grupoSelect.nombre}]=========----`)
                                grupoSelect.seeCanciones()
                                break

                            case 5:
                                if (grupoSelect.canciones.length == 0) {
                                    console.log("El grupo no tiene canciones")
                                } else {
                                    let gru = await leerTeclado("Introduzca el nombre de la cancion: ")
                                    let index: number = -1
                                    for(let c of grupoSelect.canciones) {
                                        if(c.nombre == gru) {
                                            index = grupoSelect.canciones.indexOf(c)
                                        }
                                    }
                                    if(index != -1) {
                                        let n3: number
                                        let gru = grupoSelect.canciones[index]
                                        console.log(gru)
                                        do {
                                            n3 = await menu3()
                                            switch (n3){
                                                case 1:
                                                    console.log(gru.top())
                                                    break
                                                
                                                case 2:
                                                    let l = parseInt( await leerTeclado("Introduce el Nº de likes: "))
                                                    try {
                                                        console.log(gru.nLikes(l))
                                                    } catch(error) {
                                                        console.log(error)
                                                    }
                                                    break

                                                case 0:
                                                    console.log('Saliendo del grupo')
                                                    break

                                                default:
                                                    console.log("Opción incorrecta")
                                                    break

                                            }
                                        } while (n3!=0); 
                                    } else {
                                        console.log('No existe una con ese nombre')
                                    }
                                }

                                await db.conectarBD()
                                await Grupos.findOneAndUpdate(
                                    {_nombre: grupoSelect.nombre},
                                    {
                                        _nombre: grupoSelect.nombre,
                                        _fechaCreacion: grupoSelect.fechaCreacion,
                                        _canciones: grupoSelect.canciones,
                                        _miembros: grupoSelect.miembros
                                    }, {
                                      runValidators: true  
                                    }
                                )
                                .catch((err)=> console.log("Error: " + err))
                                await db.desconectarBD()
                                break
                            
                            case 6:
                                console.log(`\n Duracion media de las canciones de ${grupoSelect.nombre}: `)
                                console.log(grupoSelect.duraMedia() + " minutos")
                                break

                            case 7:
                                console.log(`\n Este es la edad media de los miembros de ${grupoSelect.nombre}: `)
                                console.log(grupoSelect.edadMedia() + " años")
                                break
                            
                            case 8:
                                let nom = await leerTeclado("Introduzca el nombre del miembro: ")
                                try {
                                    console.log("Su edad es de " + grupoSelect.Edad(nom) + " años")
                                } catch(error) {
                                    console.log(error)
                                }
                                break

                            case 9:
                                let g = grupoSelect.top2()
                                console.log("Son Top Ventas: ")
                                for (let n of g) {
                                    console.log(`${n.nombre}`)
                                }
                                break

                            case 10:
                                let nom2 = await leerTeclado("Introduzca el nombre de la cancion: ")
                                //console.log("Tiempo desde salida: " + grupoSelect.Salida(nom2) + " dias")
                                let mili = grupoSelect.Salida(nom2)
                                console.log(mili)
                                let ano = 0
                                let mes = 0
                                let dia = 0
                                try {
                                    while (mili > 0) {
                                        if (mili >= 31556900000) {
                                            mili = mili - 31556900000
                                            ano++
                                        }
                                        if (mili < 3155690000 || mili >= 2629750000) {
                                            mili = mili - 2629750000
                                            mes++
                                            if (mes == 12) {
                                                ano++
                                                mes = 0
                                            }
                                        }
                                        if (mili < 2629750000 || mili >= 86400000) {
                                            mili = mili - 86400000
                                            dia++
                                        }
                                    }
                                    console.log("La cancion salio hace " + ano + " año/s, " + mes + " mese/s, y " + dia + " dia/s")
                                } catch(error) {
                                    console.log(error)
                                }
                                break

                            case 0:
                                    console.log("\n----=========[Saliendo]=========----")
                                break
                    
                            default:
                                console.log("Opción incorrecta")
                                break    
                        }
                    } while (n2!=0);
                } else {
                    console.log("No existe ese grupo")
                }
                break
            
            case 0:
                console.log("\n----=========[Saliendo]=========----")
                break
    
            default:
                console.log("Opción incorrecta")
                break
        }
    } while (n1!=0);
}
main()