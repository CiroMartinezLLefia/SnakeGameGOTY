const tableroDiv = document.querySelector(".tablero")
const puntuacionDiv = document.querySelector(".puntuacion")
let matriz = [];
let puntuacion = 0;
let cabezaPosX = 4;
let cabezaPosY = 4;
let cuerpo = ["4-4"]
console.log(cuerpo[0])
let manzanas = 3;
let manzanaX = 0;
let manzanaY = 0;
let direccion = "left"
let lastDireccion = "right"
let del = true;

function crearMatriz(filas, columnas) {
    for (let i = 0; i < filas; i++) {
        matriz[i] = [];
        for (let j = 0; j < columnas; j++) {
            matriz[i][j] = `${i},${j}`;
        }
    }
    return matriz;
}

function renderizarMatriz(matriz) {
    let html = ""
    for (let i = 0; i < matriz.length; i++) {
        html += `<div class="fila" id="fila${i}">`;
            for (let j = 0; j < matriz[i].length; j++) {
                html += `<div class="celda" id="celda${i}-${j}"> </div>`;
            }
        html += `</div>`;
        tableroDiv.innerHTML = html;
    }
}

function insertarManzana() {
    let celda;

    manzanaY = Math.floor(Math.random() * 9)
    manzanaX = Math.floor(Math.random() * 9)

    celda = document.querySelector(`#celda${manzanaY}-${manzanaX}`)
    if (celda.firstChild.className == "celdaSerpiente")
    {
        console.log("NO HAY MANZANA, HAY SERPIENTE")
        insertarManzana()
    }
    celda.innerHTML = `<div class="celdaManzana" id="celda${manzanaY}-${manzanaX}"></div>`;
}

function actualizarMatriz(matriz) {
    let celda = document.querySelector(`#celda${cabezaPosY}-${cabezaPosX}`)
    if (celda == null)
    {gameOver()}

    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            celda = document.querySelector(`#celda${i}-${j}`)
            if (celda.firstChild.className == "celdaManzana")
            {
                console.log("MANZANA MANZANITA AQUI NO SE PONE CELDITA")
            } else
            {
                celda.innerHTML = `<div class="celda" id="celda${i}-${j}"></div>`;
            }

            if (j == cabezaPosX && i == cabezaPosY)
            {
                if (celda.firstChild.className == "celdaManzana")
                {
                    puntuacion++;
                    puntuacionDiv.innerHTML = `PUNTUACION: ${puntuacion}`
                    insertarManzana();
                    del = false;
                }
            }
        }
    }

    let selfCollision = false;
    for(m = 0; m < cuerpo.length; m++)
    {
        celda = document.querySelector(`#celda${cuerpo[m]}`)
        console.log(celda)
        if (selfCollision == true)
        {
            gameOver()
        }
        if (`${cabezaPosY}-${cabezaPosX}` == `${cuerpo[m]}`)
        {
            selfCollision = true
        }
        celda.innerHTML = `<div class="celdaSerpiente" id="celda${cuerpo[m]}"></div>`;
    }
}

function gameOver()
{
    tableroDiv.innerHTML = "<p style='font-size: 100px;'>GAME OVER!!!!</p>";
}

tablero = crearMatriz(9, 9);
renderizarMatriz(tablero);
actualizarMatriz(tablero);
insertarManzana();
console.log(cuerpo[0])

addEventListener("keydown", function (event) {
    event.preventDefault();{
        if (event.key == "a" && lastDireccion != "right")
        {
            direccion = "left";
            lastDireccion = "left";
        }
        else if (event.key == "d" && lastDireccion != "left")
        {
            direccion = "right";
            lastDireccion = "right";
        }
        else if (event.key == "s" && lastDireccion != "up")
        {
            direccion = "down";
            lastDireccion = "down";
        }
        else if (event.key == "w" && lastDireccion != "down")
        {
            direccion = "up";
            lastDireccion = "up";
        }
    }
});

start = setInterval(() => {
    if (direccion == "left")
    {
        cabezaPosX--;
    }
    else if (direccion == "right")
    {
        cabezaPosX++;
    }
    else if (direccion == "down")
    {
        cabezaPosY++;
    }
    else if (direccion == "up")
    {
        cabezaPosY--;
    }

    cuerpo.push(`${cabezaPosY}-${cabezaPosX}`)

    if (del == true)
    {
        cuerpo.shift()
    } else{
        del = true
    }

    console.log(cuerpo)
    actualizarMatriz(tablero);
}, 300);