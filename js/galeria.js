// ==========================================
// MÓDULO 4: LÓGICA DE LA GALERÍA Y DISQUETES
// ==========================================

// 1. Conectar el botón de la carta final con la galería
const btnSiguienteSorpresa = document.getElementById('btn-siguiente');

if (btnSiguienteSorpresa) {
    btnSiguienteSorpresa.addEventListener('click', () => {
        const textoCarga = document.getElementById('texto-carga-dinamico');
        const capaOscura = document.getElementById('capa-oscura-final');
        const mensajeCarga = document.getElementById('mensaje-carga');

        if (textoCarga) textoCarga.innerText = "Abriendo el baúl de los recuerdos...";
        if (capaOscura) capaOscura.classList.add('activo');
        if (mensajeCarga) mensajeCarga.style.display = 'flex';
        
        setTimeout(() => {
            document.getElementById('modulo-tesoro').style.display = 'none';
            document.getElementById('modulo-galeria').style.display = 'flex';
            if (capaOscura) capaOscura.classList.remove('activo');
            setTimeout(() => { if (mensajeCarga) mensajeCarga.style.display = 'none'; }, 1000);
        }, 3000);
    });
}

// 2. Lógica de los Disquetes y el Video
const disquetes = document.querySelectorAll('.disquete');
const toastError = document.getElementById('toast-error');
const sonidoError = document.getElementById('sonido-error');
const videoRegaloPlayer = document.getElementById('video-regalo-player');
const moduloVideoRegalo = document.getElementById('modulo-video-regalo');
const btnSaltarVideoRegalo = document.getElementById('btn-saltar-video-regalo');

let regaloActual = ""; 

disquetes.forEach(disquete => {
    disquete.addEventListener('click', () => {
        // Si está bloqueado
        if (disquete.classList.contains('bloqueado')) {
            if (sonidoError) { sonidoError.currentTime = 0; sonidoError.play().catch(e=>console.log(e)); }
            toastError.classList.add('activo');
            setTimeout(() => toastError.classList.remove('activo'), 2500);
            return;
        }

        // Si está activo
        regaloActual = disquete.getAttribute('data-id');
        const rutaVideo = disquete.getAttribute('data-video');
        
        const textoCarga = document.getElementById('texto-carga-dinamico');
        const capaOscura = document.getElementById('capa-oscura-final');
        const mensajeCarga = document.getElementById('mensaje-carga');
        
        // 1er Sándwich: Pantalla de carga y girar a horizontal
        if (textoCarga) textoCarga.innerText = "Preparando tu recuerdo...\nTe recomiendo poner el teléfono en horizontal 📱🔄";
        if (capaOscura) capaOscura.classList.add('activo');
        if (mensajeCarga) mensajeCarga.style.display = 'flex';

        setTimeout(() => {
            videoRegaloPlayer.src = rutaVideo;
            moduloVideoRegalo.style.display = 'block';
            
            if (capaOscura) capaOscura.classList.remove('activo');
            setTimeout(() => { if (mensajeCarga) mensajeCarga.style.display = 'none'; }, 1000);
            
            videoRegaloPlayer.play().catch(e => { videoRegaloPlayer.muted = true; videoRegaloPlayer.play(); });
        }, 4500); 
    });
});

// 3. Función para cuando termina (o se salta) el video
function finalizarVideoRegalo() {
    videoRegaloPlayer.pause();
    moduloVideoRegalo.style.display = 'none';
    
    const textoCarga = document.getElementById('texto-carga-dinamico');
    const capaOscura = document.getElementById('capa-oscura-final');
    const mensajeCarga = document.getElementById('mensaje-carga');

    // 2do Sándwich: Pantalla de carga y volver a vertical
    if (textoCarga) textoCarga.innerText = "Cargando la experiencia...\nYa puedes volver a colocar el teléfono en vertical 📱⬇️";
    if (capaOscura) capaOscura.classList.add('activo');
    if (mensajeCarga) mensajeCarga.style.display = 'flex';

    setTimeout(() => {
        if (capaOscura) capaOscura.classList.remove('activo');
        setTimeout(() => { if (mensajeCarga) mensajeCarga.style.display = 'none'; }, 1000);
        
        // Ocultar galería y mostrar módulo de experiencias
        document.getElementById('modulo-galeria').style.display = 'none';
        document.getElementById('modulo-experiencias').style.display = 'block';
        
        // Ocultar todas las experiencias internas
        document.querySelectorAll('.experiencia-interna').forEach(exp => {
            exp.style.display = 'none';
        });
        
        // Mostrar SOLO la experiencia del regalo seleccionado
        const expActiva = document.getElementById('exp-' + regaloActual);
        if (expActiva) {
            expActiva.style.display = 'flex';
        }

    }, 4500); 
}

if (videoRegaloPlayer) videoRegaloPlayer.addEventListener('ended', finalizarVideoRegalo);
if (btnSaltarVideoRegalo) btnSaltarVideoRegalo.addEventListener('click', finalizarVideoRegalo);

// 4. Lógica para el botón "Volver a la Galería"
const btnVolverGaleria = document.getElementById('btn-volver-galeria');

if (btnVolverGaleria) {
    btnVolverGaleria.addEventListener('click', () => {
        const capaOscura = document.getElementById('capa-oscura-final');
        if (capaOscura) capaOscura.classList.add('activo');

        setTimeout(() => {
            document.getElementById('modulo-experiencias').style.display = 'none';
            document.getElementById('modulo-galeria').style.display = 'flex';
            
            if (capaOscura) capaOscura.classList.remove('activo');
        }, 800);
    });
}
