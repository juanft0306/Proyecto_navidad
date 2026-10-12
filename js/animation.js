/* ==========================================
   Lógica de la Gran Animación Cinematográfica
   ========================================== */

const CinematicAnimation = (() => {
    
    const memories = [
        { tag: "El Inicio", text: "Cuando nos conocimos en aquel evento deportivo de nuestros equipos estudiantiles 🏟️✨" },
        { tag: "Días de UCV", text: "Las risas y los momentos compartidos saliendo de la universidad 📚❤️" },
        { tag: "Nuestra Aventura", text: "Aquella hermosa caminata explorando los caminos del Ávila ⛰️🌿" },
        { tag: "El Gran Día", text: "La pizzería perfecta donde te pedí que fueras mi novia 🍕💍" },
        { tag: "Explorando Juntos", text: "Nuestra divertida cita recorriendo el zoológico 🦁🦜" },
        { tag: "Proyectos a Futuro", text: "Las charlas nocturnas soñando e ideando sobre invertir juntos 💡📈" },
        { tag: "Nuestras Pasiones", text: "Sentados en el estadio de béisbol disfrutando el momento ⚾🔥" }
    ];

    function startSequence(onCompleteCallback) {
        // 1. Contenedor de la cinemática a pantalla completa
        const container = document.createElement('div');
        container.className = 'cinematic-container';
        document.body.appendChild(container);

        // 2. Escena de la Notificación de Instagram con vibración
        setTimeout(() => {
            container.innerHTML = `
                <div class="notification-scene">
                    <div class="insta-notification">
                        <div class="insta-header">
                            <span class="insta-icon">📸</span>
                            <span>Instagram • Ahora</span>
                        </div>
                        <div class="insta-body">
                            <p>feliz navidad bb</p>
                        </div>
                    </div>
                </div>
            `;
            
            if (navigator.vibrate) {
                navigator.vibrate([250, 150, 250]);
            }
        }, 700);

        // 3. Pasar al carrusel de recuerdos después de 3.8 segundos
        let memoryIndex = 0;
        setTimeout(() => {
            showNextMemory(container, memoryIndex, onCompleteCallback);
        }, 4500);
    }

    function showNextMemory(container, index, onCompleteCallback) {
        if (index < memories.length) {
            const memory = memories[index];
            container.innerHTML = `
                <div class="memory-scene active">
                    <div class="memory-card-cinematic">
                        <div class="memory-tag">${memory.tag}</div>
                        <div class="memory-text">${memory.text}</div>
                    </div>
                </div>
            `;

            // Cada recuerdo dura 4.5 segundos en pantalla con zoom suave
            setTimeout(() => {
                showNextMemory(container, index + 1, onCompleteCallback);
            }, 4500);

        } else {
            // 4. Escena Final: El Gran Corazón
            showFinale(container, onCompleteCallback);
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
        btn.addEventListener('click', () => {
            container.style.opacity = '0';
            container.style.transition = 'opacity 0.8s ease';
            setTimeout(() => {
                container.remove();
                if (onCompleteCallback) onCompleteCallback();
            }, 800);
        });
    }

    return {
        run: startSequence
    };
})();
