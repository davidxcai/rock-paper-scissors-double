
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
    updateButtonDisplay("confirm");
}));

confirmButton.forEach(button => button.addEventListener("click", () => {
    player.double = Number(button.value);
    // button.value == "double" ? player.double = true : player.double = false;
    check();
}));

nextButton.addEventListener("click", () => {
    nextTurn();
    nextButton.classList.add("hidden");
    updateButtonDisplay("next");
})

function check() {
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
    if (player.choice == opponent.choice) {
        result = "draw"
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
            opponent.hp = Math.max(opponent.hp - amount, 0);
            break;
        case "lose":
            player.hp = Math.max(player.hp - amount, 0);
            break;
    }
    if (player.hp == 0 || opponent.hp == 0) {
        gameover = true
    };

    updateChoice();
    updateHP();
    updateResult(amount);
}

function opponentTurn() {
    const choice = ["rock", "paper", "scissors"];
    const doubleChance = Math.floor(Math.random() * 4);
    opponent.choice = choice[Math.floor(Math.random() * 3)];
    opponent.double = (doubleChance == 3 ? true : false);
}

function updateHP() {
    playerHP.textContent = player.hp;
    opponentHp.textContent = opponent.hp;
}

function updateChoice() {
    const emoji = new Map([
        ["rock", "✊"], 
        ["paper", "🖐"], 
        ["scissors", "✌️"]]);

    playerChoice.innerHTML = 
        `<h1 class="emoji">${emoji.get(player.choice)}</h1>
        <h3>${(player.double) ? "DOUBLE" : ""}</h3>`;

    opponentChoice.innerHTML = 
        `<h1 class="emoji">${emoji.get(opponent.choice)}</h1>
        <h3>${(opponent.double) ? "DOUBLE" : ""}</h3>`;
    
    if (player.choice == "" || opponentChoice == "") {
        playerChoice.innerHTML = "";
        opponentChoice.innerHTML = "";
    }
    updateButtonDisplay("update");
}

function updateButtonDisplay(status) {
    switch(status) {
        case "confirm":
            confirmButton.forEach(button => button.classList.remove("hidden"));
            break;
        case "next":
            choiceButton.forEach(button => button.classList.remove("hidden"));
            break;
        case "update":
            choiceButton.forEach(button => button.classList.add("hidden"));
            confirmButton.forEach(button => button.classList.add("hidden"));
            nextButton.classList.remove("hidden");
            break;
    }
}

function updateResult(amount) {
    switch(result) {
        case "win": 
            console.log(gameover);
            resultDiv.innerHTML = `<h3>Opponent -${amount}</h3>`;
            break;
        case "lose": 
            console.log(gameover);
            resultDiv.innerHTML = `<h3>Player -${amount}</h3>`;
            break;
        case "draw": 
            resultDiv.innerHTML = `<h3>Draw</h3>`;
            break;
    }
    if (gameover) {
        resultDiv.innerHTML += `<h3>${result == "win" ? "You Won!" : "You Lost"}</h3>`;
        resultDiv.innerHTML += `<h3>GAMEOVER</h3>`;
    }
}

function nextTurn() {
    resultDiv.textContent = "";
    result = "";
    player.choice = "";
    opponent.choice = "";
    updateChoice();
    if (gameover) {
        player.hp = 100;
        opponent.hp = 100;
        updateHP();
        gameover = false;
    }
}

(function footer() {
    document.querySelector("#footer").innerHTML = "© 2023 David Cai";
})();