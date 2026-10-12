/* ==========================================
   Lógica de la Animación por Video (A prueba de fallos)
   ========================================== */

const CinematicAnimation = (() => {

    function startSequence(onCompleteCallback) {
        const cinematicScreen = document.getElementById('cinematic-screen');
        const introVideo = document.getElementById('intro-video');

        if (!cinematicScreen) return;

        // 1. Mostrar la pantalla negra cinemática
        cinematicScreen.classList.remove('hidden');

        // Si no hay elemento de video o no tiene fuente, ir directo al final de prueba
        if (!introVideo || !introVideo.querySelector('source').getAttribute('src')) {
            console.log("No hay video configurado. Mostrando escena final directamente.");
            showFinale(cinematicScreen, onCompleteCallback);
            return;
        }

        // 2. Intentar reproducir el video
        const playPromise = introVideo.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                // El video está corriendo con éxito
                introVideo.onended = () => {
                    showFinale(cinematicScreen, onCompleteCallback);
                };
            }).catch(error => {
                // Si el navegador bloquea el video o el archivo no existe físicamente en assets/
                console.warn("El video no se pudo reproducir (probablemente falta el archivo en assets/). Saltando al final de prueba.");
                showFinale(cinematicScreen, onCompleteCallback);
            });
        } else {
            showFinale(cinematicScreen, onCompleteCallback);
        }
    }

    function showFinale(container, onCompleteCallback) {
        // Asegurarnos de limpiar cualquier cosa previa e inyectar el HTML del corazón
        container.innerHTML = `
            <div class="finale-scene">
                <div class="giant-heart">❤️</div>
                <div class="finale-text">Un año desde que empezó nuestra historia juntos y los que faltan...</div>
                <button id="to-next-btn" class="next-surprise-btn">CONTINUAR A LA SORPRESA 2 ✨</button>
            </div>
        `;

        const btn = document.getElementById('to-next-btn');
        if (btn) {
            btn.addEventListener('click', () => {
                container.style.opacity = '0';
                container.style.transition = 'opacity 0.8s ease';
                setTimeout(() => {
                    container.classList.add('hidden');
                    container.style.opacity = '1'; // Resetear opacidad para la próxima
                    if (onCompleteCallback) onCompleteCallback();
                }, 800);
            });
        }
    }

    return {
        run: startSequence
    };
})();
