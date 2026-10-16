// ==========================================
// MÓDULOS GALERÍA Y EXPERIENCIAS
// ==========================================
const btnSiguienteSorpresa = document.getElementById('btn-siguiente');
if (btnSiguienteSorpresa) {
    btnSiguienteSorpresa.addEventListener('click', () => {
        const textoCarga = document.getElementById('texto-carga-dinamico'); const capaOscura = document.getElementById('capa-oscura-final'); const mensajeCarga = document.getElementById('mensaje-carga');
        if (textoCarga) textoCarga.innerText = "Abriendo el baúl de los recuerdos..."; if (capaOscura) capaOscura.classList.add('activo'); if (mensajeCarga) mensajeCarga.style.display = 'flex';
        setTimeout(() => { document.getElementById('modulo-tesoro').style.display = 'none'; document.getElementById('modulo-galeria').style.display = 'flex'; if (capaOscura) capaOscura.classList.remove('activo'); setTimeout(() => { if (mensajeCarga) mensajeCarga.style.display = 'none'; }, 1000); }, 3000);
    });
}

// PARTÍCULAS NORMALES GALERÍA
let intervaloParticulas;
function iniciarParticulas(tipo) {
    const contenedor = document.getElementById('contenedor-particulas'); if (!contenedor) return; clearInterval(intervaloParticulas); contenedor.innerHTML = ''; 
    let emojis = []; if (tipo === 'pinguino') emojis = ['🐧', '💖', '✨']; else if (tipo === 'oveja') emojis = ['🐑', '🌷', '✨']; else if (tipo === 'gato') emojis = ['🐱', '🍤', '😻']; else if (tipo === 'flores') emojis = ['🌻', '💛', '🌼']; else if (tipo === 'cadena') emojis = ['☀️', '💛', '🌟'];
    intervaloParticulas = setInterval(() => { const p = document.createElement('div'); p.classList.add('particula'); p.innerText = emojis[Math.floor(Math.random() * emojis.length)]; p.style.left = Math.random() * 100 + 'vw'; p.style.fontSize = (Math.random() * 20 + 15) + 'px'; p.style.animationDuration = (Math.random() * 3 + 4) + 's'; contenedor.appendChild(p); setTimeout(() => p.remove(), 7000); }, 450); 
}
function detenerParticulas() { clearInterval(intervaloParticulas); const contenedor = document.getElementById('contenedor-particulas'); if (contenedor) contenedor.innerHTML = ''; }

// VIDEOS DISQUETES
const disquetes = document.querySelectorAll('.disquete'); const toastError = document.getElementById('toast-error'); const sonidoError = document.getElementById('sonido-error'); const videoRegaloPlayer = document.getElementById('video-regalo-player'); const moduloVideoRegalo = document.getElementById('modulo-video-regalo'); const btnSaltarVideoRegalo = document.getElementById('btn-saltar-video-regalo');
let regaloActual = ""; 
disquetes.forEach(disquete => {
    disquete.addEventListener('click', () => {
        if (disquete.classList.contains('bloqueado')) { if (sonidoError) { sonidoError.currentTime = 0; sonidoError.play().catch(e=>console.log(e)); } toastError.classList.add('activo'); setTimeout(() => toastError.classList.remove('activo'), 2500); return; }
        regaloActual = disquete.getAttribute('data-id'); const rutaVideo = disquete.getAttribute('data-video'); const textoCarga = document.getElementById('texto-carga-dinamico'); const capaOscura = document.getElementById('capa-oscura-final'); const mensajeCarga = document.getElementById('mensaje-carga');
        if (textoCarga) textoCarga.innerText = "Preparando tu recuerdo...\nPon el teléfono en horizontal 📱🔄"; if (capaOscura) capaOscura.classList.add('activo'); if (mensajeCarga) mensajeCarga.style.display = 'flex';
        setTimeout(() => { videoRegaloPlayer.src = rutaVideo; moduloVideoRegalo.style.display = 'block'; if (capaOscura) capaOscura.classList.remove('activo'); setTimeout(() => { if (mensajeCarga) mensajeCarga.style.display = 'none'; }, 1000); videoRegaloPlayer.play().catch(e => { videoRegaloPlayer.muted = true; videoRegaloPlayer.play(); }); }, 4500); 
    });
});
function finalizarVideoRegalo() {
    videoRegaloPlayer.pause(); moduloVideoRegalo.style.display = 'none'; const textoCarga = document.getElementById('texto-carga-dinamico'); const capaOscura = document.getElementById('capa-oscura-final'); const mensajeCarga = document.getElementById('mensaje-carga');
    if (textoCarga) textoCarga.innerText = "Cargando la experiencia...\nVuelve el teléfono a vertical 📱⬇️"; if (capaOscura) capaOscura.classList.add('activo'); if (mensajeCarga) mensajeCarga.style.display = 'flex';
    setTimeout(() => {
        if (capaOscura) capaOscura.classList.remove('activo'); setTimeout(() => { if (mensajeCarga) mensajeCarga.style.display = 'none'; }, 1000); document.getElementById('modulo-galeria').style.display = 'none'; document.getElementById('modulo-experiencias').style.display = 'block'; document.querySelectorAll('.experiencia-interna').forEach(exp => { exp.style.display = 'none'; });
        const expActiva = document.getElementById('exp-' + regaloActual); if (expActiva) { expActiva.style.display = 'flex'; iniciarParticulas(regaloActual); }
    }, 4500); 
}
if (videoRegaloPlayer) videoRegaloPlayer.addEventListener('ended', finalizarVideoRegalo);
if (btnSaltarVideoRegalo) btnSaltarVideoRegalo.addEventListener('click', finalizarVideoRegalo);

