const linterna = document.getElementById('linterna');
const pantalla = document.getElementById('modulo-intro');
const botonesOcultos = document.querySelectorAll('.btn-oculto');
const contenidoRevelado = document.getElementById('contenido-revelado');
const contenedorCorazones = document.getElementById('contenedor-corazones');
const btnEmpezar = document.getElementById('btn-empezar');
const capaOscuraFinal = document.getElementById('capa-oscura-final');
const instrucciones = document.getElementById('instrucciones');
const sonidoBoton = document.getElementById('sonido-boton');

let botonesEncontrados = 0;
let intervaloCorazones;
let haMovidoLinterna = false;

// 1. Asignar posiciones aleatorias a los botones
function posicionarBotones() {
    botonesOcultos.forEach(boton => {
        const x = Math.floor(Math.random() * 75) + 10;
        const y = Math.floor(Math.random() * 75) + 10;
        boton.style.left = `${x}%`;
        boton.style.top = `${y}%`;
    });
}
posicionarBotones();

// 2. Lógica de la linterna y ocultar instrucciones
function actualizarLinterna(e) {
    let x = e.touches ? e.touches[0].clientX : e.clientX;
    let y = e.touches ? e.touches[0].clientY : e.clientY;
    
    linterna.style.setProperty('--x', `${x}px`);
    linterna.style.setProperty('--y', `${y}px`);

    if (!haMovidoLinterna) {
        instrucciones.classList.add('oculto');
        haMovidoLinterna = true;
    }
}

pantalla.addEventListener('mousemove', actualizarLinterna);
pantalla.addEventListener('touchmove', actualizarLinterna);

// 3. Lógica de los botones con sonido
botonesOcultos.forEach(boton => {
    boton.addEventListener('click', () => {
        if (!boton.classList.contains('encontrado')) {
            boton.classList.add('encontrado');
            botonesEncontrados++;
            
            sonidoBoton.currentTime = 0;
            sonidoBoton.play().catch(e => console.log("Audio bloqueado", e));
            
            if (botonesEncontrados === 3) {
                iniciarRevelacion();
            }
        }
    });
});

// 4. Secuencia de revelación
function iniciarRevelacion() {
    linterna.classList.add('desactivada');
    botonesOcultos.forEach(b => b.style.opacity = '0');
    contenidoRevelado.classList.add('activo');
    intervaloCorazones = setInterval(crearCorazon, 300);
}

function crearCorazon() {
    const corazon = document.createElement('div');
    corazon.classList.add('corazon-cayendo');
    corazon.innerText = '❤️';
    corazon.style.left = Math.random() * 100 + 'vw';
    const size = Math.random() * 20 + 15;
    corazon.style.fontSize = `${size}px`;
    corazon.style.animationDuration = Math.random() * 3 + 3 + 's';
    
    contenedorCorazones.appendChild(corazon);
    setTimeout(() => { corazon.remove(); }, 6000);
}

// ==========================================
// 5. TRANSICIÓN DIRECTA AL VIDEO Y PANTALLA COMPLETA
// ==========================================
btnEmpezar.addEventListener('click', () => {
    
    // Pedir pantalla completa al navegador
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen().catch(e => console.log("Fullscreen bloqueado", e));
    } else if (elem.webkitRequestFullscreen) { /* Safari en iPhone */
        elem.webkitRequestFullscreen();
    }

    // 1. Pantalla en negro
    capaOscuraFinal.classList.add('activo');
    clearInterval(intervaloCorazones);
    
    // 2. Esperamos a que la pantalla esté negra y cambiamos de módulo
    setTimeout(() => {
        document.getElementById('modulo-intro').style.display = 'none';
        document.getElementById('modulo-video').style.display = 'flex';
        
        // 3. Quitamos la pantalla negra
        capaOscuraFinal.classList.remove('activo');
        
        // 4. Reproducimos el video directamente
        const videoSorpresa = document.getElementById('video-sorpresa');
        if (videoSorpresa) {
            let playPromise = videoSorpresa.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    videoSorpresa.muted = true;
                    videoSorpresa.play();
                });
            }
            
            // Sistema anti-fallos a los 11 segundos
            setTimeout(() => {
                videoSorpresa.style.display = 'none';
                const finalVideo = document.getElementById('contenedor-final-video');
                if (finalVideo) {
                    finalVideo.style.display = 'block';
                    setTimeout(() => {
                        finalVideo.classList.add('activo');
                    }, 50);
                }
            }, 11000);
        }
    }, 1500); 
});

