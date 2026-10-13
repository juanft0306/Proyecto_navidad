// ==========================================
// MÓDULO 2: LÓGICA DE TRANSICIÓN
// ==========================================
const moduloVideo = document.getElementById('modulo-video');
const capaOscuraFinal = document.getElementById('capa-oscura-final');
const btnSiguienteTesoro = document.getElementById('btn-siguiente-tesoro');

// Cuando la linterna termina
document.addEventListener('modulo1-terminado', () => {
    const moduloIntro = document.getElementById('modulo-intro');
    if (moduloIntro) moduloIntro.style.display = 'none';

    moduloVideo.classList.add('activo');
    capaOscuraFinal.classList.remove('activo');
});

// Botón para avanzar al siguiente módulo
btnSiguienteTesoro.addEventListener('click', () => {
    capaOscuraFinal.classList.add('activo');
    setTimeout(() => {
        console.log("Avanzando al siguiente módulo...");
        document.dispatchEvent(new Event('modulo2-terminado'));
    }, 1500);
});
