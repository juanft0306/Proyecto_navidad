/* ==========================================
   Lógica de la Animación por Video (Con respaldo)
   ========================================== */

const CinematicAnimation = (() => {

    function startSequence(onCompleteCallback) {
        const cinematicScreen = document.getElementById('cinematic-screen');
        const introVideo = document.getElementById('intro-video');

        if (!cinematicScreen || !introVideo) return;

        // Mostrar pantalla en negro
        cinematicScreen.classList.remove('hidden');

        // Intentar reproducir el video
        const playPromise = introVideo.play();

        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // El video empezó a reproducirse correctamente
                introVideo.onended = () => {
                    showFinale(cinematicScreen, onCompleteCallback);
                };
            }).catch(error => {
                // Si el video falla (porque el archivo no existe todavía), 
                // simulamos 4 segundos de pantalla en negro y pasamos al corazón de prueba
                console.log("Video no encontrado o bloqueado. Usando modo de prueba temporal...");
                setTimeout(() => {
                    showFinale(cinematicScreen, onCompleteCallback);
                }, 4000);
            });
        }
    }

    function showFinale(container, onCompleteCallback) {
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
                    if (onCompleteCallback) onCompleteCallback();
                }, 800);
            });
        }
    }

    return {
        run: startSequence
    };
})();
