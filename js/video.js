// ==========================================
// MÓDULO 2: REPRODUCCIÓN Y SISTEMA ANTI-FALLOS
// ==========================================
const moduloIntro = document.getElementById('modulo-intro');
const moduloVideo = document.getElementById('modulo-video');
const videoSorpresa = document.getElementById('video-sorpresa');
const contenedorFinalVideo = document.getElementById('contenedor-final-video');
const capaOscuraFinal = document.getElementById('capa-oscura-final');
const btnSiguienteTesoro = document.getElementById('btn-siguiente-tesoro');

let videoTerminado = false; // Bandera de seguridad para que no se duplique

// Escuchamos cuando la linterna termina
document.addEventListener('modulo1-terminado', () => {
    if (moduloIntro) moduloIntro.style.display = 'none';
    if (moduloVideo) moduloVideo.style.display = 'flex';

    setTimeout(() => {
        if (capaOscuraFinal) capaOscuraFinal.classList.remove('activo');
        
        if (videoSorpresa) {
            // Intentamos reproducir el video
            let playPromise = videoSorpresa.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Audio bloqueado por el celular. Forzando sin sonido...");
                    videoSorpresa.muted = true; // Lo silencia para obligarlo a reproducir
                    videoSorpresa.play().catch(e => forzarFinal());
                });
            }
        }
    }, 500);

    // 🔥 SISTEMA ANTI-FALLOS: 
    // Como el video dura 10 segundos, si a los 11 segundos no ha terminado (o si la pantalla se quedó en negro),
    // forzamos a que aparezca el corazón y el botón final sí o sí.
    setTimeout(() => {
        forzarFinal();
    }, 11000); 
});

// Eventos normales del video (si termina bien o si da error de carga)
if (videoSorpresa) {
    videoSorpresa.addEventListener('ended', forzarFinal);
    videoSorpresa.addEventListener('error', forzarFinal);
}

// Función maestra que muestra el botón y el corazón
function forzarFinal() {
    if (videoTerminado) return; // Si ya se ejecutó, no hace nada
    videoTerminado = true;
    
    if (videoSorpresa) videoSorpresa.style.display = 'none';
    if (contenedorFinalVideo) {
        contenedorFinalVideo.style.display = 'block';
        // Pequeño retraso para la animación suave
        setTimeout(() => {
            contenedorFinalVideo.classList.add('activo');
        }, 50);
    }
}

// Botón para avanzar a la Búsqueda del Tesoro
if (btnSiguienteTesoro) {
    btnSiguienteTesoro.addEventListener('click', () => {
        if (capaOscuraFinal) capaOscuraFinal.classList.add('activo');
        setTimeout(() => {
            console.log("¡Iniciando Módulo 3!");
            // Preparado para la siguiente parte
            document.dispatchEvent(new Event('modulo2-terminado'));
        }, 1500);
    });
}
