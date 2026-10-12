/* ==========================================
   Lógica de la Animación por Video
   ========================================== */

const CinematicAnimation = (() => {

    function startSequence(onCompleteCallback) {
        const cinematicScreen = document.getElementById('cinematic-screen');
        const introVideo = document.getElementById('intro-video');

        if (!cinematicScreen || !introVideo) return;

        // Mostrar pantalla en negro con el video
        cinematicScreen.classList.remove('hidden');

        // Reproducir el video
        introVideo.play().catch(error => {
            console.log("El navegador requirió interacción o bloqueó el autoplay del video:", error);
            // Si hay problemas de autoplay, mostramos el corazón de una vez o un botón de play
        });

        // Evento que se dispara automáticamente cuando el video TERMINA
        introVideo.onended = () => {
            showFinale(cinematicScreen, onCompleteCallback);
        };
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
        btn.addEventListener('click', () => {
            container.style.opacity = '0';
            container.style.transition = 'opacity 0.8s ease';
            setTimeout(() => {
                container.classList.add('hidden');
                if (onCompleteCallback) onCompleteCallback();
            }, 800);
        });
    }

    return {
        run: startSequence
    };
})();
