// ==========================================
// MÓDULO 4 Y 5: GALERÍA Y EXPERIENCIAS
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
    if (tipo === 'pinguino') emojis = ['🐧', '💖', '✨', '🎀'];
    else if (tipo === 'oveja') emojis = ['🐑', '🌷', '🌹', '✨'];
    else if (tipo === 'gato') emojis = ['🐱', '🍤', '😻', '🐾'];
    else if (tipo === 'flores') emojis = ['🌻', '💛', '🌼', '✨'];
    else if (tipo === 'cadena') emojis = ['☀️', '💛', '🌟', '✨'];

    intervaloParticulas = setInterval(() => {
        const p = document.createElement('div');
        p.classList.add('particula');
        p.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        p.style.left = Math.random() * 100 + 'vw';
        p.style.fontSize = (Math.random() * 20 + 15) + 'px';
        p.style.animationDuration = (Math.random() * 3 + 4) + 's'; 
        contenedor.appendChild(p);
        setTimeout(() => { p.remove(); }, 7000);
    }, 450); 
}

function detenerParticulas() {
    clearInterval(intervaloParticulas);
    const contenedor = document.getElementById('contenedor-particulas');
    if (contenedor) contenedor.innerHTML = '';
}

// Lógica de los Disquetes y Video
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
            iniciarParticulas(regaloActual);
        }
    }, 4500); 
}

if (videoRegaloPlayer) videoRegaloPlayer.addEventListener('ended', finalizarVideoRegalo);
if (btnSaltarVideoRegalo) btnSaltarVideoRegalo.addEventListener('click', finalizarVideoRegalo);


// ==========================================
// DELEGACIÓN DE EVENTOS (CARTA Y JARDÍN)
// ==========================================
document.addEventListener('click', function(e) {
    
    // VOLVER A GALERÍA
    if (e.target.closest('#btn-volver-galeria')) {
        const capaOscura = document.getElementById('capa-oscura-final');
        if (capaOscura) capaOscura.classList.add('activo');
        setTimeout(() => {
            detenerParticulas();
            document.getElementById('modulo-experiencias').style.display = 'none';
            document.getElementById('modulo-galeria').style.display = 'flex';
            if (capaOscura) capaOscura.classList.remove('activo');
        }, 800);
    }

    // ABRIR/CERRAR CARTA ORIGINAL
    const modalCarta = document.getElementById('modal-carta-original');
    if (e.target.closest('#btn-mostrar-carta-amarilla')) {
        if (modalCarta) modalCarta.style.display = 'flex';
    }
    if (e.target.closest('#btn-cerrar-carta-amarilla')) {
        if (modalCarta) modalCarta.style.display = 'none';
    }

    // ENTRAR AL JARDÍN
    if (e.target.closest('#btn-ir-jardin')) {
        const capaOscura = document.getElementById('capa-oscura-final');
        if (capaOscura) capaOscura.classList.add('activo');
        setTimeout(() => {
            detenerParticulas();
            document.getElementById('modulo-experiencias').style.display = 'none';
            resetJardin();
            document.getElementById('modulo-jardin').style.display = 'flex';
            if (capaOscura) capaOscura.classList.remove('activo');
        }, 1000);
    }

    // SALIR DEL JARDÍN
    if (e.target.closest('#btn-volver-del-jardin')) {
        const capaOscura = document.getElementById('capa-oscura-final');
        if (capaOscura) capaOscura.classList.add('activo');
        setTimeout(() => {
            document.getElementById('modulo-jardin').style.display = 'none';
            document.getElementById('modulo-experiencias').style.display = 'block';
            iniciarParticulas('flores');
            if (capaOscura) capaOscura.classList.remove('activo');
        }, 1000);
    }
});


// ==========================================
// EL MINIJUEGO DEL JARDÍN 2.0
// ==========================================
const moduloJardin = document.getElementById('modulo-jardin');
let pasoJardin = 0; 

