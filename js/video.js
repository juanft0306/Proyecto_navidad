// ==========================================
// MÓDULO 2: TRANSICIÓN Y REPRODUCCIÓN GARANTIZADA
// ==========================================
const moduloIntro = document.getElementById('modulo-intro');
const moduloVideo = document.getElementById('modulo-video');
const videoSorpresa = document.getElementById('video-sorpresa');
const contenedorFinalVideo = document.getElementById('contenedor-final-video');
const capaOscuraFinal = document.getElementById('capa-oscura-final');
const btnSiguienteTesoro = document.getElementById('btn-siguiente-tesoro');

// Escuchamos cuando la linterna termina su fundido a negro
document.addEventListener('modulo1-terminado', () => {
    // Ocultamos la linterna y mostramos el contenedor del video
    if (moduloIntro) moduloIntro.style.display = 'none';
    if (moduloVideo) moduloVideo.style.display = 'flex';

    // Disipamos la capa negra e iniciamos el video
    setTimeout(() => {
        if (capaOscuraFinal) capaOscuraFinal.classList.remove('activo');
        
        // Intentamos reproducir el video de la galería
        let playPromise = videoSorpresa.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Autoplay bloqueado. Forzando reproducción sin sonido...");
                // Si el navegador lo bloquea, lo silenciamos y lo volvemos a lanzar
                videoSorpresa.muted = true;
                videoSorpresa.play();
            });
        }
    }, 500);
});

// Cuando el video de 10 segundos termina
videoSorpresa.addEventListener('ended', () => {
    // Ocultamos el reproductor
    videoSorpresa.style.display = 'none';
    // Mostramos la frase y el botón
    contenedorFinalVideo.style.display = 'block';
    
    // Pequeño retraso para que la transición de CSS (opacity) se vea fluida
    setTimeout(() => {
        contenedorFinalVideo.classList.add('activo');
    }, 50);
});

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
