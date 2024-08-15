let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");
let drawMsg = document.querySelector(".drawMsg");

let turnO = true;
let count = 0;

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = ()=>{
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    count = 0;
}


boxes.forEach((box)=>{
    box.addEventListener("click", ()=>{
        if(turnO === true){
            box.innerText = "O";
            turnO = false;
            count++;
        }else{
            box.innerText = "X";
            turnO = true;
            count++; 
        }
        box.disabled = true;
        if(count%2===1){
            box.classList.add("odd");
        }else{
            box.classList.remove("odd");
        }
        if(count === 9){
            showDraw();
        }
        checkWinner();
    })
});

const disableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = true;
    }
};
const enableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showDraw = ()=>{
    drawMsg.innerText = 'DRAW!!!';
    msgContainer.classList.remove("hide");
    msg.classList.add("hide");
    drawMsg.classList.remove("hide");
    disableBoxes();
}

const showWinner = (winner)=>{
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    drawMsg.classList.add("hide");
    msg.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () =>{
    for(let pattern of winPattern){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos1Val != "" && pos1Val != ""){
            if(pos1Val===pos2Val&& pos2Val===pos3Val){
                showWinner(pos1Val);
            }
        }
    }
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);