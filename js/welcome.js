document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const welcomeScreen = document.getElementById('welcome-screen');

    startBtn.addEventListener('click', () => {
        // Efecto visual de desvanecimiento de la pantalla de bienvenida
        welcomeScreen.style.opacity = '0';
        welcomeScreen.style.transition = 'opacity 0.5s ease';

        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            
            // Aquí dispararemos la llamada para mostrar la gran animación de 8 bits
            console.log("Transición exitosa: Iniciando la gran animación...");
            
            // Ejemplo: si tienes una función global en main.js o en otro módulo:
            // iniciarGranAnimacion(); 
        }, 500);
    });
});
