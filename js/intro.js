// ==========================================
// PANTALLA COMPLETA Y MODO APP
// ==========================================
function activarPantallaCompleta() {
    const doc = document.documentElement;
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        if (doc.requestFullscreen) { doc.requestFullscreen(); }
        else if (doc.webkitRequestFullscreen) { doc.webkitRequestFullscreen(); }
        else if (doc.msRequestFullscreen) { doc.msRequestFullscreen(); }
    }
}

// Se activa silenciosamente en el momento que toca o interactúa con la pantalla
document.addEventListener('touchstart', activarPantallaCompleta, { once: true });
document.addEventListener('click', activarPantallaCompleta, { once: true });

// ==========================================
// LINTERNA, POSICIONAMIENTO Y BOTONES OCULTOS
// ==========================================
const linterna = document.getElementById('linterna');
const introSection = document.getElementById('modulo-intro');

// Aseguramos que los botones siempre aparezcan dentro del marco seguro de la pantalla (entre el 15% y 85%)
document.querySelectorAll('.btn-oculto').forEach(btn => {
    const randomX = Math.floor(Math.random() * 70) + 15;
    const randomY = Math.floor(Math.random() * 70) + 15;
    btn.style.left = randomX + 'vw';
    btn.style.top = randomY + 'vh';
});

// Movimiento de la linterna (Mouse y Táctil)
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
            this.style.background = 'rgba(225, 29, 72, 0.8)';
            if(sonidoBoton) { 
                sonidoBoton.currentTime = 0; 
                sonidoBoton.play().catch(e => console.log(e)); 
            }
            botonesEncontrados++;
            
            if(botonesEncontrados === 3) {
                document.getElementById('contenido-revelado').classList.remove('oculto');
                clearInterval(intervaloAyuda); // Apagamos la ayuda si ya ganó
            }
        }
    });
});

// Ayudante de 10 segundos: si se estanca, revelamos un botón automáticamente
let intervaloAyuda = setInterval(() => {
    if (botonesEncontrados >= 3) {
        clearInterval(intervaloAyuda);
        return;
    }
    // Buscar el primer botón que aún no haya sido encontrado
    const botonesNoEncontrados = document.querySelectorAll('.btn-oculto:not(.encontrado)');
    if (botonesNoEncontrados.length > 0) {
        // Simulamos un click para que suene y se ponga rojo solo
        botonesNoEncontrados[0].click();
    }
}, 10000); // 10000 milisegundos = 10 segundos

// ==========================================
// TRANSICIÓN AL VIDEO (MEJORADA PARA MÓVILES)
// ==========================================
document.getElementById('btn-empezar').addEventListener('click', () => {
    document.getElementById('modulo-intro').style.display = 'none';
    
    const moduloVideo = document.getElementById('modulo-video');
    moduloVideo.style.display = 'block';
    
    const vid = document.getElementById('video-sorpresa');
    
    // Forzamos la carga del video
    vid.load();
    
    // Intentamos reproducir el video de forma robusta
    let playPromise = vid.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("El autoplay con sonido fue bloqueado, intentando sin sonido...", error);
            // Si el iPhone/Android lo bloquea, lo muteamos temporalmente para que arranque sí o sí
            vid.muted = true;
            vid.play();
        });
    }
});

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
const CODIGO_CORRECTO = "2412"; // ⚠️ ¡CAMBIA ESTE CÓDIGO AL NÚMERO DE 4 DÍGITOS QUE QUIERAS! ⚠️

const slots = document.querySelectorAll('.llave-slot');
const feedback = document.getElementById('mensaje-feedback');

function actualizarPantallaTesoro() {
    slots.forEach((slot, index) => {
        if(index < codigoIngresado.length) {
            slot.innerText = "🗝️"; // Muestra una llave por cada número presionado
            slot.classList.add('activa');
            slot.style.transform = "scale(1.2)";
            setTimeout(() => slot.style.transform = "scale(1)", 200);
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
                // Código Correcto: Muestra la carta
                document.getElementById('interfaz-tesoro').style.display = 'none';
                document.getElementById('carta-final').style.display = 'block';
            } else {
                // Código Incorrecto
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
    
    // Si se mueve más de 10 píxeles, se considera arrastre y no click
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

// Navegación del Menú
document.querySelectorAll('.btn-nav-menu').forEach(btn => {
    btn.addEventListener('click', function() {
        pantallaMenu.classList.remove('activo');
        const dest = this.getAttribute('data-destino');
        
        // Ocultar todos los módulos principales
        document.querySelectorAll('section[id^="modulo-"]').forEach(s => s.style.display = 'none');
        
        // Mostrar el módulo seleccionado
        document.getElementById('modulo-' + dest).style.display = 'block';
        
        if (dest === 'intro') {
            document.getElementById('modulo-intro').style.display = 'flex';
        }
    });
});

// Cerrar Menú
const btnCerrarMenu = document.querySelector('.btn-cerrar-menu');
if (btnCerrarMenu) {
    btnCerrarMenu.addEventListener('click', () => {
        pantallaMenu.classList.remove('activo');
    });
}
