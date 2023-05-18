const textArea = document.getElementById("texto-entrada");
const mensajeEncriptado = document.getElementById("encriptado");
const btnEncriptar = document.getElementById("encriptar");
const btnDesencriptar = document.getElementById("desencriptar");
const btnCopiar = document.getElementById("copiar");
const dibujo = document.getElementById("sin-resultado");
const areaResultados = document.getElementById("texto-encriptado");


/*La letra "e" es convertida para "enter"
La letra "i" es convertida para "imes"
La letra "a" es convertida para "ai"
La letra "o" es convertida para "ober"
La letra "u" es convertida para "ufat"*/

function ocultarResultados() {
    areaResultados.style.display = "none";
}

ocultarResultados();

function ocultarDibujo(){
    dibujo.style.display = "none";
}


function verificar(textoIngresado) {
  
    let letrasIngresadas = textoIngresado.key;
  
    if (/[A-ZÁÉÍÓÚÑÜ^$*()_+|~=`{}\[\]:";'<>?,.\/\\@#€£¥₹%^&]/.test(letrasIngresadas) && textoIngresado.code !== "Backspace" && textoIngresado.code !== "Delete") {
      textoIngresado.preventDefault();
      alert("Solo se permiten letras minúsculas y números.");
    }
  }

textArea.addEventListener("keydown",verificar);


// if (textArea == "") {
//     alert("Aún no ha ingresado el texto que dese encriptar")
// }



function encriptarTexto(textoEntrada){
    let vocales = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    
    for (let i = 0; i < vocales.length; i++) {
        if(textoEntrada.includes(vocales[i][0])) {
            textoEntrada = textoEntrada.replaceAll(vocales[i][0], vocales[i][1]);
        }
        ocultarDibujo();
    }
    return textoEntrada
}


function botonEncriptar(){
    const textoSalida = encriptarTexto(textArea.value);
    mensajeEncriptado.value = textoSalida;
    textArea.value = "";
    areaResultados.style.display = "flex"; 
}


btnEncriptar.addEventListener("click",botonEncriptar);



function desencriptarTexto(textoEncriptado) {
    let codigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    
    for (let i = 0; i < codigo.length; i++) {
        if(textoEncriptado.includes(codigo[i][1])) {
            textoEncriptado = textoEncriptado.replaceAll(codigo[i][1], codigo[i][0]);
        }
    }
    return textoEncriptado
}

function botonDesencriptar(){
    const textoSalida = desencriptarTexto(textArea.value);
    mensajeEncriptado.value = textoSalida;
    textArea.value = "";
    areaResultados.style.display = "flex";
    dibujo.style.display = "none";

}



btnDesencriptar.addEventListener("click",botonDesencriptar);



function copiar(){
    let textoCopiado = mensajeEncriptado.value;
    navigator.clipboard.writeText(textoCopiado);
    areaResultados.style.display = "none"; 
    dibujo.style.display = "flex";
}

btnCopiar.addEventListener("click",copiar);


