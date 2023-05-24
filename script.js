const textArea = document.getElementById("texto-entrada");
const mensajeEncriptado = document.getElementById("encriptado");
const btnEncriptar = document.getElementById("encriptar");
const btnDesencriptar = document.getElementById("desencriptar");
const btnCopiar = document.getElementById("copiar");
const dibujo = document.getElementById("sin-resultado");
const areaResultados = document.getElementById("texto-encriptado");


/*Bloqueo del área de resultados y del botón copiar */
function ocultarResultados() {
    areaResultados.style.display = "none";
}

ocultarResultados();

/*Oculta el dibujo y los mensajes de sin resultado*/
function ocultarDibujo(){
    dibujo.style.display = "none";
}

/* Función que inhabilita los botones si no hay texto ingresado */
function verificarEspacios() {
    const texto = textArea.value;
  
    if (texto === "") {
      btnEncriptar.disabled = true;
      btnDesencriptar.disabled = true;
      } else {
      btnEncriptar.disabled = false;
      btnDesencriptar.disabled = false;
    }
  }
  
  /* Escucha al evento "input" en la textArea y llama a la función verificarEspacios*/
  textArea.addEventListener("input", verificarEspacios);
  
  /* Llama a la función verificarEspacios */
  verificarEspacios();


/*Función que no permite ingresar letras mayúsculas, números, ni caracteres especiales
además permite el uso de flechas, tab, enter, delete, control y shift*/
function verificar(textoIngresado) {
  
    let letrasIngresadas = textoIngresado.key;
  
    if (/[A-ZÁÉÍÓÚÑÜ^$*()_+|~=`{}\[\]:";'<>?,.\/\\@#€£¥₹%^&0-9]/.test(letrasIngresadas) 
        && textoIngresado.code !== "Backspace" 
        && textoIngresado.code !== "Delete"
        && textoIngresado.code !== "Tab"
        && textoIngresado.code !== "ArrowUp"
        && textoIngresado.code !== "ArrowDown"
        && textoIngresado.code !== "ArrowLeft"
        && textoIngresado.code !== "ArrowRight"
        && textoIngresado.code !== "Enter"
        && !textoIngresado.ctrlKey
        && !textoIngresado.shiftKey) {
            textoIngresado.preventDefault();
            alert("💥 Sólo puede ingresar letras minúsculas. 💥")
    }
}


/*Escucha el evento de presionar una tecla en la textArea y llama a la función verificar*/
textArea.addEventListener("keydown",verificar);


/* Función que encripta el texto bajo las siguientes reglas:
La letra "e" es convertida para "enter"
La letra "i" es convertida para "imes"
La letra "a" es convertida para "ai"
La letra "o" es convertida para "ober"
La letra "u" es convertida para "ufat"  */
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

/*Funcíon que asocia el botón encriptar al valor de la textArea y llama a la función encriptarTexto*/
function botonEncriptar(){
    const textoSalida = encriptarTexto(textArea.value);
    mensajeEncriptado.value = textoSalida;
    textArea.value = "";
    areaResultados.style.display = "flex"; 
}

/*Escucha el click en el botón encriptar y llama a la función botonEncriptar*/
btnEncriptar.addEventListener("click",botonEncriptar);


/* Esta función permite desencriptar el texto bajo las siguientes reglas:
"enter" es convertida para la letra "e"
"imes" es convertida para la letra "i"
"ai" es convertida para la letra "a"
"ober" es convertida para la letra "o"
"ufat" es convertida para la letra "u" */
function desencriptarTexto(textoEncriptado) {
    let codigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    
    for (let i = 0; i < codigo.length; i++) {
        if(textoEncriptado.includes(codigo[i][1])) {
            textoEncriptado = textoEncriptado.replaceAll(codigo[i][1], codigo[i][0]);
        }
    }
    return textoEncriptado
}

/* Función que asocia el botón Desencriptar con el contenido del mensajeEncriptado y llama
a la función desencriptarTexto */
function botonDesencriptar(){
    const textoSalida = desencriptarTexto(textArea.value);
    mensajeEncriptado.value = textoSalida;
    textArea.value = "";
    areaResultados.style.display = "flex";
    ocultarDibujo();

}

/* Escucha el click en el botón Desencriptar y llama a la función botonDesencriptar */
btnDesencriptar.addEventListener("click",botonDesencriptar);

/* Esta función permite poner en el portapapeles el texto encriptado */
function copiar(){
    let textoCopiado = mensajeEncriptado.value;
    navigator.clipboard.writeText(textoCopiado);
    ocultarResultados(); 
    dibujo.style.display = "flex";
}

/*Escucha el click en el botón Copiar y llama a la función copiar */
btnCopiar.addEventListener("click",copiar);


