// ==========================================
// PANTALLA COMPLETA SILENCIOSA
// ==========================================
function activarPantallaCompleta() {
    try {
        const doc = document.documentElement;
        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
            if (doc.requestFullscreen) { doc.requestFullscreen(); }
            else if (doc.webkitRequestFullscreen) { doc.webkitRequestFullscreen(); }
        }
    } catch (e) {
        console.log("Modo app nativo activo");
    }
}
document.addEventListener('touchstart', activarPantallaCompleta, { once: true });
document.addEventListener('click', activarPantallaCompleta, { once: true });

// ==========================================
// LINTERNA Y BOTONES OCULTOS (SIN BRILLO AUTOMÁTICO)
// ==========================================
const linterna = document.getElementById('linterna');
const introSection = document.getElementById('modulo-intro');

// Posiciones 100% seguras, jamás se saldrán de la pantalla.
const posicionesSeguras = [
    { left: '22vw', top: '28vh' },
    { left: '68vw', top: '35vh' },
    { left: '45vw', top: '70vh' }
];

function prepararLinterna() {
    document.querySelectorAll('.btn-oculto').forEach((btn, index) => {
        btn.classList.remove('encontrado');
        btn.style.background = 'transparent';
        btn.style.left = posicionesSeguras[index].left;
        btn.style.top = posicionesSeguras[index].top;
        btn.style.position = 'absolute';
        btn.style.zIndex = '10';
    });
}
prepararLinterna();

introSection.addEventListener('mousemove', e => {
    linterna.style.setProperty('--x', e.clientX + 'px');
    linterna.style.setProperty('--y', e.clientY + 'px');
});
introSection.addEventListener('touchmove', e => {
    linterna.style.setProperty('--x', e.touches[0].clientX + 'px');
    linterna.style.setProperty('--y', e.touches[0].clientY + 'px');
});

let botonesEncontrados = 0;
const sonidoBoton = document.getElementById('sonido-boton');
let victoriaAlcanzada = false;

document.querySelectorAll('.btn-oculto').forEach(btn => {
    btn.addEventListener('click', function() {
        if(!this.classList.contains('encontrado')) {
            this.classList.add('encontrado');
            this.style.background = 'rgba(225, 29, 72, 0.8)';
            if(sonidoBoton) { 
                sonidoBoton.currentTime = 0; 
                sonidoBoton.play().catch(e => console.log(e)); 
            }
            botonesEncontrados++;
            
            if(botonesEncontrados === 3 && !victoriaAlcanzada) {
                victoriaAlcanzada = true;
                const revelado = document.getElementById('contenido-revelado');
                revelado.style.opacity = '1';
                revelado.style.visibility = 'visible';
                revelado.style.pointerEvents = 'all';
            }
        }
    });
});

// ==========================================
// TRANSICIÓN AL VIDEO CON PANTALLAS DE CARGA
// ==========================================
const capaCarga = document.getElementById('capa-oscura-final');
let videoFinalizado = false;
const vid = document.getElementById('video-sorpresa');
const contenedorFinalVideo = document.getElementById('contenedor-final-video');

document.getElementById('btn-empezar').addEventListener('click', () => {
    // 1. Mostrar pantalla de carga
    capaCarga.style.display = 'flex';
    
    // 2. Esperar 1.5 segundos para la magia
    setTimeout(() => {
        document.getElementById('modulo-intro').style.display = 'none';
        document.getElementById('modulo-video').style.display = 'block';
        
        capaCarga.style.display = 'none'; // Quitar carga
        
        // Reproducción forzada sin controles
        let playPromise = vid.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Mute preventivo por navegador estricto...", error);
                vid.muted = true;
                vid.play();
            });
        }
    }, 1500);
});

// Solución "Infalible" para cuando termine el video
function mostrarFinalVideo() {
    if(!videoFinalizado) {
        videoFinalizado = true;
        contenedorFinalVideo.style.display = 'flex';
    }
}

// Escuchamos el evento nativo 'ended'
vid.addEventListener('ended', mostrarFinalVideo);

// Respaldo de seguridad: verificamos el tiempo constantemente. 
// Si queda menos de 0.5 segundos para acabar, lanzamos la pantalla del corazón.
vid.addEventListener('timeupdate', () => {
    if (vid.currentTime > 0 && vid.duration > 0 && vid.currentTime >= (vid.duration - 0.5)) {
        mostrarFinalVideo();
    }
});

// Continuar de Video a Tesoro (con pantalla de carga)
document.getElementById('btn-siguiente-tesoro').addEventListener('click', () => {
    capaCarga.style.display = 'flex';
    
    setTimeout(() => {
        document.getElementById('modulo-video').style.display = 'none';
        document.getElementById('modulo-tesoro').style.display = 'block';
        capaCarga.style.display = 'none';
    }, 1500);
});