document.addEventListener('click', function(e) {
    if (e.target.closest('#btn-volver-galeria')) { const capaOscura = document.getElementById('capa-oscura-final'); if (capaOscura) capaOscura.classList.add('activo'); setTimeout(() => { detenerParticulas(); document.getElementById('modulo-experiencias').style.display = 'none'; document.getElementById('modulo-galeria').style.display = 'flex'; if (capaOscura) capaOscura.classList.remove('activo'); }, 800); }
    const modalCarta = document.getElementById('modal-carta-original'); if (e.target.closest('#btn-mostrar-carta-amarilla')) { if (modalCarta) modalCarta.style.display = 'flex'; } if (e.target.closest('#btn-cerrar-carta-amarilla')) { if (modalCarta) modalCarta.style.display = 'none'; }
    if (e.target.closest('#btn-ir-jardin')) { const capaOscura = document.getElementById('capa-oscura-final'); if (capaOscura) capaOscura.classList.add('activo'); setTimeout(() => { detenerParticulas(); document.getElementById('modulo-experiencias').style.display = 'none'; resetJardin(); document.getElementById('modulo-jardin').style.display = 'flex'; if (capaOscura) capaOscura.classList.remove('activo'); }, 1000); }
    if (e.target.closest('#btn-volver-del-jardin')) { const capaOscura = document.getElementById('capa-oscura-final'); if (capaOscura) capaOscura.classList.add('activo'); setTimeout(() => { document.getElementById('modulo-jardin').style.display = 'none'; document.getElementById('modulo-experiencias').style.display = 'block'; iniciarParticulas('flores'); detenerGeneradoresMagicos(); if (capaOscura) capaOscura.classList.remove('activo'); }, 1000); }
});

// ==========================================
// EL JARDÍN MÁGICO 4.0 (METEOROLOGÍA, FAUNA Y TIEMPO)
// ==========================================
const moduloJardin = document.getElementById('modulo-jardin');
let pasoJardin = 0; 
let climaActual = 'tarde'; 

function resetJardin() {
    pasoJardin = 0;
    moduloJardin.className = 'jardin-noche';
    document.getElementById('estrellas-fondo').style.display = 'block';
    document.getElementById('efectos-clima').innerHTML = '';
    document.getElementById('escenario-fondo').style.opacity = '0';
    document.getElementById('campo-flores').innerHTML = ''; 
    document.getElementById('lienzo-rastro').innerHTML = ''; 
    document.getElementById('selector-tiempo').style.display = 'none';
    document.getElementById('controles-jardin').style.display = 'flex';
    document.getElementById('titulo-jardin-magico').style.display = 'block';
    document.getElementById('mensaje-jardin').style.display = 'inline-block';
    
    document.getElementById('titulo-jardin-magico').style.color = '#fff';
    document.getElementById('mensaje-jardin').style.background = 'rgba(0,0,0,0.4)';
    document.getElementById('mensaje-jardin').style.color = '#fff';
    document.getElementById('mensaje-jardin').innerHTML = "Las semillas descansan bajo tierra... 💧";
    
    document.querySelectorAll('.flor-jardin').forEach(f => { f.innerText = '🌰'; f.classList.remove('flor-animada'); });
    document.getElementById('btn-agua').classList.remove('btn-desactivado');
    document.getElementById('btn-sol').classList.add('btn-desactivado');
    document.getElementById('btn-amor').classList.add('btn-desactivado');
    
    detenerGeneradoresMagicos();
}

