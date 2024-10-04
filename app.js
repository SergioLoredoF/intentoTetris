const matrizFiguras = [
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 1, 0],
    ], // Figura F
    [
        [1],
        [1],
        [1],
        [1],
        [1],
    ], // Figura I
    [
        [1, 0],
        [1, 0],
        [1, 0],
        [1, 1],
    ], // Figura L
    [
        [0, 1],
        [1, 1],
        [1, 0],
        [1, 0],
    ], // Figura N
    [
        [0, 1],
        [1, 1],
        [1, 1],
    ], // Figura P
    // [
    //     [1, 1, 1],
    //     [0, 1, 0],
    //     [0, 1, 0],
    // ], // Figura T
    [
        [1, 0, 1],
        [1, 1, 1],
    ], // Figura U
    [
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 1],
    ], // Figura V
    [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 1],
    ], // Figura W
    // [
    //     [0, 1, 0],
    //     [1, 1, 1],
    //     [0, 1, 0],
    // ], // Figura X
    [
        [0, 1],
        [1, 1],
        [0, 1],
        [0, 1],
    ], // Figura Y
    [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
    ], // Figura Z
    [
        [1, 1],
        [1, 1],
    ], // Cuadrado
]

const calculaSueloInit = (largo = 11, alto = 15) => {
    let columns = []
    for (let i = 0; i < alto; i++) {
        let row = []
        for (let z = 0; z < largo; z++) {
            row.push(0)
        }
        columns.push(row)
    }
    return columns
}

//GLOBALES
let figura
//variable que ubica la figura en Y
let ejeY
//Varaible que ubica la figura en X
let ejeX = 4
let suelo = calculaSueloInit()

console.log("Suelo: ", suelo)



const selecionFigura = () => {
    return new Promise((resolve, reject) => {
        const indexFigura = (Math.floor(Math.random() * matrizFiguras.length)) 
        figura = matrizFiguras[indexFigura]
        ejeY = 1
        console.warn("->Figura<-: ", figura)
        resolve(true)
    })
}

const validadorGiros = () => {

}

const descensoHandler = () => {

}

const agregaSuelo = () => {
    return new Promise(async (resolve, reject) => {
        //Solo agregar a suelo la figura representada
        let alturaLocalFigura = (figura.length - 1)
        //validar altura
        for (let i = ejeY - 1; i >= 0; i--) {

            for(let figuraX = 0; figuraX < figura[alturaLocalFigura].length; figuraX++){
                suelo[i][(ejeX + figuraX - 1)] = suelo[i][(ejeX + figuraX - 1)]  === 1 ? 1 : figura[alturaLocalFigura][figuraX]
            }
                
            alturaLocalFigura--

            //detenemos la iteración si la 
            if (alturaLocalFigura < 0) {
                resolve(true)
                break
            }
        }
        resolve(true)
    })
}

const encalloFigura = async (porUsuario = false) => {
    if (!porUsuario) ejeY++
    //Valida si la figura ya se paro al tocar suelo o figura
    if (ejeY === 15) {
        console.warn("Ya terminado aca perron --------------")
        await agregaSuelo()
        await selecionFigura()
        
    } else {

        //Alturas corregidas para arreglos
        let alturaMedida        = (ejeY) // AF = ejeY - 1
        let figuraAltura        = (figura.length - 1)
        let figuraAncho         = (figura[0].length)
        let comienzoComparacion =  (ejeX -1)
        let deteniendo = false
        
        //console.log("Altura de la medida ", alturaMedida)
        //console.log("Figura ", figura)

        if(figura)
        for(let figuraY =  0; figuraY < figuraAltura ; figuraY++){
            //console.log("Soy la altura de la figura arigato gosaiamas ", figura[figuraAltura - figuraY] )
            //console.log("Suelo wuachado arigato gosaimasudesuonichan: ", suelo[alturaMedida - figuraY], "suelo Y", (alturaMedida - figuraY))
            for(let figuraX = 0; figuraX <= figuraAncho; figuraX++){
                //console.log("Que perrusqui", comienzoComparacion)
                //console.log("Valor de figura ", figura[2 - figuraY][figuraX], "Valor suelo: ",suelo[alturaMedida - figuraY][comienzoComparacion + figuraX])
                if(figura[figuraAltura - figuraY][figuraX] === 1 && suelo[alturaMedida - figuraY][comienzoComparacion + figuraX] === 1){
                    await agregaSuelo()
                    await selecionFigura()

                    deteniendo = true
                    break
                }
                //Posible continue
            }

            if(deteniendo) break
        }
    }    

    //console.log("Suelo Nuevo : ", suelo)

}

const perdisteHandler = () => {

}

const puntuacionHandler = () => {

}

const pintarPantalla = () => {
    let alturaLocal = ejeY;

    console.warn("Pintado Y: ", ejeY)
    console.warn("Pintado X: ", ejeX)

    //Limpiamos pantalla

    document.getElementById('juego').innerHTML = ``
    //Pinta suelo
    for (let column = 0; column < suelo.length; column++) {
        for (let row = 0; row < suelo[column].length; row++) {
            if (suelo[column][row] === 1) {
                document.getElementById('juego').innerHTML += `
                <div class="suelo" style="grid-column-start: ${(row + 1)}; grid-row-start: ${(column + 1)};"></div>
            `}
        }
    }

  
    //Pinta figura
    if(figura)
    for (let i = figura.length - 1; i >= 0; i--) {
        alturaLocal--
        //el lado izquierdo donde comienza a pintarse la figura
        let pintadoComienzo = ejeX
        for (let u = 0; u < figura[i].length; u++) {

            pintadoComienzo++

            if (figura[i][u] === 1)
                document.getElementById('juego').innerHTML += `
                <div class="bloque" style="grid-column-start: ${pintadoComienzo - 1}; grid-row-start: ${alturaLocal + 1};"></div>
            `
        }
        if (i > ejeY) break
    }


}

// const gameInit = async () => {
console.log("Game init")
selecionFigura()
let interval = setInterval(() => {
    encalloFigura()
    pintarPantalla()
}, 300)
// }

// setTimeout(() => {
//     gameInit()    
// }, 2000);
//Eventos

const movimientoHandler = (event) => {
    const tecla = event.key
    console.log("Tecla pulsada ", tecla)

    if (tecla === 'ArrowRight') {
        ejeX++
        encalloFigura(true)
        pintarPantalla()
    }

    if (tecla === 'ArrowLeft') {
        ejeX--
        encalloFigura(true)
        pintarPantalla()
    }

    if (tecla === ' ') {
        clearInterval(interval);
    }

}
document.addEventListener("keydown", movimientoHandler)