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
// LINTERNA Y BOTONES OCULTOS
// ==========================================
const linterna = document.getElementById('linterna');
const introSection = document.getElementById('modulo-intro');

// Posiciones fijas dentro del recuadro
const posicionesSeguras = [
    { left: '22vw', top: '28vh' },
    { left: '68vw', top: '35vh' },
    { left: '45vw', top: '70vh' }
];

document.querySelectorAll('.btn-oculto').forEach((btn, index) => {
    btn.style.left = posicionesSeguras[index].left;
    btn.style.top = posicionesSeguras[index].top;
    btn.style.position = 'absolute';
    btn.style.zIndex = '10';
});

// A los 12 segundos, encendemos un reborde blanco punteado como pista visual
setTimeout(() => {
    document.querySelectorAll('.btn-oculto:not(.encontrado)').forEach(btn => {
        btn.classList.add('ayuda-visual');
    });
}, 12000);

// Movimiento de linterna
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

document.querySelectorAll('.btn-oculto').forEach(btn => {
    btn.addEventListener('click', function() {
        if(!this.classList.contains('encontrado')) {
            this.classList.add('encontrado');
            this.classList.remove('ayuda-visual');
            this.style.background = 'rgba(225, 29, 72, 0.8)';
            if(sonidoBoton) { 
                sonidoBoton.currentTime = 0; 
                sonidoBoton.play().catch(e => console.log(e)); 
            }
            botonesEncontrados++;
            
            if(botonesEncontrados === 3) {
                const revelado = document.getElementById('contenido-revelado');
                revelado.style.opacity = '1';
                revelado.style.visibility = 'visible';
                revelado.style.pointerEvents = 'all';
            }
        }
    });
});

// ==========================================
// TRANSICIÓN AL VIDEO (INICIO INMEDIATO, SIN CONTROLES)
// ==========================================
document.getElementById('btn-empezar').addEventListener('click', () => {
    document.getElementById('modulo-intro').style.display = 'none';
    const moduloVideo = document.getElementById('modulo-video');
    moduloVideo.style.display = 'block';
    
    const vid = document.getElementById('video-sorpresa');
    
    // Obligatorio llamar a play() INMEDIATAMENTE dentro del evento de click,
    // de lo contrario, navegadores estrictos lo bloquean.
    let playPromise = vid.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("Reproducción automática con sonido bloqueada, muteando...", error);
            vid.muted = true;
            vid.play();
        });
    }
});

// Cuando termina el video, aparece la capa con el corazón latiendo y el botón
document.getElementById('video-sorpresa').addEventListener('ended', () => {
    document.getElementById('contenedor-final-video').style.display = 'flex';
});

document.getElementById('btn-siguiente-tesoro').addEventListener('click', () => {
    document.getElementById('modulo-video').style.display = 'none';
    document.getElementById('modulo-tesoro').style.display = 'block';
});

// ==========================================
// EL CÓDIGO SECRETO (4 DÍGITOS)
// ==========================================
let codigoIngresado = "";
const CODIGO_CORRECTO = "2412"; // ⚠️ CAMBIA ESTE CÓDIGO AL QUE PREFIERAS ⚠️

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

document.querySelectorAll('.btn-nav-menu').forEach(btn => {
    btn.addEventListener('click', function() {
        pantallaMenu.classList.remove('activo');
        const dest = this.getAttribute('data-destino');
        document.querySelectorAll('section[id^="modulo-"]').forEach(s => s.style.display = 'none');
        document.getElementById('modulo-' + dest).style.display = 'block';
        if (dest === 'intro') {
            document.getElementById('modulo-intro').style.display = 'flex';
        }
    });
});

const btnCerrarMenu = document.querySelector('.btn-cerrar-menu');
if (btnCerrarMenu) {
    btnCerrarMenu.addEventListener('click', () => {
        pantallaMenu.classList.remove('activo');
    });
}