// ==========================================
// 6. TRANSICIÓN A LA BÚSQUEDA DEL TESORO
// ==========================================
const btnSiguiente = document.getElementById('btn-siguiente-tesoro');
if (btnSiguiente) {
    btnSiguiente.addEventListener('click', () => {
        capaOscuraFinal.classList.add('activo');
        
        setTimeout(() => {
            // Ocultamos video, mostramos tesoro. Mantenemos pantalla completa para inmersión
            document.getElementById('modulo-video').style.display = 'none';
            document.getElementById('modulo-tesoro').style.display = 'flex';
            capaOscuraFinal.classList.remove('activo');
        }, 1500);
    });
}

// ==========================================
// 7. LÓGICA DE LAS 10 LLAVES SECRETAS
// ==========================================
const llavesSecretas = [7, 23, 2, 4, 69, 11, 50, 48, 37, 22];
let llavesEncontradas = [];
let inputActual = "";

const teclas = document.querySelectorAll('.btn-tecla');
const displayCodigo = document.getElementById('codigo-actual');
const slotsLlaves = document.querySelectorAll('.llave-slot');
const mensajeFeedback = document.getElementById('mensaje-feedback');

function mostrarMensaje(texto, color) {
    mensajeFeedback.innerText = texto;
    mensajeFeedback.style.color = color;
    mensajeFeedback.style.opacity = '1';
    setTimeout(() => mensajeFeedback.style.opacity = '0', 2500);
}

teclas.forEach(tecla => {
    tecla.addEventListener('click', () => {
        const valor = tecla.innerText;

        if (valor === "⌫") {
            inputActual = inputActual.slice(0, -1);
            displayCodigo.innerText = inputActual;
        } 
        else if (valor === "OK") {
            if (inputActual === "") return;
            
            let numeroIngresado = parseInt(inputActual);

            if (llavesSecretas.includes(numeroIngresado)) {
                if (llavesEncontradas.includes(numeroIngresado)) {
                    mostrarMensaje("Ya usaste esta llave, busca otra.", "#fbbf24"); // Amarillo
                } else {
                    // ¡Llave correcta!
                    llavesEncontradas.push(numeroIngresado);
                    mostrarMensaje("¡Llave correcta! 🔓", "#4ade80"); // Verde
                    
                    // Actualizar candadito a corazón
                    slotsLlaves[llavesEncontradas.length - 1].innerText = '❤️';
                    slotsLlaves[llavesEncontradas.length - 1].style.transform = 'scale(1.3)';
                    setTimeout(() => slotsLlaves[llavesEncontradas.length - 1].style.transform = 'scale(1)', 300);

                    // ¿Ganó? Si ya encontró las 10
                    if (llavesEncontradas.length === 10) {
                        setTimeout(revelarCartaFinal, 1500);
                    }
                }
            } else {
                mostrarMensaje("Número incorrecto. Revisa bien.", "#f87171"); // Rojo
            }
            
            // Limpiar input tras presionar OK
            inputActual = "";
            displayCodigo.innerText = "";
        } 
        else {
            // Limitar a máximo 2 dígitos (las llaves son máximo el número 69)
            if (inputActual.length < 2) {
                inputActual += valor;
                displayCodigo.innerText = inputActual;
            }
        }
    });
});

// ==========================================
// 8. REVELACIÓN DE LA CARTA FINAL
// ==========================================
function revelarCartaFinal() {
    // Transición mágica final
    capaOscuraFinal.classList.add('activo');
    
    setTimeout(() => {
        document.getElementById('interfaz-tesoro').style.display = 'none';
        document.getElementById('carta-final').style.display = 'block';
        capaOscuraFinal.classList.remove('activo');
        
        // Lluvia de corazones para celebrar el final
        setInterval(crearCorazon, 400); 
    }, 1500);
    }
            
