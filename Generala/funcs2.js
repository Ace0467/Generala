let asignadorToStart;
let jugadas;

let contenedorCont = document.getElementById("contenedorDados");

let estadoDelJuego = {

    dados: ["", "", "", "", ""],
    dadosAcambiar: [],
    movsPendientes: 3,
    player1points: 0,
    player2points: 0,
    pointsOne: 0,
    rounds: 0

}

let arrDados;



let diceNum;
let botonRoll = document.getElementById("roll");
let botonReRoll = document.getElementById("reRoll");
let diceTemp;

let movsPendientes;

// let combsLadder = [

//     [1, 2, 3, 4, 5]
//     [2, 3, 4, 5, 6]
//     [1, 3, 4, 5, 6]

// ];
function init() {

    asignadorToStart = (Math.floor(Math.random() * 2) + 1);
    // rondas = 0;

    if (asignadorToStart == 1) {

        document.getElementById("nombre1").style.color = "blue";
        document.getElementById("nombre2").style.color = "white";

    } else {

        document.getElementById("nombre1").style.color = "white";
        document.getElementById("nombre2").style.color = "blue";

    }

    movsPendientes = 3;
    document.getElementById("movs").innerHTML = "Movimientos pendientes: " + movsPendientes;
}

function diceRoll() {

    limpiarRadio();

    estadoDelJuego.dados = [];

    if (movsPendientes > 0) {

        if (movsPendientes == 3 || contenedorCont.innerHTML == null) {

            for (i = 0; i < 5; i++) {

                generateDice();

            }

        } else {

            if (contenedorCont.innerHTML != null) {

                for (i = 0; i < 5; i++) {

                    diceTemp = contenedorCont.childNodes[i];

                    if (diceTemp.getAttribute("class") != "selected") {

                        estadoDelJuego.dadosAcambiar.push(diceTemp);

                    }
                }
            }

            estadoDelJuego.dadosAcambiar.forEach(dice => {

                contenedorCont.removeChild(dice);

                generateDice();

            });

            estadoDelJuego.dadosAcambiar = [];

        }

        for (i = 0; i < 5; i++) {
            estadoDelJuego.dados.push(contenedorCont.childNodes[i].getAttribute("data-dice-index"));
        }


    } else {

        if (asignadorToStart === 1) {

            contenedorCont.innerHTML = ""

            document.getElementById("nombre1").style.color = "white";
            document.getElementById("nombre2").style.color = "blue";

            asignadorToStart = 2;
            console.log("ahora va el otro 1");

        } else {

            contenedorCont.innerHTML = "";

            document.getElementById("nombre1").style.color = "blue";
            document.getElementById("nombre2").style.color = "white";

            asignadorToStart = 1;
            console.log("ahora va el otro 2");
        }

        botonRoll.style.display = "block";
        botonReRoll.style.display = "none";
        //botonPlant.style.display = "block";
        estadoDelJuego.rounds = estadoDelJuego.rounds + 1;

        if (estadoDelJuego.rounds === 11) {

            if (document.getElementById("jugador1_puntos").innerHTML > document.getElementById("jugador2_puntos").innerHTML) {

                document.getElementById("contenedorDados").style.display = "none";
                document.getElementById("nombres").style.display = "none";
                document.getElementById("winMsgInput").innerHTML = "¡JUGADOR 1, GANASTE!";
                document.getElementById("winMsg").style.display = "block";

            } else if (document.getElementById("jugador1_puntos").innerHTML < document.getElementById("jugador2_puntos").innerHTML) {

                document.getElementById("contenedorDados").style.display = "none";
                document.getElementById("nombres").style.display = "none";
                document.getElementById("winMsgInput").innerHTML = "¡JUGADOR 2, GANASTE!";
                document.getElementById("winMsg").style.display = "block";

            } else if (document.getElementById("jugador1_puntos").innerHTML === document.getElementById("jugador2_puntos").innerHTML) {

                document.getElementById("contenedorDados").style.display = "none";
                document.getElementById("nombres").style.display = "none";
                document.getElementById("winMsgInput").innerHTML = "EMPATE";
                document.getElementById("winMsg").style.display = "block";

            }

        }

    }

    movsPendientes = movsPendientes - 1;

    if (movsPendientes > 0) {

    } else if (movsPendientes === 0) {

        botonRoll.style.display = "none";
        botonReRoll.style.display = "none";


    } else if (movsPendientes < 0) {

        movsPendientes = 3;

    }

    document.getElementById("movs").innerHTML = "Movimientos pendientes: " + movsPendientes;

    checkPlays();
}

