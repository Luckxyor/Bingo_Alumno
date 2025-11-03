// Array de imágenes - 11 imágenes en total, se usarán 8 aleatorias cada vez
const images = [
    'images/ARBOL ITALAM.jpg',
    'images/CASA ITALAM.jpg',
    'images/CIELO ITALAM.jpg',
    'images/FLOR.jpg',
    'images/HUMANOS.jpg',
    'images/MAR.jpg',
    'images/MONTAÑA ITALAM.jpg',
    'images/MUNDO 2.jpg',
    'images/PAJARO.jpg',
    'images/RIOS.jpg',
    'images/SOL.jpg'
];

let currentBoard = [];

// Función para mezclar array (Fisher-Yates shuffle)
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Función para crear el tablero
function createBoard() {
    const board = document.getElementById('bingoBoard');
    board.innerHTML = '';
    
    // Mezclar todas las imágenes y tomar solo 8 para el tablero 4x2
    const shuffledImages = shuffleArray(images);
    currentBoard = shuffledImages.slice(0, 8);
    
    // Crear las 8 celdas (4 columnas x 2 filas)
    currentBoard.forEach((imageSrc, index) => {
        const cell = document.createElement('div');
        cell.className = 'bingo-cell';
        cell.dataset.index = index;
        
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = `תמונה ${index + 1}`;
        img.onerror = function() {
            this.style.display = 'none';
            this.parentElement.style.background = '#ddd';
        };
        
        cell.appendChild(img);
        
        // Agregar evento de click
        cell.addEventListener('click', function() {
            this.classList.toggle('marked');
        });
        
        board.appendChild(cell);
    });
}

// Función para reiniciar el juego
function resetGame() {
    createBoard();
}

// Función para mostrar el modal de confirmación
function showResetModal() {
    const modal = document.getElementById('resetModal');
    modal.classList.add('show');
}

// Función para cerrar el modal
function closeModal() {
    const modal = document.getElementById('resetModal');
    modal.classList.remove('show');
}

// Función para confirmar el reinicio
function confirmReset() {
    closeModal();
    resetGame();
}

// Cerrar modal al hacer click fuera de él
window.onclick = function(event) {
    const modal = document.getElementById('resetModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Inicializar el juego cuando carga la página
window.addEventListener('load', createBoard);