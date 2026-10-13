// ==========================================
// MÓDULO 2: LÓGICA DE TRANSICIÓN AL VIDEO
// ==========================================
const moduloVideo = document.getElementById('modulo-video');
const capaOscuraFinal = document.getElementById('capa-oscura-final');
const btnSiguienteTesoro = document.getElementById('btn-siguiente-tesoro');

// Cuando la linterna (Módulo 1) termina y el fundido a negro está activo
document.addEventListener('modulo1-terminado', () => {
    console.log("Transición completada. Activando Módulo 2...");
    
    // Ocultamos el módulo de la linterna
    const moduloIntro = document.getElementById('modulo-intro');
    if (moduloIntro) moduloIntro.style.display = 'none';

    // Mostramos el módulo del video
    moduloVideo.classList.add('activo');

    // Quitamos la capa oscura suavemente para revelar el contenido
    setTimeout(() => {
        capaOscuraFinal.classList.remove('activo');
    }, 500);
});

// Botón para avanzar al siguiente módulo (Búsqueda del tesoro)
if (btnSiguienteTesoro) {
    btnSiguienteTesoro.addEventListener('click', () => {
        capaOscuraFinal.classList.add('activo');
        setTimeout(() => {
            console.log("Avanzando a la Búsqueda del Tesoro...");
            document.dispatchEvent(new Event('modulo2-terminado'));
        }, 1500);
    });
}