function disappearPlay() {

    document.getElementById("opcion_1").disabled = true;
    document.getElementById("playOne").style.display = "none";
    document.getElementById("opcion_2").disabled = true;
    document.getElementById("playTwo").style.display = "none";
    document.getElementById("opcion_3").disabled = true;
    document.getElementById("playThree").style.display = "none";
    document.getElementById("opcion_4").disabled = true;
    document.getElementById("playFour").style.display = "none";
    document.getElementById("opcion_5").disabled = true;
    document.getElementById("playFive").style.display = "none";
    document.getElementById("opcion_6").disabled = true;
    document.getElementById("playSix").style.display = "none";
    document.getElementById("opcion_poker").disabled = true;
    document.getElementById("playPoker").style.display = "none";
    document.getElementById("opcion_full").disabled = true;
    document.getElementById("playFull").style.display = "none";
    document.getElementById("opcion_escalera").disabled = true;
    document.getElementById("playEscalera").style.display = "none";
    document.getElementById("opcion_generala").disabled = true;
    document.getElementById("playGenerala").style.display = "none";
    document.getElementById("opcion_generala2").disabled = true;
    document.getElementById("playGeneralaDoble").style.display = "none";


}

function checkPlays() {

    arrDados = estadoDelJuego.dados;
    arrDados.sort(function (a, b) { return a - b });


    if (document.getElementById("jugador" + asignadorToStart + "_1").innerHTML === "") {

        document.getElementById("opcion_1").disabled = false;
        document.getElementById("playOne").style.display = "block";

    } else if (movsPendientes < 0) {

        document.getElementById("opcion_1").disabled = true;
        document.getElementById("playOne").style.display = "none";

    }


    if (document.getElementById("jugador" + asignadorToStart + "_2").innerHTML === "") {

        document.getElementById("opcion_2").disabled = false;
        document.getElementById("playTwo").style.display = "block";

    } else if (movsPendientes < 0) {

        document.getElementById("opcion_2").disabled = true;
        document.getElementById("playTwo").style.display = "none";

    }


    if (document.getElementById("jugador" + asignadorToStart + "_3").innerHTML === "") {

        document.getElementById("opcion_3").disabled = false;
        document.getElementById("playThree").style.display = "block";

    } else if (movsPendientes < 0) {

        document.getElementById("opcion_3").disabled = true;
        document.getElementById("playThree").style.display = "none";

    }


    if (document.getElementById("jugador" + asignadorToStart + "_4").innerHTML === "") {

        document.getElementById("opcion_4").disabled = false;
        document.getElementById("playFour").style.display = "block";

    } else if (movsPendientes < 0) {

        document.getElementById("opcion_4").disabled = true;
        document.getElementById("playFour").style.display = "none";

    }

    if (document.getElementById("jugador" + asignadorToStart + "_5").innerHTML === "") {

        document.getElementById("opcion_5").disabled = false;
        document.getElementById("playFive").style.display = "block";

    } else if (movsPendientes < 0) {

        document.getElementById("opcion_5").disabled = true;
        document.getElementById("playFive").style.display = "none";

    }

    if (document.getElementById("jugador" + asignadorToStart + "_6").innerHTML === "") {

        document.getElementById("opcion_6").disabled = false;
        document.getElementById("playSix").style.display = "block";

    } else if (movsPendientes < 0) {

        document.getElementById("opcion_6").disabled = true;
        document.getElementById("playSix").style.display = "none";

    }


    //POKER

    if (document.getElementById("jugador" + asignadorToStart + "_poker").innerHTML === "") {

        document.getElementById("opcion_poker").disabled = false;
        document.getElementById("playPoker").style.display = "block";

    } else if (movsPendientes < 0) {

        document.getElementById("opcion_poker").disabled = true;
        document.getElementById("playPoker").style.display = "none";

    }

    //FULL

    if (document.getElementById("jugador" + asignadorToStart + "_full").innerHTML === "") {

        document.getElementById("opcion_full").disabled = false;
        document.getElementById("playFull").style.display = "block";

    } else if (movsPendientes < 0) {

        document.getElementById("opcion_full").disabled = true;
        document.getElementById("playFull").style.display = "none";

    }

    //ESCALERAS (TODAS LAS COMBINAIONES)

    if (document.getElementById("jugador" + asignadorToStart + "_escalera").innerHTML === "") {

        document.getElementById("opcion_escalera").disabled = false;
        document.getElementById("playEscalera").style.display = "block";

    } else if (movsPendientes < 0) {

        document.getElementById("opcion_escalera").disabled = true;
        document.getElementById("playEscalera").style.display = "none";

    }

    //GENERALA (SINGULAR Y DOBLE)

    if (document.getElementById("jugador" + asignadorToStart + "_generala").innerHTML === "") {

        document.getElementById("opcion_generala").disabled = false;
        document.getElementById("playGenerala").style.display = "block";

    } else if (movsPendientes < 0) {

        document.getElementById("opcion_generala").disabled = true;
        document.getElementById("playGenerala").style.display = "none";

    }

    if (document.getElementById("jugador" + asignadorToStart + "_generala2").innerHTML === "") {

        document.getElementById("opcion_generala2").disabled = false;
        document.getElementById("playGeneralaDoble").style.display = "block";

    } else if (movsPendientes < 0) {

        document.getElementById("opcion_generala2").disabled = true;
        document.getElementById("playGeneralaDoble").style.display = "none";

    }

}