// Botones Fases 1 a 3
document.addEventListener('click', function(e) {
    if (e.target.closest('#btn-agua') && pasoJardin === 0) {
        moduloJardin.className = 'jardin-lluvia'; document.getElementById('estrellas-fondo').style.display = 'none';
        const clima = document.getElementById('efectos-clima');
        for(let i=0; i<60; i++){ const gota = document.createElement('div'); gota.classList.add('gota-agua'); gota.style.left = Math.random() * 100 + 'vw'; gota.style.animationDuration = (Math.random() * 0.4 + 0.6) + 's'; clima.appendChild(gota); }
        setTimeout(() => { clima.innerHTML = ''; }, 2000); 
        document.querySelectorAll('.flor-jardin').forEach(f => { f.innerText = '🌱'; }); document.getElementById('mensaje-jardin').innerText = "¡Están brotando! Ahora necesitan el sol... ☀️";
        document.getElementById('btn-agua').classList.add('btn-desactivado'); document.getElementById('btn-sol').classList.remove('btn-desactivado'); pasoJardin = 1;
    }

    if (e.target.closest('#btn-sol') && pasoJardin === 1) {
        moduloJardin.className = 'clima-dia'; const clima = document.getElementById('efectos-clima'); const luz = document.createElement('div'); luz.classList.add('rayo-sol'); clima.appendChild(luz);
        document.getElementById('titulo-jardin-magico').style.color = '#fff'; document.querySelectorAll('.flor-jardin').forEach(f => { f.innerText = '🌿'; }); document.getElementById('mensaje-jardin').innerText = "Solo falta el ingrediente principal: Tu amor... ❤️";
        document.getElementById('btn-sol').classList.add('btn-desactivado'); document.getElementById('btn-amor').classList.remove('btn-desactivado'); pasoJardin = 2;
    }

    if (e.target.closest('#btn-amor') && pasoJardin === 2) {
        moduloJardin.className = 'clima-tarde'; 
        document.getElementById('escenario-fondo').style.opacity = '1';
        document.getElementById('astro-cielo').className = 'sol-tarde';
        
        const clima = document.getElementById('efectos-clima');
        document.getElementById('mensaje-jardin').style.background = 'rgba(255,255,255,0.8)';
        document.getElementById('mensaje-jardin').style.color = '#b45309';

        for(let i=0; i<30; i++){
            const corazon = document.createElement('div'); corazon.innerText = '❤️'; corazon.style.position = 'absolute'; corazon.style.left = Math.random() * 100 + 'vw'; corazon.style.bottom = '15vh'; corazon.style.fontSize = (Math.random() * 20 + 20) + 'px'; corazon.style.transition = 'all 3s ease-out'; clima.appendChild(corazon);
            setTimeout(() => { corazon.style.transform = `translateY(-90vh) scale(1.5) rotate(${Math.random() * 40 - 20}deg)`; corazon.style.opacity = '0'; }, 50);
        }

        document.querySelectorAll('.flor-jardin').forEach((f, index) => { setTimeout(() => { f.innerText = '🌻'; f.classList.add('flor-animada'); }, index * 300); });
        
        // Genera el campo abundante (Capa por Capa)
        const campo = document.getElementById('campo-flores');
        for (let i = 0; i < 60; i++) {
            setTimeout(() => {
                let f = document.createElement('div'); f.innerText = '🌻'; f.className = 'flor-campo';
                f.style.left = (Math.random() * 95) + '%';
                let bottomPos = 12 + (Math.random() * 23); f.style.bottom = bottomPos + 'vh';
                let zIndexCalculado = Math.floor(100 - bottomPos); let escalaCalculada = 1 + ((35 - bottomPos) / 23) * 1.5; let brilloCalculado = 0.4 + ((35 - bottomPos) / 23) * 0.6;
                f.style.zIndex = zIndexCalculado; f.style.fontSize = escalaCalculada + 'rem'; f.style.filter = `brightness(${brilloCalculado}) drop-shadow(0 5px 5px rgba(0,0,0,0.8))`;
                campo.appendChild(f); requestAnimationFrame(() => setTimeout(() => f.classList.add('crecida'), 50));
            }, i * 40); 
        }
        
        document.getElementById('mensaje-jardin').innerHTML = "<strong>¡Florecieron!</strong> 🌻<br>Elige la hora del día y desliza tu dedo...";
        
        setTimeout(() => {
            document.getElementById('controles-jardin').style.display = 'none';
            document.getElementById('titulo-jardin-magico').style.display = 'none';
            document.getElementById('mensaje-jardin').style.display = 'none';
            document.getElementById('selector-tiempo').style.display = 'flex'; // Muestra selector de clima
            iniciarGeneradoresMagicos();
        }, 4000);
        
        pasoJardin = 3; 
        climaActual = 'tarde';
        document.getElementById('btn-tarde').classList.add('activo');
        document.getElementById('btn-dia').classList.remove('activo');
        document.getElementById('btn-noche').classList.remove('activo');
    }
});

