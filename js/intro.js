// ==========================================
// PANTALLA COMPLETA CONTINUA
// ==========================================
function asegurarPantallaCompleta() {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen().catch(() => {});
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
    }
}
document.addEventListener('click', asegurarPantallaCompleta);
document.addEventListener('touchstart', asegurarPantallaCompleta);

// ==========================================
// MÓDULO 1: LINTERNA
// ==========================================
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

function posicionarBotones() {
    botonesOcultos.forEach(boton => {
        const x = Math.floor(Math.random() * 75) + 10;
        const y = Math.floor(Math.random() * 75) + 10;
        boton.style.left = `${x}%`;
        boton.style.top = `${y}%`;
    });
}
posicionarBotones();

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
// TRANSICIONES
// ==========================================
btnEmpezar.addEventListener('click', () => {
    capaOscuraFinal.classList.add('activo');
    const mensajeCarga = document.getElementById('mensaje-carga');
    if (mensajeCarga) mensajeCarga.style.display = 'flex';
    clearInterval(intervaloCorazones);
    
    setTimeout(() => {
        document.getElementById('modulo-intro').style.display = 'none';
        document.getElementById('modulo-video').style.display = 'flex';
        capaOscuraFinal.classList.remove('activo');
        
        setTimeout(() => {
            if (mensajeCarga) mensajeCarga.style.display = 'none';
        }, 1000);
        
        const videoSorpresa = document.getElementById('video-sorpresa');
        if (videoSorpresa) {
            let playPromise = videoSorpresa.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    videoSorpresa.muted = true;
                    videoSorpresa.play();
                });
            }
            
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
    }, 4000); 
});

const btnSiguiente = document.getElementById('btn-siguiente-tesoro');
if (btnSiguiente) {
    btnSiguiente.addEventListener('click', () => {
        capaOscuraFinal.classList.add('activo');
        setTimeout(() => {
            document.getElementById('modulo-video').style.display = 'none';
            document.getElementById('modulo-tesoro').style.display = 'flex';
            
            if (llavesEncontradas.length === 10) {
                document.getElementById('interfaz-tesoro').style.display = 'none';
                document.getElementById('carta-final').style.display = 'block';
            } else {
                document.getElementById('interfaz-tesoro').style.display = 'block';
                document.getElementById('carta-final').style.display = 'none';
            }
            
            capaOscuraFinal.classList.remove('activo');
        }, 1500);
    });
}

// ==========================================
// MÓDULO 3: LLAVES SECRETAS
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
                    mostrarMensaje("Ya usaste esta llave, busca otra.", "#fbbf24"); 
                } else {
                    llavesEncontradas.push(numeroIngresado);
                    mostrarMensaje("¡Llave correcta! 🔓", "#4ade80"); 
                    
                    slotsLlaves[llavesEncontradas.length - 1].innerText = '❤️';
                    slotsLlaves[llavesEncontradas.length - 1].style.transform = 'scale(1.3)';
                    setTimeout(() => slotsLlaves[llavesEncontradas.length - 1].style.transform = 'scale(1)', 300);

                    if (llavesEncontradas.length === 10) {
                        setTimeout(revelarCartaFinal, 1500);
                    }
                }
            } else {
                mostrarMensaje("Número incorrecto. Revisa bien.", "#f87171"); 
            }
            
            inputActual = "";
            displayCodigo.innerText = "";
        } 
        else {
            if (inputActual.length < 2) {
                inputActual += valor;
                displayCodigo.innerText = inputActual;
            }
        }
    });
});

function revelarCartaFinal() {
    capaOscuraFinal.classList.add('activo');
    setTimeout(() => {
        document.getElementById('interfaz-tesoro').style.display = 'none';
        document.getElementById('carta-final').style.display = 'block';
        capaOscuraFinal.classList.remove('activo');
        
        if (btnRegresarCarta) btnRegresarCarta.style.display = 'block';
        
        setInterval(crearCorazon, 400); 
    }, 1500);
}

// ==========================================
// VENTANA FLOTANTE DE AYUDA (MODAL)
// ==========================================
const btnAbrirAyuda = document.getElementById('btn-abrir-ayuda');
const btnCerrarAyuda = document.getElementById('btn-cerrar-ayuda');
const registroLlaves = document.getElementById('registro-llaves');
const capaOscuraAyuda = document.getElementById('capa-oscura-ayuda');
const btnRegresarCarta = document.getElementById('btn-regresar-carta'); 

if (btnAbrirAyuda) {
    btnAbrirAyuda.addEventListener('click', () => {
        registroLlaves.style.display = 'block';
        capaOscuraAyuda.style.display = 'block';
    });
}

if (btnCerrarAyuda) {
    btnCerrarAyuda.addEventListener('click', () => {
        registroLlaves.style.display = 'none';
        capaOscuraAyuda.style.display = 'none';
    });
}

if (btnRegresarCarta) {
    btnRegresarCarta.addEventListener('click', () => {
        document.getElementById('interfaz-tesoro').style.display = 'none';
        document.getElementById('carta-final').style.display = 'block';
    });
}

// ==========================================
// BOTONES DENTRO DE LA CARTA
// ==========================================
const btnCandados = document.getElementById('btn-candados');
const btnSiguienteSorpresa = document.getElementById('btn-siguiente');

if (btnCandados) {
    btnCandados.addEventListener('click', () => {
        document.getElementById('carta-final').style.display = 'none';
        document.getElementById('interfaz-tesoro').style.display = 'block';
        if (btnRegresarCarta) {
            btnRegresarCarta.style.display = 'block';
        }
    });
}

