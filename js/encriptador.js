const texto = document.querySelector('#texto')
const btnEncriptar = document.querySelector('#encriptar')
const btnDensencriptar = document.querySelector('#desencriptar')
const btnCopiar = document.querySelector('#copiar')
const resultado = document.querySelector('#resultado')

const textoObj = {
    textoIngresado: '',
    textoEncriptado: '',
    encriptado: false
}

eventListeners()

function eventListeners() {

    document.addEventListener('DOMContentLoaded', () => {
        texto.focus()
    })

    btnEncriptar.addEventListener('click', encriptarTexto)

    btnCopiar.addEventListener('click', copiarTexto)

    btnDensencriptar.addEventListener('click', desencriptarTexto)

}

function encriptarTexto() {

    if(!texto.value) {
        mostrarMensaje('No hay nada para encriptar')
        return
    }

    textoObj.textoIngresado = texto.value
    textoObj.textoEncriptado = ''  

    for(let i = 0; i < textoObj.textoIngresado.length; i++ ) {
        
       textoObj.textoEncriptado += textoObj.textoIngresado[i] 

        switch(textoObj.textoIngresado[i]) {
            case 'a':               
                textoObj.textoEncriptado += 'i'
                break
            case 'e':
                textoObj.textoEncriptado += 'nter'
                break
            case 'i':
                textoObj.textoEncriptado += 'mes'
                break
            case 'o':
                textoObj.textoEncriptado += 'ber'                
                break
            case 'u':
                textoObj.textoEncriptado += 'fat'
            default:
                break   
        }    

    } 
    
    const tipo = 'encriptado'

    limpiarHtml()

    imprimirHTML(tipo)    

}
let textoNuevo = ''

function desencriptarTexto() {

    if(!texto.value) {
        mostrarMensaje('No hay nada para desencriptar')
        return
    }

    if(!textoObj.encriptado) {
        mostrarMensaje('Texto no encriptado')
        return
    }

    const tipo = 'desencriptado'

    

    for (let i = 0; i < textoObj.textoEncriptado.length; i++) {
      
        textoNuevo += textoObj.textoEncriptado[i]
        switch (textoObj.textoEncriptado[i]) {

            case 'a':
                i++
                break
            case 'e':
                i += 4
                break
            case 'i':
                i += 3
                break
            case 'o':
                i += 3
                break
            case 'u':
                i += 3
                break
            default:
                break

        }
    }

    
    console.log(textoNuevo)


    imprimirHTML(tipo)

}

function imprimirHTML(tipo) {

    limpiarHtml()

    textoObj.encriptado = true

    const parrafo = document.createElement('p')
    parrafo.className = 'encriptado'
    tipo == 'encriptado' ? parrafo.textContent = textoObj.textoEncriptado : parrafo.textContent = textoObj.textoIngresado

    resultado.appendChild(parrafo)

}

function mostrarMensaje(mensaje) {

    const alerta = document.createElement('p')

    if(!document.querySelector('.error')) {
        
    alerta.classList.add('error')
    alerta.textContent = mensaje

    document.querySelector('.mensaje_error').appendChild(alerta)

    }

    setTimeout(() => {
        alerta.remove()
    }, 2800)
    
}

function limpiarHtml() {

    texto.value = ''
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }

}

function copiarTexto() {

    if(!document.querySelector('.encriptado')) {
        mostrarMensaje('No hay nada para copiar')
        return
    }

    navigator.clipboard
          .writeText(document.querySelector('.encriptado').textContent)
          .then(
              success => console.log("text copied"), 
              err => console.log("error copying text")
          );

}