// SELECTOR DE 3 TIEMPOS
document.addEventListener('click', function(e) {
    if (pasoJardin !== 3) return;
    const btnClima = e.target.closest('.btn-tiempo');
    if (!btnClima) return;

    document.querySelectorAll('.btn-tiempo').forEach(b => b.classList.remove('activo'));
    btnClima.classList.add('activo');

    const astro = document.getElementById('astro-cielo');
    const estrellas = document.getElementById('estrellas-fondo');

    if (btnClima.id === 'btn-dia') {
        moduloJardin.className = 'clima-dia';
        astro.className = 'sol-dia';
        estrellas.style.display = 'none';
        climaActual = 'dia';
    } else if (btnClima.id === 'btn-tarde') {
        moduloJardin.className = 'clima-tarde';
        astro.className = 'sol-tarde';
        estrellas.style.display = 'block';
        climaActual = 'tarde';
    } else if (btnClima.id === 'btn-noche') {
        moduloJardin.className = 'clima-noche';
        astro.className = 'luna-noche';
        estrellas.style.display = 'block';
        climaActual = 'noche';
    }
});

// ==========================================
// SISTEMAS DE NUBES, SOMBRAS Y FAUNA
// ==========================================
let intNubes, intMariposas, intLuciernagas, loopColision;

function iniciarGeneradoresMagicos() {
    detenerGeneradoresMagicos();
    
    // Generador de Nubes (cada 4 a 7 segundos)
    intNubes = setInterval(crearNube, 6000);
    crearNube(); 

    // Generador de Fauna
    intMariposas = setInterval(crearMariposa, 3000);
    intLuciernagas = setInterval(crearLuciernaga, 800);
    
    loopColision = requestAnimationFrame(detectarEclipse);
}

function detenerGeneradoresMagicos() {
    clearInterval(intNubes); clearInterval(intMariposas); clearInterval(intLuciernagas);
    cancelAnimationFrame(loopColision);
    document.getElementById('contenedor-nubes').innerHTML = '';
    document.getElementById('contenedor-mariposas').innerHTML = '';
    document.getElementById('contenedor-luciernagas').innerHTML = '';
    document.getElementById('capa-sombra').classList.remove('eclipse-activo');
}

function crearNube() {
    const contenedor = document.getElementById('contenedor-nubes');
    const nube = document.createElement('div');
    nube.className = 'nube-magica';
    
    const posY = Math.random() * 40 + 20; 
    nube.style.bottom = posY + 'vh';
    
    const escala = Math.random() * 0.8 + 0.8;
    nube.style.transform = `scale(${escala})`;

    const deIzquierda = Math.random() > 0.5;
    nube.style.left = deIzquierda ? '-150px' : '100vw';
    contenedor.appendChild(nube);

    const duracion = Math.random() * 10000 + 15000; 
    const destino = deIzquierda ? window.innerWidth + 150 : -150;
    
    const animacion = nube.animate([
        { left: nube.style.left },
        { left: destino + 'px' }
    ], { duration: duracion, easing: 'linear' });

    animacion.onfinish = () => nube.remove();
}