function limpiarRadio() {

    document.getElementById("opcion_1").checked = false;
    document.getElementById("opcion_2").checked = false;
    document.getElementById("opcion_3").checked = false;
    document.getElementById("opcion_4").checked = false;
    document.getElementById("opcion_5").checked = false;
    document.getElementById("opcion_6").checked = false;
    document.getElementById("opcion_full").checked = false;
    document.getElementById("opcion_poker").checked = false;
    document.getElementById("opcion_escalera").checked = false;
    document.getElementById("opcion_generala").checked = false;
    document.getElementById("opcion_generala2").checked = false;

}

function generateDice() {

    diceNum = Math.floor(Math.random() * 6) + 1;

    let dadoCasillero = document.createElement("div");
    dadoCasillero.setAttribute("data-state-index", i);
    dadoCasillero.setAttribute("data-dice-index", diceNum);
    contenedorCont.appendChild(dadoCasillero);

    let dado = document.createElement("img");
    dado.setAttribute("data-dice-index", diceNum);
    dado.setAttribute("src", "img/dado" + diceNum + ".jpg");
    dadoCasillero.appendChild(dado);

    botonRoll.style.display = "none";
    botonReRoll.style.display = "block";
    //botonPlant.style.display = "block";

    dadoCasillero.onclick = evt => {

        if (evt.currentTarget.getAttribute("class") == null || evt.currentTarget.getAttribute("class") == "") {

            evt.currentTarget.setAttribute("class", "selected");

        } else if (evt.currentTarget.getAttribute("class") == "selected") {

            evt.currentTarget.classList.remove("selected");

        }
    }
}

function playGen() {

    if (arrDados[0] === arrDados[1] && arrDados[1] === arrDados[2] && arrDados[2] === arrDados[3] && arrDados[3] === arrDados[4] && !arrDados.includes("") && arrDados != []) {

        if (estadoDelJuego.movsPendientes === 2) {
            if (asignadorToStart === 1) {

                document.getElementById("contenedorDados").style.display = "none";
                document.getElementById("nombres").style.display = "none";
                document.getElementById("winMsgInput").innerHTML = "¡JUGADOR 1, GANASTE!";
                document.getElementById("winMsg").style.display = "block";

            } else {

                document.getElementById("contenedorDados").style.display = "none";
                document.getElementById("nombres").style.display = "none";
                document.getElementById("winMsgInput").innerHTML = "¡JUGADOR 2, GANASTE!";
                document.getElementById("winMsg").style.display = "block";

            }
        } else if (asignadorToStart === 1) {

            document.getElementById("jugador1_generala").innerHTML = 50;
            estadoDelJuego.player1points = estadoDelJuego.player1points + 50;
            document.getElementById("jugador1_puntos").innerHTML = estadoDelJuego.player1points;
            finishTurn();

        } else if (asignadorToStart != 1) {

            document.getElementById("jugador2_generala").innerHTML = 50;
            estadoDelJuego.player2points = estadoDelJuego.player2points + 50;
            document.getElementById("jugador2_puntos").innerHTML = estadoDelJuego.player2points;
            finishTurn();

        }
    } else {

        if (asignadorToStart === 1) {

            document.getElementById("jugador1_generala").innerHTML = 0;
            estadoDelJuego.player1points = estadoDelJuego.player1points + 0;
            document.getElementById("jugador1_puntos").innerHTML = estadoDelJuego.player1points;
            finishTurn();

        } else {

            document.getElementById("jugador2_generala").innerHTML = 0;
            estadoDelJuego.player2points = estadoDelJuego.player2points + 0;
            document.getElementById("jugador2_puntos").innerHTML = estadoDelJuego.player2points;
            finishTurn();

        }


    }

}