if (btnSiguienteSorpresa) {
    btnSiguienteSorpresa.addEventListener('click', () => {
        alert("¡Próximamente: Módulo 4! Aquí irá la siguiente sorpresa.");
    });
}

// ==========================================
// LÓGICA DEL MENÚ DE NAVEGACIÓN Y ARRASTRE
// ==========================================
const btnMenuFlotante = document.getElementById('btn-menu-flotante');
const pantallaMenu = document.getElementById('pantalla-menu');
const btnCerrarMenu = document.querySelector('.btn-cerrar-menu');
const botonesNavMenu = document.querySelectorAll('.btn-nav-menu');

// --- Lógica para arrastrar el botón flotante ---
let arrastrando = false;
let offsetX, offsetY;
let movido = false;

if (btnMenuFlotante) {
    btnMenuFlotante.addEventListener('touchstart', (e) => {
        arrastrando = true;
        movido = false; // Asumimos que es un toque normal hasta que se mueva
        const touch = e.touches[0];
        const rect = btnMenuFlotante.getBoundingClientRect();
        offsetX = touch.clientX - rect.left;
        offsetY = touch.clientY - rect.top;
        btnMenuFlotante.classList.add('arrastrando');
    }, {passive: false});

    document.addEventListener('touchmove', (e) => {
        if (!arrastrando) return;
        movido = true; // Si se movió, ya no es un "clic"
        e.preventDefault(); // Evita que la pantalla se desplace
        const touch = e.touches[0];
        let nuevaX = touch.clientX - offsetX;
        let nuevaY = touch.clientY - offsetY;
        
        // Límites para que no se salga de la pantalla
        if (nuevaX < 0) nuevaX = 0;
        if (nuevaY < 0) nuevaY = 0;
        if (nuevaX + btnMenuFlotante.offsetWidth > window.innerWidth) nuevaX = window.innerWidth - btnMenuFlotante.offsetWidth;
        if (nuevaY + btnMenuFlotante.offsetHeight > window.innerHeight) nuevaY = window.innerHeight - btnMenuFlotante.offsetHeight;
        
        btnMenuFlotante.style.left = nuevaX + 'px';
        btnMenuFlotante.style.top = nuevaY + 'px';
        btnMenuFlotante.style.bottom = 'auto'; // Resetea el bottom original
        btnMenuFlotante.style.right = 'auto';
    }, {passive: false});

    document.addEventListener('touchend', () => {
        arrastrando = false;
        btnMenuFlotante.classList.remove('arrastrando');
        
        // Si no se movió casi nada, se considera un clic para abrir el menú
        if (!movido) {
            pantallaMenu.classList.add('activo');
            asegurarPantallaCompleta();
        }
    });
}
// -----------------------------------------------

if (btnCerrarMenu) {
    btnCerrarMenu.addEventListener('click', () => {
        pantallaMenu.classList.remove('activo');
    });
}

botonesNavMenu.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const destino = e.target.getAttribute('data-destino');
        pantallaMenu.classList.remove('activo');
        
        document.getElementById('modulo-intro').style.display = 'none';
        document.getElementById('modulo-video').style.display = 'none';
        document.getElementById('modulo-tesoro').style.display = 'none';
        document.getElementById('interfaz-tesoro').style.display = 'none';
        document.getElementById('carta-final').style.display = 'none';
        
        clearInterval(intervaloCorazones);
        
        const video = document.getElementById('video-sorpresa');
        const finalVideo = document.getElementById('contenedor-final-video');
        if (video) {
            video.pause();
            video.currentTime = 0;
            video.style.display = 'block'; 
        }
        if (finalVideo) {
            finalVideo.style.display = 'none';
            finalVideo.classList.remove('activo');
        }

        if (destino === 'linterna') {
            document.getElementById('modulo-intro').style.display = 'flex';
            
            botonesEncontrados = 0;
            haMovidoLinterna = false;
            linterna.classList.remove('desactivada');
            linterna.style.setProperty('--x', `-1000px`);
            linterna.style.setProperty('--y', `-1000px`);
            contenidoRevelado.classList.remove('activo');
            instrucciones.classList.remove('oculto');
            
            botonesOcultos.forEach(b => {
                b.classList.remove('encontrado');
                b.style.opacity = '1';
            });
            posicionarBotones(); 
            contenedorCorazones.innerHTML = ''; 
            
        } else if (destino === 'video') {
            document.getElementById('modulo-video').style.display = 'flex';
            if (video) video.play().catch(() => {});
            
            setTimeout(() => {
                if(document.getElementById('modulo-video').style.display === 'flex') {
                    video.style.display = 'none';
                    if (finalVideo) {
                        finalVideo.style.display = 'block';
                        setTimeout(() => finalVideo.classList.add('activo'), 50);
                    }
                }
            }, 11000);
            
        } else if (destino === 'tesoro') {
            document.getElementById('modulo-tesoro').style.display = 'flex';
            
            if (llavesEncontradas.length === 10) {
                document.getElementById('interfaz-tesoro').style.display = 'none';
                document.getElementById('carta-final').style.display = 'block';
            } else {
                document.getElementById('interfaz-tesoro').style.display = 'block';
                document.getElementById('carta-final').style.display = 'none';
            }
        }
        asegurarPantallaCompleta();
    });
});
            
