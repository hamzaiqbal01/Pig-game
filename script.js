"use strict";
// selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
let currentScore0El = document.querySelector("#current--0");
let currentScore1El = document.querySelector("#current--1");

const player0NameEl = document.querySelector("#name--0");
const player1NameEl = document.querySelector("#name--1");
const player1Name = document.querySelector(".player1Name");
const player2Name = document.querySelector(".player2Name");
const playerNameElement = document.querySelector(".playerNames");
const startGamaeBtn = document.querySelector(".startBtn");
const errorMessage = document.querySelector(".message");
const overlay = document.querySelector(".overlay");

let score, curentScore, activePlayer, playing;

//starting game

const getInformation = function () {
  if (player1Name.value && player2Name.value) {
    playerNameElement.classList.add("hidden");
    overlay.classList.add("hidden");
    player0NameEl.textContent = player1Name.value;
    player1NameEl.textContent = player2Name.value;
  } else {
    errorMessage.classList.remove("hidden");
  }
};
startGamaeBtn.addEventListener("click", getInformation);

// initializing the value

const init = function () {
  score = [0, 0];
  curentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");

  //
  playerNameElement.classList.remove("hidden");
  overlay.classList.remove("hidden");
  player1Name.value = "";
  player2Name.value = "";
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  curentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active"); //it will add the class if there is no mentioned class and remve it if element has this class
  player1El.classList.toggle("player--active");
};

// Rolling dice
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generating the random dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    diceEl.src = `dice-${dice}.png`;

    // 2. Display the dice
    diceEl.classList.remove("hidden");

    // 3. check the rolled 1 ; if true then switch to next player
    if (dice !== 1) {
      //add dice to current score
      curentScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        curentScore;
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1. Add score to active player
    score[activePlayer] += curentScore;
    // score[1]=score[1]+curentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    //2. check if player score >=50
    if (score[activePlayer] >= 50) {
      // finish the game
      playing = false;
      diceEl.classList.add("hidden");

      // document.getElementById(
      //   `name--${activePlayer}`
      // ).textContent = `Player ${activePlayer} won the match`;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--active");
    } else {
      //switching player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