function playGenDoble() {

    if (arrDados[0] === arrDados[1] && arrDados[1] === arrDados[2] && arrDados[2] === arrDados[3] && arrDados[3] === arrDados[4] && !arrDados.includes("") && arrDados != [] && document.getElementById("jugador" + asignadorToStart + "_generala").innerHTML === 50) {

        if (estadoDelJuego.movsPendientes === 2) {
            if (asignadorToStart === 1) {

                document.getElementById("jugador1_generala2").innerHTML = 105;
                estadoDelJuego.player1points = estadoDelJuego.player1points + 105;
                document.getElementById("jugador1_puntos").innerHTML = estadoDelJuego.player1points;

            } else {

                document.getElementById("jugador2_generala2").innerHTML = 105;
                estadoDelJuego.player2points = estadoDelJuego.player2points + 105;
                document.getElementById("jugador2_puntos").innerHTML = estadoDelJuego.player2points;

            }
        } else if (asignadorToStart === 1) {

            document.getElementById("jugador1_generala2").innerHTML = 100;
            estadoDelJuego.player1points = estadoDelJuego.player1points + 100;
            document.getElementById("jugador1_puntos").innerHTML = estadoDelJuego.player1points;

        } else if (asignadorToStart != 1) {

            document.getElementById("jugador2_generala2").innerHTML = 100;
            estadoDelJuego.player2points = estadoDelJuego.player2points + 100;
            document.getElementById("jugador2_puntos").innerHTML = estadoDelJuego.player2points;

        }

    } else {

        if (asignadorToStart === 1) {

            document.getElementById("jugador1_generala2").innerHTML = 0;
            estadoDelJuego.player1points = estadoDelJuego.player1points + 0;
            document.getElementById("jugador1_puntos").innerHTML = estadoDelJuego.player1points;

        } else {

            document.getElementById("jugador2_generala2").innerHTML = 0;
            estadoDelJuego.player2points = estadoDelJuego.player2points + 0;
            document.getElementById("jugador2_puntos").innerHTML = estadoDelJuego.player2points;

        }

    }

    finishTurn();

}

