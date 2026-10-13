// ==========================================
// MÓDULO 2: LÓGICA DEL VIDEO Y TRANSICIÓN
// ==========================================
const moduloVideo = document.getElementById('modulo-video');
const videoSorpresa = document.getElementById('video-sorpresa');
const contenedorFinalVideo = document.getElementById('contenedor-final-video');
const capaOscuraFinal = document.getElementById('capa-oscura-final');
const btnSiguienteTesoro = document.getElementById('btn-siguiente-tesoro');

// Escuchamos el aviso de que el Módulo 1 terminó
document.addEventListener('modulo1-terminado', () => {
    console.log("Módulo 1 terminó. Activando Módulo 2...");

    // 1. Ocultamos por completo el Módulo 1
    const moduloIntro = document.getElementById('modulo-intro');
    if (moduloIntro) moduloIntro.style.display = 'none';

    // 2. Mostramos el Módulo 2 asegurando que tenga la clase activo y display flex
    moduloVideo.classList.add('activo');
    moduloVideo.style.display = 'flex';

    // 3. Forzamos quitar la capa negra de transición
    capaOscuraFinal.classList.remove('activo');
    capaOscuraFinal.style.display = 'none'; // Por si acaso se queda bloqueada

    // 4. Intentamos reproducir el video
    videoSorpresa.play().then(() => {
        console.log("El video comenzó a reproducirse correctamente.");
    }).catch(error => {
        console.log("Error al reproducir el video:", error);
    });
});

// Cuando el video termina exactamente...
videoSorpresa.addEventListener('ended', () => {
    console.log("El video ha terminado. Mostrando mensaje final...");
    contenedorFinalVideo.classList.add('activo');
});

// Botón para pasar a la siguiente parte
btnSiguienteTesoro.addEventListener('click', () => {
    console.log("Preparando siguiente módulo...");
});
