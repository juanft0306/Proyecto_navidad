// ==========================================
// MÓDULO 2: CAMBIO INSTANTÁNEO Y SEGURO
// ==========================================
const btnEmpezar = document.getElementById('btn-empezar');
const moduloIntro = document.getElementById('modulo-intro');
const moduloVideo = document.getElementById('modulo-video');
const btnSiguienteTesoro = document.getElementById('btn-siguiente-tesoro');

// Cuando ella da clic en "Empezar la experiencia" en la linterna
if (btnEmpezar) {
    btnEmpezar.addEventListener('click', () => {
        // Ocultamos la linterna de inmediato
        if (moduloIntro) {
            moduloIntro.style.display = 'none';
        }
        // Mostramos el módulo del video de forma limpia
        if (moduloVideo) {
            moduloVideo.style.display = 'flex';
        }
    });
}

// Botón para avanzar al siguiente módulo (Búsqueda del tesoro)
if (btnSiguienteTesoro) {
    btnSiguienteTesoro.addEventListener('click', () => {
        alert("¡Próximamente Módulo 3: Búsqueda del Tesoro!");
        // Aquí conectaremos la siguiente parte cuando estés listo
    });
}