function playPok() {

    if (arrDados[0] === arrDados[1] && arrDados[1] === arrDados[2] && arrDados[2] === arrDados[3] && arrDados[3] != arrDados[4] && !arrDados.includes("") && arrDados != []) {

        if (estadoDelJuego.movsPendientes === 2) {
            if (asignadorToStart === 1) {

                document.getElementById("jugador1_poker").innerHTML = 45;
                estadoDelJuego.player1points = estadoDelJuego.player1points + 45;
                document.getElementById("jugador1_puntos").innerHTML = estadoDelJuego.player1points;

            } else {

                document.getElementById("jugador2_poker").innerHTML = 45;
                estadoDelJuego.player2points = estadoDelJuego.player2points + 45;
                document.getElementById("jugador2_puntos").innerHTML = estadoDelJuego.player2points;

            }
        } else if (asignadorToStart === 1) {

            document.getElementById("jugador1_poker").innerHTML = 40;
            estadoDelJuego.player1points = estadoDelJuego.player1points + 40;
            document.getElementById("jugador1_puntos").innerHTML = estadoDelJuego.player1points;

        } else if (asignadorToStart != 1) {

            document.getElementById("jugador2_poker").innerHTML = 40;
            estadoDelJuego.player2points = estadoDelJuego.player2points + 40;
            document.getElementById("jugador2_puntos").innerHTML = estadoDelJuego.player2points;

        }

    } else if (arrDados[0] != arrDados[1] && arrDados[1] === arrDados[2] && arrDados[2] === arrDados[3] && arrDados[3] === arrDados[4] && !arrDados.includes("") && arrDados != []) {

        if (estadoDelJuego.movsPendientes === 2) {
            if (asignadorToStart === 1) {

                document.getElementById("jugador1_poker").innerHTML = 45;
                estadoDelJuego.player1points = estadoDelJuego.player1points + 45;
                document.getElementById("jugador1_puntos").innerHTML = estadoDelJuego.player1points;

            } else {

                document.getElementById("jugador2_poker").innerHTML = 45;
                estadoDelJuego.player2points = estadoDelJuego.player2points + 45;
                document.getElementById("jugador2_puntos").innerHTML = estadoDelJuego.player2points;

            }
        } else if (asignadorToStart === 1) {

            document.getElementById("jugador1_poker").innerHTML = 40;
            estadoDelJuego.player1points = estadoDelJuego.player1points + 40;
            document.getElementById("jugador1_puntos").innerHTML = estadoDelJuego.player1points;

        } else if (asignadorToStart != 1) {

            document.getElementById("jugador2_poker").innerHTML = 40;
            estadoDelJuego.player2points = estadoDelJuego.player2points + 40;
            document.getElementById("jugador2_puntos").innerHTML = estadoDelJuego.player2points;

        }

    } else {

        if (asignadorToStart === 1) {

            document.getElementById("jugador1_poker").innerHTML = 0;
            estadoDelJuego.player1points = estadoDelJuego.player1points + 0;
            document.getElementById("jugador1_puntos").innerHTML = estadoDelJuego.player1points;

        } else {

            document.getElementById("jugador2_poker").innerHTML = 0;
            estadoDelJuego.player2points = estadoDelJuego.player2points + 0;
            document.getElementById("jugador2_puntos").innerHTML = estadoDelJuego.player2points;

        }

    }

    finishTurn();

}

function playLadder() {

    if (arrDados.includes("1") && arrDados.includes("2") && arrDados.includes("3") && arrDados.includes("4") && arrDados.includes("5") && !arrDados.includes("") && arrDados != []) {

        if (estadoDelJuego.movsPendientes === 2) {
            if (asignadorToStart === 1) {

                document.getElementById("jugador1_escalera").innerHTML = 25;
                estadoDelJuego.player1points = estadoDelJuego.player1points + 25;
                document.getElementById("jugador1_puntos").innerHTML = estadoDelJuego.player1points;

            } else {

                document.getElementById("jugador2_escalera").innerHTML = 25;
                estadoDelJuego.player2points = estadoDelJuego.player2points + 25;
                document.getElementById("jugador2_puntos").innerHTML = estadoDelJuego.player2points;

            }
        } else if (asignadorToStart === 1) {

            document.getElementById("jugador1_escalera").innerHTML = 20;
            estadoDelJuego.player1points = estadoDelJuego.player1points + 20;
            document.getElementById("jugador1_puntos").innerHTML = estadoDelJuego.player1points;

        } else if (asignadorToStart != 1) {

            document.getElementById("jugador2_escalera").innerHTML = 20;
            estadoDelJuego.player2points = estadoDelJuego.player2points + 20;
            document.getElementById("jugador2_puntos").innerHTML = estadoDelJuego.player2points;

        }

    } else if (arrDados.includes("2") && arrDados.includes("3") && arrDados.includes("4") && arrDados.includes("5") && arrDados.includes("6") && !arrDados.includes("") && arrDados != []) {

        if (estadoDelJuego.movsPendientes === 2) {
            if (asignadorToStart === 1) {

                document.getElementById("jugador1_escalera").innerHTML = 25;
                estadoDelJuego.player1points = estadoDelJuego.player1points + 25;
                document.getElementById("jugador1_puntos").innerHTML = estadoDelJuego.player1points;

            } else {

                document.getElementById("jugador2_escalera").innerHTML = 25;
                estadoDelJuego.player2points = estadoDelJuego.player2points + 25;
                document.getElementById("jugador2_puntos").innerHTML = estadoDelJuego.player2points;

            }
        } else if (asignadorToStart === 1) {

            document.getElementById("jugador1_escalera").innerHTML = 20;
            estadoDelJuego.player1points = estadoDelJuego.player1points + 20;
            document.getElementById("jugador1_puntos").innerHTML = estadoDelJuego.player1points;

        } else if (asignadorToStart != 1) {

            document.getElementById("jugador2_escalera").innerHTML = 20;
            estadoDelJuego.player2points = estadoDelJuego.player2points + 20;
            document.getElementById("jugador2_puntos").innerHTML = estadoDelJuego.player2points;

        }

    } else if (arrDados.includes("1") && arrDados.includes("3") && arrDados.includes("4") && arrDados.includes("5") && arrDados.includes("6") && !arrDados.includes("") && arrDados != []) {

        if (estadoDelJuego.movsPendientes === 2) {
            if (asignadorToStart === 1) {

                document.getElementById("jugador1_escalera").innerHTML = 25;
                estadoDelJuego.player1points = estadoDelJuego.player1points + 25;
                document.getElementById("jugador1_puntos").innerHTML = estadoDelJuego.player1points;

            } else {

                document.getElementById("jugador2_escalera").innerHTML = 25;
                estadoDelJuego.player2points = estadoDelJuego.player2points + 25;
                document.getElementById("jugador2_puntos").innerHTML = estadoDelJuego.player2points;

            }
        } else if (asignadorToStart === 1) {

            document.getElementById("jugador1_escalera").innerHTML = 20;
            estadoDelJuego.player1points = estadoDelJuego.player1points + 20;
            document.getElementById("jugador1_puntos").innerHTML = estadoDelJuego.player1points;

        } else if (asignadorToStart != 1) {

            document.getElementById("jugador2_escalera").innerHTML = 20;
            estadoDelJuego.player2points = estadoDelJuego.player2points + 20;
            document.getElementById("jugador2_puntos").innerHTML = estadoDelJuego.player2points;

        }

    } else {

        if (asignadorToStart === 1) {

            document.getElementById("jugador1_escalera").innerHTML = 0;
            estadoDelJuego.player1points = estadoDelJuego.player1points + 0;
            document.getElementById("jugador1_puntos").innerHTML = estadoDelJuego.player1points;

        } else if (asignadorToStart != 1) {

            document.getElementById("jugador2_escalera").innerHTML = 0;
            estadoDelJuego.player2points = estadoDelJuego.player2points + 0;
            document.getElementById("jugador2_puntos").innerHTML = estadoDelJuego.player2points;

        }

    }

    finishTurn();

}

