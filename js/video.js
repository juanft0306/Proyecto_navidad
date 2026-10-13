// ==========================================
// MÓDULO 2: REPRODUCCIÓN Y SISTEMA ANTI-FALLOS
// ==========================================

// Usamos nombres únicos para evitar choques con js/intro.js
const modIntroV = document.getElementById('modulo-intro');
const modVideoV = document.getElementById('modulo-video');
const vidSorpresa = document.getElementById('video-sorpresa');
const contFinalV = document.getElementById('contenedor-final-video');
const capaOscuraV = document.getElementById('capa-oscura-final');
const btnSiguienteV = document.getElementById('btn-siguiente-tesoro');

let videoTerminado = false; // Bandera de seguridad

// Escuchamos cuando la linterna termina
document.addEventListener('modulo1-terminado', () => {
    // 1. Ocultamos la intro y mostramos la sección del video
    if (modIntroV) modIntroV.style.display = 'none';
    if (modVideoV) modVideoV.style.display = 'flex';

    // 2. Quitamos la pantalla negra y damos "Play"
    setTimeout(() => {
        if (capaOscuraV) capaOscuraV.classList.remove('activo');
        
        if (vidSorpresa) {
            let playPromise = vidSorpresa.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Audio bloqueado. Forzando sin sonido...");
                    vidSorpresa.muted = true;
                    vidSorpresa.play().catch(e => forzarFinal());
                });
            }
        }
    }, 500);

    // 🔥 SISTEMA ANTI-FALLOS: 
    // Como el video dura 10 segundos, si a los 11 segundos no ha aparecido el botón, lo forzamos.
    setTimeout(() => {
        forzarFinal();
    }, 11000); 
});

// Eventos normales del video
if (vidSorpresa) {
    vidSorpresa.addEventListener('ended', forzarFinal);
    vidSorpresa.addEventListener('error', forzarFinal);
}

// Función maestra que muestra el botón final y el corazón
function forzarFinal() {
    if (videoTerminado) return;
    videoTerminado = true;
    
    if (vidSorpresa) vidSorpresa.style.display = 'none';
    if (contFinalV) {
        contFinalV.style.display = 'block';
        setTimeout(() => {
            contFinalV.classList.add('activo');
        }, 50);
    }
}

// Botón para avanzar a la Búsqueda del Tesoro
if (btnSiguienteV) {
    btnSiguienteV.addEventListener('click', () => {
        if (capaOscuraV) capaOscuraV.classList.add('activo');
        setTimeout(() => {
            console.log("¡Iniciando Módulo 3!");
            document.dispatchEvent(new Event('modulo2-terminado'));
        }, 1500);
    });
}
