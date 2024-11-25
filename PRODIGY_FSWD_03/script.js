const gameBoard = document.getElementById("gameboard");
const playerInfo = document.getElementById("information");
const restart = document.getElementById("btn");

let gameCells = ['', '', '', '', '', '', '', '', ''];
let go = "x";


playerInfo.textContent = "X plays first";

const createBoard = () => {
    gameBoard.innerHTML = ''; // Clear the game board
    gameCells.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("square");
        cellElement.id = index;
        cellElement.addEventListener('click', gameOn);
        gameBoard.append(cellElement);
    });
}

const gameOn = (e) => {
   

    const goDisplay = document.createElement("div");
    goDisplay.classList.add(go);
    e.target.append(goDisplay);
    gameCells[e.target.id] = go;
    go = go === "x" ? "circle" : "x";
    playerInfo.textContent = `It is now ${go}'s turn`;
    e.target.removeEventListener("click", gameOn);
    checkScore();
}

const checkScore = () => {
    const allSquares = document.querySelectorAll(".square");
    const winningPropability = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    let xWins=false;
    let circleWins=false;


    winningPropability.forEach(array => {
        xWins = array.every(cell =>
            allSquares[cell].firstChild?.classList.contains("x"));

        if (xWins) {
            playerInfo.textContent = `X Wins!`;
            
            allSquares.forEach(squares => squares.replaceWith(squares.cloneNode(true)));
            return;
           
        }
    });


        winningPropability.forEach(array => {
            circleWins = array.every(cell =>
                allSquares[cell].firstChild?.classList.contains("circle"));

            if (circleWins) {
                playerInfo.textContent = `O Wins!`;
               
                allSquares.forEach(squares => squares.replaceWith(squares.cloneNode(true)));
                return;
            
            }
        });
    
    

        if (!xWins && !circleWins) {
           const allFilled = gameCells.every(cell => cell !== '');
            if (allFilled) {
                playerInfo.textContent = "Draw!";
                allSquares.forEach(square => square.replaceWith(square.cloneNode(true))); // Remove event listeners
            }
        }
  
}

const restartGame = () => {
    gameCells = ['', '', '', '', '', '', '', '', ''];
    go = "x";

    playerInfo.textContent = "X plays first";
    createBoard();
}

restart.addEventListener("click", restartGame);

createBoard();
