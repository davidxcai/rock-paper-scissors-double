
const
    // Div selectors
    opponentHp = document.querySelector("#opponentHP"),
    opponentChoice = document.querySelector("#opponentChoice"),
    playerHP = document.querySelector("#playerHP"),
    playerChoice = document.querySelector("#playerChoice"),
    resultDiv = document.querySelector("#result"),
    // Buttons
    choiceButton = document.querySelectorAll(".choiceButton"),
    confirmButton = document.querySelectorAll(".confirmButton"),
    nextButton = document.querySelector("#nextButton");

const player = {
    hp: 100,
    choice: "",
    double: false
}
const opponent = {
    hp: 100,
    choice: "",
    double: false
}

let result = false;
let gameover = false;

choiceButton.forEach(button => button.addEventListener("click", () => {
    player.choice = button.value;
    opponentTurn();
    confirmButton.forEach(button => button.classList.remove("hidden"));
}));

confirmButton.forEach(button => button.addEventListener("click", () => {
    button.value == "double" ? player.double = true : player.double = false;
    check();
}));

nextButton.addEventListener("click", () => {
    nextTurn();
    nextButton.classList.add("hidden");
    choiceButton.forEach(button => button.classList.remove("hidden"));
})

function check() {
    if (player.choice == opponent.choice) {
        result = "draw"
    } else {
        switch(player.choice) {
            case "rock":
                (opponent.choice == "scissors") ? result = "win" : result = "lose";
                break;
            case "paper":
                (opponent.choice == "rock") ? result = "win" : result = "lose";
                break;
            case "scissors":
                (opponent.choice == "paper") ? result = "win" : result = "lose";
                break;
        }
    }
    updateScore();
}

function updateScore() {
    let amount;
    if (player.double && opponent.double) {
        amount = 20;
    } else if (player.double || opponent.double) {
        amount = 10;
    } else {
        amount = 5;
    }
    
    switch(result) {
        case "win":
            opponent.hp -= amount;
            if (opponent.hp <= 0) {gameover = true};
            updateDisplay();
            break;
        case "lose":
            player.hp -= amount;
            if (player.hp <= 0) {gameover = true};
            updateDisplay();
            break;
        case "draw":
            updateDisplay();
            break;
    }
}

function opponentTurn() {
    const choice = ["rock", "paper", "scissors"];
    const doubleChance = Math.floor(Math.random() * 4);
    opponent.choice = choice[Math.floor(Math.random() * 3)];
    opponent.double = (doubleChance == 3 ? true : false);
}

function updateDisplay() {
    opponentChoice.textContent = `${opponent.choice} ${(opponent.double) ? "DOUBLE" : ""}`;
    playerChoice.textContent = `${player.choice} ${(player.double) ? "DOUBLE" : ""}`;
    opponentHp.textContent = opponent.hp;
    playerHP.textContent = player.hp;
    switch(result) {
        case "win": 
            console.log(gameover);
            resultDiv.textContent = `You Win! ${gameover ? "GAMEOVER" : ""}`;
            break;
        case "lose": 
            console.log(gameover);
            resultDiv.textContent = `You Lose ${gameover ? "GAMEOVER" : ""}`;
            break;
        case "draw": 
            resultDiv.textContent = "Draw";
            break;
    }
    choiceButton.forEach(button => button.classList.add("hidden"));
    confirmButton.forEach(button => button.classList.add("hidden"));
    nextButton.classList.remove("hidden");
}

function nextTurn() {
    resultDiv.textContent = "";
    opponentChoice.textContent = "";
    playerChoice.textContent = "";
    result = "";
    player.choice = "";
    opponent.choice = "";
    if (gameover) {
        player.hp = 100;
        opponent.hp = 100;
    }
}