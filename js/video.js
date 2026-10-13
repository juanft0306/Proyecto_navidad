// ==========================================
// MÓDULO 2: LÓGICA DEL VIDEO Y TRANSICIÓN
// ==========================================
const moduloVideo = document.getElementById('modulo-video');
const contenedorFinalVideo = document.getElementById('contenedor-final-video');
const capaOscuraFinal = document.getElementById('capa-oscura-final');
const btnSiguienteTesoro = document.getElementById('btn-siguiente-tesoro');

// Cuando el usuario completa la linterna (Módulo 1)
document.addEventListener('modulo1-terminado', () => {
    console.log("Iniciando Módulo 2 (Video)...");

    // Ocultamos el módulo intro
    const moduloIntro = document.getElementById('modulo-intro');
    if (moduloIntro) moduloIntro.style.display = 'none';

    // Mostramos el módulo del video
    moduloVideo.classList.add('activo');
    capaOscuraFinal.classList.remove('activo');

    // Como el video de Streamable corre en bucle/autoplay, 
    // mostramos el botón de continuar después de unos segundos prudenciales (ej. 10s o cuando desees)
    // O puedes dejar el botón disponible de inmediato dentro del contenedor final.
    setTimeout(() => {
        contenedorFinalVideo.classList.add('activo');
    }, 12000); // 12 segundos para que alcance a ver el video y luego aparezca el corazón con la frase
});

// Botón para pasar a la siguiente parte (Búsqueda del tesoro)
btnSiguienteTesoro.addEventListener('click', () => {
    capaOscuraFinal.classList.add('activo');
    setTimeout(() => {
        console.log("Preparando Módulo 3...");
        document.dispatchEvent(new Event('modulo2-terminado'));
    }, 1500);
});
