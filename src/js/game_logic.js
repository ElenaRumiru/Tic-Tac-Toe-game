// Находим необходимые элементы и задаем переменные
let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');
let player1Color = getComputedStyle(document.body).getPropertyValue('--blue');
let player2Color = getComputedStyle(document.body).getPropertyValue('--purple');

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;

// Заполняем все элементы массива одни значением
let spaces = Array(9).fill(null);


// Задаем функцию старта игры для каждой клеточки с вызываемой функцией
const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
};

// Задаем функцию описывающую поведение по клику
// Она должна чередовать крестики и нолики, менять цвет и отслеживать победу
function boxClicked(e) {
    const id = e.target.id     

    if(!spaces[id] && playerHasWon() == false){
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if(playerHasWon() !==false && currentPlayer == X_TEXT){
            playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()
            e.target.style.color=player1Color;
            e.target.classList.remove('neon-text2');
            e.target.classList.add('neon-text');
            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            return
        };

        if(playerHasWon() !==false && currentPlayer == O_TEXT){
            playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()
            e.target.style.color=player2Color;
            e.target.classList.remove('neon-text');
            e.target.classList.add('neon-text2');
            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            return
        };


        if (currentPlayer == X_TEXT) {
            currentPlayer = O_TEXT;
            e.target.style.color=player1Color;
            e.target.classList.remove('neon-text2');
            e.target.classList.add('neon-text');
        } else if (currentPlayer == O_TEXT) {
            currentPlayer = X_TEXT;            
            e.target.style.color=player2Color;
            e.target.classList.remove('neon-text');
            e.target.classList.add('neon-text2');
        }             
    }     
};

// Описываем выйгрышные комбинации горизонтальные, вертикальные и диагональные
const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

// Задаем функцию, определяющую победителя по выйгрышным комбинациям
function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c]
        }
    }
    return false
};


// Добавляем обработчик клика по кнопке перезапуска игры
restartBtn.addEventListener('click', restart);

// Описываем функцию рестарта, которая обнуляет текст победителя, очищает поле
function restart() {
    spaces.fill(null)

    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor=''
    })

    playerText.innerHTML = 'Tic Tac Toe'

    currentPlayer = X_TEXT
};

// Запускаем игру!
startGame();