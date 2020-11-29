import readline from 'readline'
let readlineI: readline.Interface

let leeLinea = (prompt: string) =>  {
    readlineI = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })
    return new Promise<string>( (resuelta: any, rechazada: any) => {
        readlineI.question(`${prompt}: `, (cadenaEntrada: string) => {
                resuelta (cadenaEntrada)
            }
        )
    })
}

export let leerTeclado = async (prompt: string) => {
    let valor: string
    valor = await leeLinea(prompt)
    readlineI.close()
    return valor
}

export let trueFalse = async (prompt: string) => {
    let tf: string
    tf = await leeLinea(prompt)
    let letras: RegExp=/S|N/
    readlineI.close()
    if(tf.length != 1 || !tf.charAt(0).match(letras)) {
        throw "Error. Utiliza S para Si, y N para No"
    } else {
        return tf
    }
}

export let Fecha = async (prompt: string) => {
    let fecha: string
    fecha = await leeLinea(prompt)
    readlineI.close()
    if(fecha.length!=10 || !fecha.charAt(0).match(/[0-9]/) || !fecha.charAt(1).match(/[0-9]/) || !fecha.charAt(2).match(/[0-9]/)
    || !fecha.charAt(3).match(/[0-9]/) || !fecha.charAt(4).match(/-/) || !fecha.charAt(5).match(/[0-9]/) || !fecha.charAt(6).match(/[0-9]/)
    || !fecha.charAt(7).match(/-/) || !fecha.charAt(8).match(/[0-9]/) || !fecha.charAt(9).match(/[0-9]/)) {
        throw 'Formato de fecha incorrecto (AAAA-MM-DD)'
    } else {
        return fecha
    }
}