function crearMariposa() {
    if (climaActual === 'noche') return; 
    const contenedor = document.getElementById('contenedor-mariposas');
    const m = document.createElement('div');
    m.className = 'mariposa'; m.innerText = '🦋';
    
    m.style.left = '-50px';
    m.style.bottom = (Math.random() * 30 + 15) + 'vh'; 
    contenedor.appendChild(m);
    
    const anim = m.animate([
        { transform: `translate(0, 0)` },
        { transform: `translate(110vw, -${Math.random() * 100 + 50}px)` }
    ], { duration: Math.random() * 6000 + 8000, easing: 'ease-in-out' });
    anim.onfinish = () => m.remove();
}

function crearLuciernaga() {
    if (climaActual !== 'noche') {
        document.getElementById('contenedor-luciernagas').innerHTML = '';
        return; 
    }
    const contenedor = document.getElementById('contenedor-luciernagas');
    const l = document.createElement('div');
    l.className = 'luciernaga';
    
    l.style.left = Math.random() * 100 + 'vw';
    l.style.bottom = Math.random() * 40 + 'vh';
    contenedor.appendChild(l);
    
    const xMove = (Math.random() * 100) - 50;
    const yMove = (Math.random() * 100) - 50;
    
    const anim = l.animate([
        { transform: 'translate(0, 0)', opacity: 0 },
        { opacity: 1, offset: 0.2 },
        { opacity: 1, offset: 0.8 },
        { transform: `translate(${xMove}px, ${yMove}px)`, opacity: 0 }
    ], { duration: Math.random() * 4000 + 4000, easing: 'ease-in-out' });
    
    anim.onfinish = () => l.remove();
}

// RADAR LÁSER: ¿La Nube tapa al Sol?
function detectarEclipse() {
    if (pasoJardin === 3) {
        const astro = document.getElementById('astro-cielo');
        const nubes = document.querySelectorAll('.nube-magica');
        const capaSombra = document.getElementById('capa-sombra');
        let hayEclipse = false;

        if (astro && (climaActual === 'dia' || climaActual === 'tarde')) {
            const rectAstro = astro.getBoundingClientRect();
            
            nubes.forEach(nube => {
                const rectNube = nube.getBoundingClientRect();
                if (!(rectAstro.right < rectNube.left || 
                      rectAstro.left > rectNube.right || 
                      rectAstro.bottom < rectNube.top || 
                      rectAstro.top > rectNube.bottom)) {
                    hayEclipse = true;
                }
            });
        }

        if (hayEclipse) { capaSombra.classList.add('eclipse-activo'); } 
        else { capaSombra.classList.remove('eclipse-activo'); }
    }
    loopColision = requestAnimationFrame(detectarEclipse); 
}

// RASTRO DE FLORES (Solo flores amarillas, sin destellos)
let lastX = 0, lastY = 0; let rastroFlores = [];
function dibujarRastro(x, y) {
    if (pasoJardin !== 3) return; 
    const dist = Math.hypot(x - lastX, y - lastY);
    if (dist < 40 && lastX !== 0) return; 
    lastX = x; lastY = y;
    
    const lienzo = document.getElementById('lienzo-rastro');
    const emojis = ['🌻', '🌼']; // Solo flores amarillas puras
    const f = document.createElement('div');
    f.className = 'flor-rastro'; f.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    f.style.left = x + 'px'; f.style.top = y + 'px';
    f.style.fontSize = (Math.random() * 1.5 + 1.5) + 'rem';
    f.style.setProperty('--rot', Math.random() * 360 + 'deg'); 
    
    lienzo.appendChild(f); rastroFlores.push(f);
    if (rastroFlores.length > 70) { const old = rastroFlores.shift(); if (old && old.parentNode) old.parentNode.removeChild(old); }
}

const lienzoEvento = document.getElementById('lienzo-rastro');
if (lienzoEvento) {
    lienzoEvento.addEventListener('mousemove', e => dibujarRastro(e.clientX, e.clientY));
    lienzoEvento.addEventListener('touchmove', e => { const t = e.touches[0]; dibujarRastro(t.clientX, t.clientY); });
    lienzoEvento.addEventListener('click', e => dibujarRastro(e.clientX, e.clientY));
}