function playFull() {

    if (arrDados[0] === arrDados[1] && arrDados[2] === arrDados[3] && arrDados[3] === arrDados[4] && !arrDados.includes("") && arrDados != []) {
        if (estadoDelJuego.movsPendientes === 2) {
            if (asignadorToStart === 1) {

                document.getElementById("jugador1_full").innerHTML = 35;
                estadoDelJuego.player1points = estadoDelJuego.player1points + 35;
                document.getElementById("jugador1_puntos").innerHTML = estadoDelJuego.player1points;

            } else {

                document.getElementById("jugador2_full").innerHTML = 35;
                estadoDelJuego.player2points = estadoDelJuego.player2points + 35;
                document.getElementById("jugador2_puntos").innerHTML = estadoDelJuego.player2points;

            }
        } else if (asignadorToStart === 1) {

            document.getElementById("jugador1_full").innerHTML = 30;
            estadoDelJuego.player1points = estadoDelJuego.player1points + 30;
            document.getElementById("jugador1_puntos").innerHTML = estadoDelJuego.player1points;

        } else if (asignadorToStart != 1) {

            document.getElementById("jugador2_full").innerHTML = 30;
            estadoDelJuego.player2points = estadoDelJuego.player2points + 30;
            document.getElementById("jugador2_puntos").innerHTML = estadoDelJuego.player2points;

        }
    } else if (arrDados[0] === arrDados[1] && arrDados[1] === arrDados[2] && arrDados[3] === arrDados[4] && !arrDados.includes("") && arrDados != []) {

        if (estadoDelJuego.movsPendientes === 2) {
            if (asignadorToStart === 1) {

                document.getElementById("jugador1_full").innerHTML = 35;
                estadoDelJuego.player1points = estadoDelJuego.player1points + 35;
                document.getElementById("jugador1_puntos").innerHTML = estadoDelJuego.player1points;

            } else {

                document.getElementById("jugador2_full").innerHTML = 35;
                estadoDelJuego.player2points = estadoDelJuego.player2points + 35;
                document.getElementById("jugador2_puntos").innerHTML = estadoDelJuego.player2points;

            }
        } else if (asignadorToStart === 1) {

            document.getElementById("jugador1_full").innerHTML = 30;
            estadoDelJuego.player1points = estadoDelJuego.player1points + 30;
            document.getElementById("jugador1_puntos").innerHTML = estadoDelJuego.player1points;

        } else if (asignadorToStart != 1) {

            document.getElementById("jugador2_full").innerHTML = 30;
            estadoDelJuego.player2points = estadoDelJuego.player2points + 30;
            document.getElementById("jugador2_puntos").innerHTML = estadoDelJuego.player2points;

        }

    } else {

        if (asignadorToStart === 1) {

            document.getElementById("jugador1_full").innerHTML = 0;
            estadoDelJuego.player1points = estadoDelJuego.player1points + 0;
            document.getElementById("jugador1_puntos").innerHTML = estadoDelJuego.player1points;

        } else if (asignadorToStart != 1) {

            document.getElementById("jugador2_full").innerHTML = 0;
            estadoDelJuego.player2points = estadoDelJuego.player2points + 0;
            document.getElementById("jugador2_puntos").innerHTML = estadoDelJuego.player2points;

        }

    }

    finishTurn();

}

