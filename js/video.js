// ==========================================
// MÓDULO 2: LÓGICA DEL VIDEO Y TRANSICIÓN
// ==========================================
const moduloVideo = document.getElementById('modulo-video');
const videoSorpresa = document.getElementById('video-sorpresa');
const contenedorFinalVideo = document.getElementById('contenedor-final-video');
const capaOscuraFinal = document.getElementById('capa-oscura-final');
const btnSiguienteTesoro = document.getElementById('btn-siguiente-tesoro');

document.addEventListener('modulo1-terminado', () => {
    console.log("Módulo 1 terminó. Mostrando Módulo 2...");

    // Ocultamos el Módulo 1
    const moduloIntro = document.getElementById('modulo-intro');
    if (moduloIntro) {
        moduloIntro.style.opacity = '0';
        setTimeout(() => moduloIntro.style.display = 'none', 1000);
    }

    // Activamos el Módulo 2
    moduloVideo.classList.add('activo');

    // Quitamos la capa negra de transición
    capaOscuraFinal.classList.remove('activo');

    // Reproducimos el video
    videoSorpresa.play().then(() => {
        console.log("Video reproduciéndose con éxito.");
    }).catch(error => {
        console.log("Error de reproducción:", error);
    });
});

videoSorpresa.addEventListener('ended', () => {
    console.log("El video terminó.");
    contenedorFinalVideo.classList.add('activo');
});

btnSiguienteTesoro.addEventListener('click', () => {
    console.log("Pasando a la siguiente parte...");
});
