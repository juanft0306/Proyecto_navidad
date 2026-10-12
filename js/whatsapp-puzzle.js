/* ==========================================
   Lógica de la Sorpresa 2 (WhatsApp Puzzle)
   ========================================== */

const WhatsappPuzzle = (() => {

    // Define aquí tus mensajes desordenados, el número secreto correcto para cada uno,
    // y el fragmento del mensaje grande que se revela al resolverlo.
    const puzzleData = [
        { id: 1, text: "💬 [Mensaje 1]: 'Aún recuerdo cuando me dijiste eso sin contexto...'", correctNum: "24", solved: false },
        { id: 2, text: "💬 [Mensaje 2]: 'Guarda bien este número, te servirá más adelante.'", correctNum: "12", solved: false },
        { id: 3, text: "💬 [Mensaje 3]: 'Cada pieza de este chat tiene un sentido oculto para nosotros.'", correctNum: "2026", solved: false }
    ];

    function init(onPuzzleComplete) {
        // Creamos la pantalla de la sorpresa 2
        const puzzleScreen = document.createElement('div');
        puzzleScreen.className = 'puzzle-container';
        
        let htmlContent = `
            <div class="wa-header">
                <div class="wa-avatar">💬</div>
                <div class="wa-chat-info">
                    <h3>Chat Especial • Desafío WhatsApp</h3>
                    <p>En línea</p>
                </div>
            </div>
            <div class="wa-chat-body" id="chat-body">
                <div class="wa-intro-text">
                    🔒 Hay mensajes ocultos en nuestro chat que no tenían sentido... ¡Introduce el número correcto para cada uno para descubrir el mensaje secreto!
                </div>
        `;

        puzzleData.forEach((item, index) => {
            htmlContent.తారు `
                <div class="wa-message-card" id="msg-card-${item.id}">
                    <div class="wa-msg-text">${item.text}</div>
                    <div class="wa-input-group" id="input-group-${item.id}">
                        <input type="text" class="wa-number-input" placeholder="Nº clave..." id="input-${item.id}">
                        <button class="wa-check-btn" onclick="WhatsappPuzzle.checkNumber(${item.id})">Desbloquear</button>
                    </div>
                </div>
            `;
        });

        htmlContent += `</div>`;
        puzzleScreen.innerHTML = htmlContent;
        document.body.appendChild(puzzleScreen);
    }

    function checkNumber(id) {
        const inputVal = document.getElementById(`input-${id}`).value.trim();
        const item = puzzleData.find(p => p.id === id);
        const card = document.getElementById(`msg-card-${id}`);
        const inputGroup = document.getElementById(`input-group-${id}`);

        if (item && inputVal === item.correctNum) {
            item.solved = true;
            inputGroup.innerHTML = `<span style="color: #00a884; font-weight: bold; font-size: 0.9rem;">✓ ¡Mensaje sincronizado con éxito!</span>`;
            card.style.borderColor = "#00a884";

            // Verificar si ya resolvió todos
            if (puzzleData.every(p => p.solved)) {
                setTimeout(showFinalSecretMessage, 800);
            }
        } else {
            alert("❌ Número incorrecto. ¡Revisa bien las pistas!");
        }
    }

    function showFinalSecretMessage() {
        const chatBody = document.getElementById('chat-body');
        const finalBox = document.createElement('div');
        finalBox.className = 'wa-revealed-box';
        finalBox.innerHTML = `
            <h4>🎉 ¡FELICIDADES, DESBLOQUEASTE EL CHAT SECRETO! 🎉</h4>
            <p>Aquí tienes el mensaje completo que unía todas las piezas: <strong>"Eres lo mejor que me ha pasado en la vida, gracias por este año maravilloso y por todos los que nos faltan por construir juntos."</strong></p>
            <button class="next-surprise-btn" id="to-surprise-3" style="margin-top: 15px;">IR A LA SORPRESA 3 ✨</button>
        `;
        chatBody.appendChild(finalBox);
        chatBody.scrollTop = chatBody.scrollHeight;

        document.getElementById('to-surprise-3').addEventListener('click', () => {
            document.querySelector('.puzzle-container').remove();
            console.log("Listo para la Sorpresa 3 (Cápsula de regalos pasados)");
            // Aquí activaremos la Sorpresa 3
        });
    }

    return {
        init,
        checkNumber
    };
})();
          
