// JS version:6

const allCell = document.querySelectorAll( '[data-cell]');
const displayTurn = document.querySelector('[data-turn]');
const board  = document.getElementById('board');
const WINNING_LIST = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];
const winningMsgTextElement = document.getElementById('winningText');
const winnigMsgDiv = document.getElementById("winnigMsg");
const restartBtn = document.getElementById('restartBtn');
const xClass = 'x';
const oClass = 'o';
var oTurn;

startGame();

restartBtn.addEventListener("click", startGame);

function startGame() {
  oTurn = false;

  allCell.forEach((cellElement) => {
    cellElement.classList.remove(xClass);
    cellElement.classList.remove(oClass);
    document.querySelector('[data-turn]').classList.remove('not-show');
    document.querySelector('[data-turn]').innerHTML = "X's Turn";
    cellElement.removeEventListener("click", handleClick);
    cellElement.addEventListener("click", handleClick, {once: true});
  });
  setBoardHoverClass();
  winnigMsgDiv.classList.remove("show");
}


function handleClick(e) {
  const cell = e.target;
  const currentClass = oTurn ? oClass : xClass;
  //placing mark
  placeMark(cell, currentClass);
  //check for win
  if(checkWin(currentClass) === true){
    endGame(false, currentClass);
    makeSound();
    allCell.forEach((cellElement) =>{
      cellElement.removeEventListener("click", handleClick);
      // cellElement.style.cursor = "not-allowed";
    });
  }
  else if(isDraw()) {
    endGame(true, currentClass);
    makeSound();
  } else {
    //swap turns
    swapTurns(currentClass);
    setBoardHoverClass();
  }
}

//endGame definition
function endGame(draw, currentClass) {
  winnigMsgDiv.classList.add('show');
  document.querySelector('[data-turn]').classList.add('not-show');
  if(draw){
    winningMsgTextElement.innerText = "खिचडी!";
  } else {
    winningMsgTextElement.innerText =  (oTurn)? "O's WIN" : "X's WIN";
  }

}

function isDraw() {
  return [...allCell].every(cell => {
    return cell.classList.contains(xClass) || cell.classList.contains(oClass);
  })
};

function placeMark(cell, currentClass){
  cell.classList.add(currentClass);
}

function swapTurns(currentClass) {
  oTurn = !oTurn;
  if (oTurn === true) {
    document.querySelector('[data-turn]').innerHTML = "O's Turn";
  }else {
    document.querySelector('[data-turn]').innerHTML = "X's Turn";
  }
}

function setBoardHoverClass() {
  board.classList.remove(xClass);
  board.classList.remove(oClass);
  if (oTurn === true) {
    board.classList.add(oClass);
  } else{
    board.classList.add(xClass);
  }

}

//checkWin definition
function checkWin(currentClass){
  var result = WINNING_LIST.some(i_combination => {
    var  decide = i_combination.every(j_index => {
        return allCell[j_index].classList.contains(currentClass);
    });
    return decide;
  });
  return result;
}


function makeSound() {
  var audio = new Audio("tada-sound/Tada-sound.mp3");
  audio.play();
}
