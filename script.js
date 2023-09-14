let intentos = 6;
let diccionario = ['APPLE', 'HURLS', 'WINGS', 'YOUTH']
//let palabra = diccionario[Math.floor(Math.random() * diccionario.length)];
let palabra;

fetch('https://random-word-api.herokuapp.com/word?length=5&lang=es')
 	.then(response => response.json())
 	.then(response => {
         console.log(response)
         palabra = response[0].toUpperCase()
     })
 	.catch(err => console.error(err));


const button = document.getElementById("guess-button");
button.addEventListener("click", intentar);

function intentar(){
    console.log(palabra);
    const INTENTO = leerIntento();
//AGREGADO PARA EMITIR UN MENSAJE CUANDO SE INTRODUCE MENOS DE 4 LETRAS
    if (INTENTO.length !=5){
        alert("DEBE INGRESAR UNA PALABRA DE 5 LETRAS")
        return
    }

    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';
    for (let i in palabra){
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        if (INTENTO[i]===palabra[i]){ //VERDE
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#79b851';
            

        } else if( palabra.includes(INTENTO[i]) ) { //AMARILLO
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#f3c237';
        } else {      //GRIS
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#a4aec4';
        }
        ROW.appendChild(SPAN)
    }
    GRID.appendChild(ROW)



    if (INTENTO === palabra ) {
        button.style.display = "none";
        terminar("<h1>GANASTE!😀</h1>")
        return
    }

		intentos--
        if (intentos==0){
            button.style.display = "none";
            //intento.style.display = "none";

            terminar("<h1>PERDISTE!😖</h1>")
        }
    
}
//const intento = document.getElementById("guess-input");

function leerIntento(){
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento = intento.toUpperCase(); 
    
    return intento;
}

for (let i in palabra){
	console.log(palabra[i]);
}

function terminar(mensaje){
    const INPUT = document.getElementById("guess-input");
    const BOTON = document.getElementById("guess-button");
    INPUT.disabled = true;
    BOTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}

function refrescar(){
    location.reload();
}

