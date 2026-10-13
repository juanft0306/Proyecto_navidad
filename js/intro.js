// ==========================================
// MÓDULO INTRO: REFERENCIAS AL DOM
// ==========================================
const linterna = document.getElementById('linterna');
const pantalla = document.getElementById('modulo-intro');
const botonesOcultos = document.querySelectorAll('.btn-oculto');
const contenidoRevelado = document.getElementById('contenido-revelado');
const contenedorCorazones = document.getElementById('contenedor-corazones');
const btnEmpezar = document.getElementById('btn-empezar');
const capaOscuraFinal = document.getElementById('capa-oscura-final');

let botonesEncontrados = 0;
let intervaloCorazones;

// ==========================================
// 1. LÓGICA DE LA LINTERNA (SEGUIR EL DEDO/MOUSE)
// ==========================================
function actualizarLinterna(e) {
    // Detecta si la interacción es en pantalla táctil o con mouse
    let x = e.touches ? e.touches[0].clientX : e.clientX;
    let y = e.touches ? e.touches[0].clientY : e.clientY;
    
    // Inyecta las coordenadas en las variables CSS
    linterna.style.setProperty('--x', `${x}px`);
    linterna.style.setProperty('--y', `${y}px`);
}

pantalla.addEventListener('mousemove', actualizarLinterna);
pantalla.addEventListener('touchmove', actualizarLinterna);

// ==========================================
// 2. LÓGICA DE LOS BOTONES OCULTOS
// ==========================================
botonesOcultos.forEach(boton => {
    boton.addEventListener('click', () => {
        // Verifica que el botón no haya sido pulsado ya
        if (!boton.classList.contains('encontrado')) {
            boton.classList.add('encontrado');
            botonesEncontrados++;
            
            // Si encontró los 3, inicia la sorpresa
            if (botonesEncontrados === 3) {
                iniciarRevelacion();
            }
        }
    });
});

// ==========================================
// 3. SECUENCIA DE REVELACIÓN (LUZ Y MENSAJE)
// ==========================================
function iniciarRevelacion() {
    // Apaga el efecto de sombra
    linterna.classList.add('desactivada');
    
    // Esconde los 3 botoncitos
    botonesOcultos.forEach(b => b.style.opacity = '0');
    
    // Muestra el mensaje y el botón
    contenidoRevelado.classList.add('activo');
    
    // Inicia la lluvia de corazones cada 300ms
    intervaloCorazones = setInterval(crearCorazon, 300);
}

// ==========================================
// 4. ANIMACIÓN DE LLUVIA DE CORAZONES
// ==========================================
function crearCorazon() {
    const corazon = document.createElement('div');
    corazon.classList.add('corazon-cayendo');
    corazon.innerText = '❤️'; // Puedes cambiarlo por 💖 o ✨
    
    // Posición y tamaño aleatorio
    corazon.style.left = Math.random() * 100 + 'vw';
    const size = Math.random() * 20 + 15;
    corazon.style.fontSize = `${size}px`;
    
    // Velocidad de caída aleatoria (entre 3s y 6s)
    corazon.style.animationDuration = Math.random() * 3 + 3 + 's';
    
    contenedorCorazones.appendChild(corazon);
    
    // Elimina el corazón del código para no saturar el navegador
    setTimeout(() => {
        corazon.remove();
    }, 6000);
}

// ==========================================
// 5. BOTÓN FINAL: FUNDIDO A NEGRO
// ==========================================
btnEmpezar.addEventListener('click', () => {
    capaOscuraFinal.classList.add('activo');
    
    // Opcional: Detener la generación de corazones nuevos para optimizar rendimiento
    clearInterval(intervaloCorazones);
    
    // Aquí es donde en el futuro llamaremos a la función que inicia el video
    console.log("Transición ejecutada. Listo para cargar el Módulo 2 (Video).");
});
