// ==========================================
// MÓDULO 4: LÓGICA DE LA GALERÍA Y DISQUETES
// ==========================================

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

// SISTEMA DE PARTÍCULAS 
let intervaloParticulas;
function iniciarParticulas(tipo) {
    const contenedor = document.getElementById('contenedor-particulas');
    if (!contenedor) return;
    clearInterval(intervaloParticulas);
    contenedor.innerHTML = '';
    
    let emojis = [];
    if (tipo === 'pinguino') emojis = ['🐧', '💖', '✨'];
    else if (tipo === 'oveja') emojis = ['🌷', '🌹', '✨'];
    else if (tipo === 'gato') emojis = ['🐱', '🍤', '😻'];
    else if (tipo === 'flores') emojis = ['🌻', '💛', '✨'];
    else if (tipo === 'cadena') emojis = ['☀️', '💛', '✨'];

    intervaloParticulas = setInterval(() => {
        const p = document.createElement('div');
        p.classList.add('particula');
        p.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        p.style.left = Math.random() * 100 + 'vw';
        p.style.fontSize = (Math.random() * 20 + 15) + 'px';
        p.style.animationDuration = (Math.random() * 3 + 3) + 's';
        contenedor.appendChild(p);
        
        setTimeout(() => { p.remove(); }, 6000);
    }, 400); // Cae una partícula nueva cada 400ms
}

function detenerParticulas() {
    clearInterval(intervaloParticulas);
    const contenedor = document.getElementById('contenedor-particulas');
    if (contenedor) contenedor.innerHTML = '';
}

// Lógica de los Disquetes y el Video
const disquetes = document.querySelectorAll('.disquete');
const toastError = document.getElementById('toast-error');
const sonidoError = document.getElementById('sonido-error');
const videoRegaloPlayer = document.getElementById('video-regalo-player');
const moduloVideoRegalo = document.getElementById('modulo-video-regalo');
const btnSaltarVideoRegalo = document.getElementById('btn-saltar-video-regalo');

let regaloActual = ""; 

disquetes.forEach(disquete => {
    disquete.addEventListener('click', () => {
        if (disquete.classList.contains('bloqueado')) {
            if (sonidoError) { sonidoError.currentTime = 0; sonidoError.play().catch(e=>console.log(e)); }
            toastError.classList.add('activo');
            setTimeout(() => toastError.classList.remove('activo'), 2500);
            return;
        }

        regaloActual = disquete.getAttribute('data-id');
        const rutaVideo = disquete.getAttribute('data-video');
        
        const textoCarga = document.getElementById('texto-carga-dinamico');
        const capaOscura = document.getElementById('capa-oscura-final');
        const mensajeCarga = document.getElementById('mensaje-carga');
        
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

// Función para cuando termina el video
function finalizarVideoRegalo() {
    videoRegaloPlayer.pause();
    moduloVideoRegalo.style.display = 'none';
    
    const textoCarga = document.getElementById('texto-carga-dinamico');
    const capaOscura = document.getElementById('capa-oscura-final');
    const mensajeCarga = document.getElementById('mensaje-carga');

    if (textoCarga) textoCarga.innerText = "Cargando la experiencia...\nYa puedes volver a colocar el teléfono en vertical 📱⬇️";
    if (capaOscura) capaOscura.classList.add('activo');
    if (mensajeCarga) mensajeCarga.style.display = 'flex';

    setTimeout(() => {
        if (capaOscura) capaOscura.classList.remove('activo');
        setTimeout(() => { if (mensajeCarga) mensajeCarga.style.display = 'none'; }, 1000);
        
        document.getElementById('modulo-galeria').style.display = 'none';
        document.getElementById('modulo-experiencias').style.display = 'block';
        
        document.querySelectorAll('.experiencia-interna').forEach(exp => { exp.style.display = 'none'; });
        
        const expActiva = document.getElementById('exp-' + regaloActual);
        if (expActiva) {
            expActiva.style.display = 'flex';
            iniciarParticulas(regaloActual); // Inicia la lluvia de emojis
        }

    }, 4500); 
}

if (videoRegaloPlayer) videoRegaloPlayer.addEventListener('ended', finalizarVideoRegalo);
if (btnSaltarVideoRegalo) btnSaltarVideoRegalo.addEventListener('click', finalizarVideoRegalo);

// Lógica para el botón "Volver a la Galería"
const btnVolverGaleria = document.getElementById('btn-volver-galeria');

if (btnVolverGaleria) {
    btnVolverGaleria.addEventListener('click', () => {
        const capaOscura = document.getElementById('capa-oscura-final');
        if (capaOscura) capaOscura.classList.add('activo');

        setTimeout(() => {
            detenerParticulas(); // Detenemos los emojis
            document.getElementById('modulo-experiencias').style.display = 'none';
            document.getElementById('modulo-galeria').style.display = 'flex';
            
            if (capaOscura) capaOscura.classList.remove('activo');
        }, 800);
    });
}
