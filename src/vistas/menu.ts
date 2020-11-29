import {leerTeclado} from "./leerteclado"

export const menu1 = async () => {
    let n: number
    console.log("\n")
    console.log("----=============----")
    console.log("1.- Crear grupo")
    console.log("2.- Borrar grupo")
    console.log("3.- Mostrar grupos")
    console.log("4.- Seleccionar grupo")
    console.log("0.- Salir")
    n = parseInt( await leerTeclado("Nº: ") )
    return n
}

export const menu2 = async () => {
    let n: number
    console.log("\n")
    console.log("----=============----")
    console.log("1.- Crear miembro")
    console.log("2.- Mostrar miembros")
    console.log("3.- Crear cancion")
    console.log("4.- Mostrar canciones")
    console.log("5.- Seleccionar cancion")
    console.log("6.- Duracion media")
    console.log("7.- Edad media")
    console.log("8.- Edad miembro")
    console.log("9.- Canciones Top")
    console.log("10.- Salida cancion")
    console.log("0.- Salir")
    n = parseInt( await leerTeclado("Nº: ") )
    return n
}

export const menu3 = async () => {
    let n: number
    console.log("\n")
    console.log("----=============----")
    console.log("1.- Cambiar Top")
    console.log("2.- Cambiar Likes")
    console.log("0.- Salir")
    n = parseInt( await leerTeclado("Nº: ") )
    return n
}