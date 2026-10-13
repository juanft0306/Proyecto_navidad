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
    // 1. Ocultamos el Módulo 1 (opcional, ya está bajo la capa negra)
    document.getElementById('modulo-intro').style.display = 'none';

    // 2. Mostramos el Módulo 2
    moduloVideo.classList.add('activo');

    // 3. Quitamos la capa negra poco a poco para revelar el video que ya arrancará
    setTimeout(() => {
        capaOscuraFinal.classList.remove('activo');
    }, 100);

    // 4. Reproducimos el video automáticamente
    videoSorpresa.play().catch(error => {
        console.log("El navegador requirió interacción para el video:", error);
    });
});

// 5. Cuando el video termina exactamente...
videoSorpresa.addEventListener('ended', () => {
    // Ocultamos el video o lo dejamos de fondo y mostramos el corazón con la frase
    contenedorFinalVideo.classList.add('activo');
});

// 6. Botón para pasar a la Parte 3 (La Búsqueda del Tesoro)
btnSiguienteTesoro.addEventListener('click', () => {
    // Aquí dispararemos el evento para la Parte 3 en el futuro
    console.log("Fin de la Parte 2. Preparando la Búsqueda del Tesoro...");
    
    // Hacemos fundido a negro para la siguiente transición
    capaOscuraFinal.classList.add('activo');
    
    setTimeout(() => {
        document.dispatchEvent(new Event('modulo2-terminado'));
    }, 2000);
});
