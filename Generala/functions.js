let asignadorToStart;
let jugadas;

let contenedorCont = document.getElementById("contenedorDados");
let dados = ["", "", "", "", ""];

let diceNum;
let rondas;
let dadosAcambiar = [];

let botonRoll = document.getElementById("roll");
let botonReRoll = document.getElementById("reRoll");
//let botonPlant = document.getElementById("plant");
let diceTemp;

let movsPendientes;

// let combsLadder = [

//     [1, 2, 3, 4, 5]
//     [2, 3, 4, 5, 6]
//     [1, 3, 4, 5, 6]

// ];
function init() {

    asignadorToStart = (Math.floor(Math.random() * 2));
    rondas = 0;

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
    dados = [];

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

                        dadosAcambiar.push(diceTemp);

                    }
                }
            }

            dadosAcambiar.forEach(dice => {

                contenedorCont.removeChild(dice);

                generateDice();

            });

            dadosAcambiar = [];

        }

        for (i = 0; i < 5; i++) {
            dados.push(contenedorCont.childNodes[i].getAttribute("data-dice-index"));
        }


    } else {

        if (asignadorToStart === 1) {

            contenedorCont.innerHTML = "";

            document.getElementById("nombre1").style.color = "white";
            document.getElementById("nombre2").style.color = "blue";

            asignadorToStart = 0;

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

    }

    if (movsPendientes != 0) {
        movsPendientes = movsPendientes - 1;
    } else {
        movsPendientes = 3;
    }
    document.getElementById("movs").innerHTML = "Movimientos pendientes: " + movsPendientes;
    checkPlays();
}

function checkPlays() {

    

    if (dados.includes("1")) {
        if (document.getElementById("jugador" + (asignadorToStart + 1) + "_1").innerHTML == "") {
            document.getElementById("opcion_1").disabled = false;
        }
    } else {
        document.getElementById("opcion_1").disabled = true;
    }
    
    if (dados.includes("2")) {
        if (document.getElementById("jugador" + (asignadorToStart + 1) + "_1").innerHTML == "") {
            document.getElementById("opcion_2").disabled = false;
        }
    } else {
        document.getElementById("opcion_2").disabled = true;
    }
    
    if (dados.includes("3")) {
        if (document.getElementById("jugador" + (asignadorToStart + 1) + "_1").innerHTML == "") {
            document.getElementById("opcion_3").disabled = false;
        }
    } else {
        document.getElementById("opcion_3").disabled = true;
    }

    if (dados.includes("4")) {
        if (document.getElementById("jugador" + (asignadorToStart + 1) + "_1").innerHTML == "") {
            document.getElementById("opcion_4").disabled = false;
        }
    } else {
        document.getElementById("opcion_4").disabled = true;
    }

    if (dados.includes("5")) {
        if (document.getElementById("jugador" + (asignadorToStart + 1) + "_1").innerHTML == "") {
            document.getElementById("opcion_5").disabled = false;
        }
    } else {
        document.getElementById("opcion_5").disabled = true;
    }

    if (dados.includes("6")) {
        if (document.getElementById("jugador" + (asignadorToStart + 1) + "_1").innerHTML == "") {
            document.getElementById("opcion_6").disabled = false;
        }
    } else {
        document.getElementById("opcion_6").disabled = true;
    }

}

function limpiarRadio(){

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

function naturalSort(a, b) {
    return new Intl.Collator(undefined, { numeric: true, sensitivity: "base" }).compare(a, b);
}