function resetJardin() {
    pasoJardin = 0;
    moduloJardin.className = 'jardin-noche';
    document.getElementById('estrellas-fondo').style.display = 'block';
    document.getElementById('efectos-clima').innerHTML = '';
    
    document.getElementById('titulo-jardin-magico').style.color = '#fff';
    document.getElementById('mensaje-jardin').style.background = 'rgba(0,0,0,0.4)';
    document.getElementById('mensaje-jardin').style.color = '#fff';
    document.getElementById('mensaje-jardin').innerHTML = "Las semillas descansan bajo tierra. Toca regar para despertarlas... 💧";
    
    const flores = document.querySelectorAll('.flor-jardin');
    flores.forEach(f => {
        f.innerText = '🌰';
        f.classList.remove('flor-animada');
    });

    document.getElementById('btn-agua').classList.remove('btn-desactivado');
    document.getElementById('btn-sol').classList.add('btn-desactivado');
    document.getElementById('btn-amor').classList.add('btn-desactivado');
}

document.addEventListener('click', function(e) {
    // BOTÓN: REGAR
    if (e.target.closest('#btn-agua') && pasoJardin === 0) {
        moduloJardin.className = 'jardin-lluvia';
        document.getElementById('estrellas-fondo').style.display = 'none';
        
        const clima = document.getElementById('efectos-clima');
        for(let i=0; i<60; i++){
            const gota = document.createElement('div');
            gota.classList.add('gota-agua');
            gota.style.left = Math.random() * 100 + 'vw';
            gota.style.animationDuration = (Math.random() * 0.4 + 0.6) + 's';
            clima.appendChild(gota);
        }
        
        setTimeout(() => { clima.innerHTML = ''; }, 2000); 

        document.querySelectorAll('.flor-jardin').forEach(f => { f.innerText = '🌱'; });
        document.getElementById('mensaje-jardin').innerText = "¡Están brotando! Ahora necesitan la luz y el calor del sol... ☀️";
        
        document.getElementById('btn-agua').classList.add('btn-desactivado');
        document.getElementById('btn-sol').classList.remove('btn-desactivado');
        pasoJardin = 1;
    }

    // BOTÓN: SOL
    if (e.target.closest('#btn-sol') && pasoJardin === 1) {
        moduloJardin.className = 'jardin-dia';
        const clima = document.getElementById('efectos-clima');
        const luz = document.createElement('div');
        luz.classList.add('rayo-sol');
        clima.appendChild(luz);
        
        document.getElementById('titulo-jardin-magico').style.color = '#fff';

        document.querySelectorAll('.flor-jardin').forEach(f => { f.innerText = '🌿'; });
        document.getElementById('mensaje-jardin').innerText = "¡Ya casi! Solo falta el ingrediente más importante: Tu amor... ❤️";

        document.getElementById('btn-sol').classList.add('btn-desactivado');
        document.getElementById('btn-amor').classList.remove('btn-desactivado');
        pasoJardin = 2;
    }

    // BOTÓN: AMOR
    if (e.target.closest('#btn-amor') && pasoJardin === 2) {
        moduloJardin.className = 'jardin-magico';
        const clima = document.getElementById('efectos-clima');
        
        document.getElementById('mensaje-jardin').style.background = 'rgba(255,255,255,0.8)';
        document.getElementById('mensaje-jardin').style.color = '#b45309';

        for(let i=0; i<30; i++){
            const corazon = document.createElement('div');
            corazon.innerText = '❤️';
            corazon.style.position = 'absolute';
            corazon.style.left = Math.random() * 100 + 'vw';
            corazon.style.bottom = '15vh';
            corazon.style.fontSize = (Math.random() * 20 + 20) + 'px';
            corazon.style.transition = 'all 3s ease-out';
            clima.appendChild(corazon);
            
            setTimeout(() => {
                corazon.style.transform = `translateY(-90vh) scale(1.5) rotate(${Math.random() * 40 - 20}deg)`;
                corazon.style.opacity = '0';
            }, 50);
        }

        document.querySelectorAll('.flor-jardin').forEach((f, index) => {
            setTimeout(() => {
                f.innerText = '🌻'; 
                f.classList.add('flor-animada');
            }, index * 300);
        });
        
        document.getElementById('mensaje-jardin').innerHTML = "<strong>¡Florecieron!</strong> 🌻💛<br>Igual que mi amor por ti crece cada día.";
        
        document.getElementById('btn-amor').classList.add('btn-desactivado');
        pasoJardin = 3;
    }
});
