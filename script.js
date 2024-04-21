'use strict';

// Selecting Elements
let score0El = document.querySelector("#score--0"); 
let score1El = document.getElementById("score--1");

let diceEl = document.querySelector(".dice");

let btnNew = document.querySelector(".btn--new");
let btnRoll = document.querySelector(".btn--roll");
let btnHold = document.querySelector(".btn--hold");

let current0El = document.getElementById("current--0");
let current1El = document.getElementById("current--1");

let player0El = document.querySelector(".player--0");
let player1El = document.querySelector(".player--1");

let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;

score0El.textContent = 0;
score1El.textContent = 0;

diceEl.classList.add("hidden");

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer == 0 ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
}



btnRoll.addEventListener("click", function(){
    if(playing){
        // 1. Generate a random dice roll
        let dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display the dice
        diceEl.classList.remove("hidden");
        diceEl.src = `dice-${dice}.png`


        // 3. Check for rolled 1
        if(dice !== 1){
            // Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }

        //Switch to next player
        else{
            switchPlayer()
        }
    }
});


btnHold.addEventListener("click", function(){
    if(playing){
        // 1. Add Current Score to Active Players
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. Check if player's score is >=100
        if(scores[activePlayer] >= 100){
            // Finish Game
            playing = false;
            diceEl.classList.add("hidden");

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }

        else{
            switchPlayer();
        }

        // Switch to the next player
    }
    
});

btnNew.addEventListener("click", function(){
    playing = true
    if(playing){
        player0El.classList.add('player--active');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
        currentScore = 0;
        activePlayer = 0;
        score0El.textContent = 0;
        score1El.textContent = 0;
        scores = [0, 0];

        document.getElementById("current--0").textContent = 0;
        document.getElementById("current--1").textContent = 0;

    }
}); 