// ==========================================
// EL CÓDIGO SECRETO (4 DÍGITOS)
// ==========================================
let codigoIngresado = "";
const CODIGO_CORRECTO = "2412"; // ⚠️ CAMBIA ESTE CÓDIGO ⚠️

const slots = document.querySelectorAll('.llave-slot');
const feedback = document.getElementById('mensaje-feedback');

function actualizarPantallaTesoro() {
    slots.forEach((slot, index) => {
        if(index < codigoIngresado.length) {
            slot.innerText = "🗝️"; 
            slot.classList.add('activa');
            slot.style.transform = "scale(1.1)";
            setTimeout(() => slot.style.transform = "scale(1)", 150);
        } else {
            slot.innerText = "🔒";
            slot.classList.remove('activa');
        }
    });
}

document.querySelectorAll('.btn-tecla').forEach(btn => {
    btn.addEventListener('click', function() {
        if(this.classList.contains('btn-borrar')) {
            codigoIngresado = codigoIngresado.slice(0, -1);
            feedback.innerText = "";
        } else if (this.classList.contains('btn-ok')) {
            if (codigoIngresado === CODIGO_CORRECTO) {
                document.getElementById('interfaz-tesoro').style.display = 'none';
                document.getElementById('carta-final').style.display = 'block';
            } else {
                feedback.innerText = "Código incorrecto, intenta de nuevo.";
                feedback.style.color = "#fb7185";
                codigoIngresado = "";
            }
        } else {
            if(codigoIngresado.length < 4) {
                codigoIngresado += this.innerText;
                feedback.innerText = "";
            }
        }
        actualizarPantallaTesoro();
    });
});

// ==========================================
// MENÚ FLOTANTE Y ARRASTRE
// ==========================================
const btnMenu = document.getElementById('btn-menu-flotante');
const pantallaMenu = document.getElementById('pantalla-menu');
let isDragging = false;
let startX, startY, initialX, initialY;

// Si gira el teléfono, regresamos el botón a su sitio para que no se pierda
window.addEventListener('resize', () => {
    if (btnMenu) {
        btnMenu.style.top = 'auto';
        btnMenu.style.left = '20px';
        btnMenu.style.bottom = '20px';
    }
});

if (btnMenu) {
    btnMenu.addEventListener('touchstart', dragStart);
    btnMenu.addEventListener('touchend', dragEnd);
    btnMenu.addEventListener('touchmove', drag);
    btnMenu.addEventListener('mousedown', dragStart);
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('mousemove', drag);
    
    btnMenu.addEventListener('click', (e) => {
        if(!isDragging) { pantallaMenu.classList.add('activo'); }
    });
}

function dragStart(e) {
    initialX = btnMenu.offsetLeft;
    initialY = btnMenu.offsetTop;
    if (e.type === 'touchstart') {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    } else {
        startX = e.clientX;
        startY = e.clientY;
    }
    isDragging = false;
}

function drag(e) {
    if (startX === undefined || startY === undefined) return;
    let currentX, currentY;
    if (e.type === 'touchmove') {
        currentX = e.touches[0].clientX;
        currentY = e.touches[0].clientY;
    } else {
        currentX = e.clientX;
        currentY = e.clientY;
    }
    let dx = currentX - startX;
    let dy = currentY - startY;
    
    if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
        isDragging = true;
        btnMenu.classList.add('arrastrando');
        btnMenu.style.left = (initialX + dx) + 'px';
        btnMenu.style.top = (initialY + dy) + 'px';
        btnMenu.style.bottom = 'auto'; 
    }
}

function dragEnd(e) {
    startX = undefined;
    startY = undefined;
    setTimeout(() => {
        isDragging = false;
        if (btnMenu) btnMenu.classList.remove('arrastrando');
    }, 100);
}

// Navegación del Menú (CON REINICIO PERFECTO DE LA LINTERNA)
document.querySelectorAll('.btn-nav-menu').forEach(btn => {
    btn.addEventListener('click', function() {
        pantallaMenu.classList.remove('activo');
        const dest = this.getAttribute('data-destino');
        
        document.querySelectorAll('section[id^="modulo-"]').forEach(s => s.style.display = 'none');
        document.getElementById('modulo-' + dest).style.display = 'block';
        
        if (dest === 'intro') {
            // Reiniciamos por completo el juego de la linterna
            botonesEncontrados = 0;
            victoriaAlcanzada = false;
            prepararLinterna(); // Las vuelve a colocar seguras y transparentes
            
            const revelado = document.getElementById('contenido-revelado');
            revelado.style.opacity = '0';
            revelado.style.visibility = 'hidden';
            revelado.style.pointerEvents = 'none';
            
            // Si navega de regreso desde otro lado, reiniciamos el video también
            videoFinalizado = false;
            contenedorFinalVideo.style.display = 'none';
        }
    });
});

const btnCerrarMenu = document.querySelector('.btn-cerrar-menu');
if (btnCerrarMenu) {
    btnCerrarMenu.addEventListener('click', () => {
        pantallaMenu.classList.remove('activo');
    });
}
                
