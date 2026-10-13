const linterna = document.getElementById('linterna');
const pantalla = document.getElementById('modulo-intro');
const botonesOcultos = document.querySelectorAll('.btn-oculto');
const contenidoRevelado = document.getElementById('contenido-revelado');
const contenedorCorazones = document.getElementById('contenedor-corazones');
const btnEmpezar = document.getElementById('btn-empezar');
const capaOscuraFinal = document.getElementById('capa-oscura-final');
const instrucciones = document.getElementById('instrucciones');
const sonidoBoton = document.getElementById('sonido-boton');

let botonesEncontrados = 0;
let intervaloCorazones;
let haMovidoLinterna = false;

// 1. Asignar posiciones aleatorias a los botones
function posicionarBotones() {
    botonesOcultos.forEach(boton => {
        // Genera un porcentaje entre 10% y 85% para que no queden fuera de la pantalla
        const x = Math.floor(Math.random() * 75) + 10;
        const y = Math.floor(Math.random() * 75) + 10;
        
        boton.style.left = `${x}%`;
        boton.style.top = `${y}%`;
    });
}
posicionarBotones(); // Se ejecuta apenas carga el script

// 2. Lógica de la linterna y ocultar instrucciones
function actualizarLinterna(e) {
    let x = e.touches ? e.touches[0].clientX : e.clientX;
    let y = e.touches ? e.touches[0].clientY : e.clientY;
    
    linterna.style.setProperty('--x', `${x}px`);
    linterna.style.setProperty('--y', `${y}px`);

    // Si es la primera vez que mueve el dedo, ocultamos las instrucciones
    if (!haMovidoLinterna) {
        instrucciones.classList.add('oculto');
        haMovidoLinterna = true;
    }
}

pantalla.addEventListener('mousemove', actualizarLinterna);
pantalla.addEventListener('touchmove', actualizarLinterna);

// 3. Lógica de los botones con sonido
botonesOcultos.forEach(boton => {
    boton.addEventListener('click', () => {
        if (!boton.classList.contains('encontrado')) {
            boton.classList.add('encontrado');
            botonesEncontrados++;
            
            // Reproducir sonido (reinicia el audio si presiona rápido)
            sonidoBoton.currentTime = 0;
            sonidoBoton.play().catch(e => console.log("El navegador bloqueó el audio", e));
            
            if (botonesEncontrados === 3) {
                iniciarRevelacion();
            }
        }
    });
});

// 4. Secuencia de revelación
function iniciarRevelacion() {
    linterna.classList.add('desactivada');
    botonesOcultos.forEach(b => b.style.opacity = '0');
    contenidoRevelado.classList.add('activo');
    intervaloCorazones = setInterval(crearCorazon, 300);
}

function crearCorazon() {
    const corazon = document.createElement('div');
    corazon.classList.add('corazon-cayendo');
    corazon.innerText = '❤️';
    corazon.style.left = Math.random() * 100 + 'vw';
    const size = Math.random() * 20 + 15;
    corazon.style.fontSize = `${size}px`;
    corazon.style.animationDuration = Math.random() * 3 + 3 + 's';
    
    contenedorCorazones.appendChild(corazon);
    
    setTimeout(() => { corazon.remove(); }, 6000);
}

// 5. Botón final y modularidad
btnEmpezar.addEventListener('click', () => {
    capaOscuraFinal.classList.add('activo');
    clearInterval(intervaloCorazones);
    
    // Le avisamos al resto de la aplicación que el Módulo 1 terminó
    setTimeout(() => {
        document.dispatchEvent(new Event('modulo1-terminado'));
    }, 2500); // Espera 2.5s a que el fundido a negro termine
});
