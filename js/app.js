/* ==========================================
   app.js - Orquestador Principal del Proyecto
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const welcomeScreen = document.getElementById('welcome-screen');

    if (startBtn) {
        startBtn.addEventListener('click', () => {
            // 1. Efecto de desvanecimiento de la pantalla de bienvenida
            welcomeScreen.style.opacity = '0';
            welcomeScreen.style.transition = 'opacity 0.6s ease';

            setTimeout(() => {
                // Ocultar la pantalla de bienvenida por completo
                welcomeScreen.classList.add('hidden');

                // 2. Disparar la Gran Animación Cinematográfica (¡PAS!, Notificación y Recuerdos)
                if (typeof CinematicAnimation !== 'undefined') {
                    CinematicAnimation.run(() => {
                        console.log("Gran Animación Finalizada -> Listo para la Sorpresa 2 (WhatsApp Puzzle)");
                    });
                } else {
                    console.error("Error: 'CinematicAnimation' no está definido. Revisa que js/animation.js esté cargado.");
                }
            }, 600);
        });
    }
});