function playNumber(number) {

    for (i = 0; i < estadoDelJuego.dados.length; i++) {

        if (parseInt(estadoDelJuego.dados[i]) === number) {

            estadoDelJuego.pointsOne = estadoDelJuego.pointsOne + number;

        }

    }
    if (asignadorToStart === 1) {

        document.getElementById("jugador1_" + number).innerHTML = estadoDelJuego.pointsOne;
        estadoDelJuego.player1points = estadoDelJuego.player1points + estadoDelJuego.pointsOne;
        document.getElementById("jugador1_puntos").innerHTML = estadoDelJuego.player1points;

    } else if (asignadorToStart != 1) {

        document.getElementById("jugador2_" + number).innerHTML = estadoDelJuego.pointsOne;
        estadoDelJuego.player2points = estadoDelJuego.player2points + estadoDelJuego.pointsOne;
        document.getElementById("jugador2_puntos").innerHTML = estadoDelJuego.player2points;

    }

    finishTurn();

}

function finishTurn() {

    if (estadoDelJuego.rounds != 11) {

        if (asignadorToStart === 1) {

            contenedorCont.innerHTML = ""

            document.getElementById("nombre1").style.color = "white";
            document.getElementById("nombre2").style.color = "blue";

            asignadorToStart = 2;
            console.log("ahora va el otro 1");

        } else {

            contenedorCont.innerHTML = "";

            document.getElementById("nombre1").style.color = "blue";
            document.getElementById("nombre2").style.color = "white";

            asignadorToStart = 1;
            console.log("ahora va el otro 2");
        }

        botonRoll.style.display = "block";
        botonReRoll.style.display = "none";

        movsPendientes = 3;
        document.getElementById("movs").innerHTML = "Movimientos pendientes: " + movsPendientes;

    } else {

        if (document.getElementById("jugador1_puntos").innerHTML > document.getElementById("jugador2_puntos").innerHTML) {

            document.getElementById("contenedorDados").style.display = "none";
            document.getElementById("nombres").style.display = "none";
            document.getElementById("winMsgInput").innerHTML = "¡JUGADOR 1, GANASTE!";
            document.getElementById("winMsg").style.display = "block";

        } else if (document.getElementById("jugador1_puntos").innerHTML < document.getElementById("jugador2_puntos").innerHTML) {

            document.getElementById("contenedorDados").style.display = "none";
            document.getElementById("nombres").style.display = "none";
            document.getElementById("winMsgInput").innerHTML = "¡JUGADOR 2, GANASTE!";
            document.getElementById("winMsg").style.display = "block";

        } else if (document.getElementById("jugador1_puntos").innerHTML === document.getElementById("jugador2_puntos").innerHTML) {

            document.getElementById("contenedor").style.display = "none";
            document.getElementById("nombres").style.display = "none";
            document.getElementById("winMsgInput").innerHTML = "EMPATE";
            document.getElementById("winMsg").style.display = "block";

        }

    }

    estadoDelJuego.pointsOne = 0;
    estadoDelJuego.rounds = estadoDelJuego.rounds + 1;
    disappearPlay();
}