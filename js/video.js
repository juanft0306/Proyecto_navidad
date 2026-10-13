// ==========================================
// MÓDULO 2: LÓGICA DE TRANSICIÓN AL ENLACE
// ==========================================
const moduloVideo = document.getElementById('modulo-video');
const capaOscuraFinal = document.getElementById('capa-oscura-final');
const btnSiguienteTesoro = document.getElementById('btn-siguiente-tesoro');

// Cuando la linterna (Módulo 1) termina
document.addEventListener('modulo1-terminado', () => {
    console.log("Transición completada. Activando Módulo 2...");
    
    // Ocultamos la linterna
    const moduloIntro = document.getElementById('modulo-intro');
    if (moduloIntro) moduloIntro.style.display = 'none';

    // Mostramos el módulo del video con enlace
    moduloVideo.classList.add('activo');

    // Quitamos la capa oscura suavemente
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
