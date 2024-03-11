
let boxes = document.querySelectorAll(".box");
let gameContainer = document.querySelector(".container");
let resetBtn = document.querySelector("#reset-button");
let newGameBtn = document.querySelector("#new-button");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

// The winnning patterns
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];
let count = 0;


boxes.forEach((box) => {
    box.addEventListener("click", ()=>{
        if (turnO) {
            box.innerText = "O";
            box.style.color = "#EDE7D9";
            turnO = false;
        } else{
            box.innerText = "X";
            box.style.color = "#D5A021";
            turnO = true;
            
        }
        box.disabled = true;
        checkWinner();
        count++;
        if(count>=9){
            drawMessage();
        }
    });  
});

const drawMessage = () => {
    msg.innerText = "Sorry, Both of you are genuises";
    msgContainer.classList.remove("hide");
    enableBoxes();
}
const resetGame = () => {
    turnO = true;
    enableBoxes();
    count =0;
    msgContainer.classList.add("hide");
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
    gameContainer.classList.remove("hide");
    resetBtn.classList.remove("hide");
};
const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
    gameContainer.classList.add("hide");
    resetBtn.classList.add("hide");
};
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};
const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val=== pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
            }
        }

    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

