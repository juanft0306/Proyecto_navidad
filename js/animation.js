/* ==========================================
   Lógica de Animación (Modo Pruebas)
   ========================================== */

const CinematicAnimation = (() => {

    function startSequence(onCompleteCallback) {
        const cinematicScreen = document.getElementById('cinematic-screen');

        if (!cinematicScreen) return;

        // Mostrar la pantalla cinemática
        cinematicScreen.classList.remove('hidden');

        // Simulamos un pequeño momento de transición en negro (1.5 segundos) y mostramos el corazón
        setTimeout(() => {
            cinematicScreen.innerHTML = `
                <div class="finale-scene">
                    <div class="giant-heart">❤️</div>
                    <div class="finale-text">Un año desde que empezó nuestra historia juntos y los que faltan...</div>
                    <button id="to-next-btn" class="next-surprise-btn">CONTINUAR A LA SORPRESA 2 ✨</button>
                </div>
            `;

            const btn = document.getElementById('to-next-btn');
            if (btn) {
                btn.addEventListener('click', () => {
                    cinematicScreen.style.opacity = '0';
                    cinematicScreen.style.transition = 'opacity 0.8s ease';
                    setTimeout(() => {
                        cinematicScreen.classList.add('hidden');
                        cinematicScreen.style.opacity = '1';
                        if (onCompleteCallback) onCompleteCallback();
                    }, 800);
                });
            }
        }, 1500);
    }

    return {
        run: startSequence
    };
})();
